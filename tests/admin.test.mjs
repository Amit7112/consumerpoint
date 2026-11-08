import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../server/app.mjs";
import { createStore } from "../server/store.mjs";
import { getConfig } from "../server/config.mjs";
import { sendAdminEnquiryEmail } from "../server/email.mjs";

test("Admin Panel & Customer Enquiry Management: 8 Core Features Verification", async (t) => {
  const dataDir = await mkdtemp(join(tmpdir(), "cp-test-admin-"));
  const config = getConfig({
    dataDir,
    encryptionKey: "f".repeat(64),
    production: false,
    siteUrl: "",
    allowedOrigins: [],
  });
  const store = createStore(config);
  const { app, signToken } = createApp({ config, store, challengeMinAgeMs: 0 });

  try {
    // -------------------------------------------------------------------------
    // FEATURE 1: Secure Admin Login
    // -------------------------------------------------------------------------
    await t.test("Feature 1: Admin authentication and credentials", async () => {
      // 1. Valid admin credentials
      const validAdmin = store.authenticateAdmin("admin", "Admin@CP2026!");
      assert.ok(validAdmin, "Admin should authenticate with valid password");
      assert.equal(validAdmin.username, "admin");
      assert.equal(validAdmin.role, "admin");

      // 2. Invalid password must be rejected
      const invalidPass = store.authenticateAdmin("admin", "WrongPassword123!");
      assert.equal(invalidPass, null, "Invalid password must return null");

      // 3. Unknown username must be rejected
      const unknownUser = store.authenticateAdmin("nonexistent", "Admin@CP2026!");
      assert.equal(unknownUser, null, "Unknown username must return null");
    });

    // -------------------------------------------------------------------------
    // FEATURE 2: Automatic Enquiry Storage
    // -------------------------------------------------------------------------
    await t.test("Feature 2: Save customer enquiries in database with timestamp", () => {
      const enquiryData = {
        name: "Rahul Verma",
        phone: "9876543210",
        email: "rahul.verma@example.com",
        city: "Jaunpur",
        pin: "222001",
        category: "Air Conditioners",
        message: "AC cooling coil leakage inspection required.",
        consent: true,
      };

      const ref = store.save("service", enquiryData, "token-hash-test-1");
      assert.ok(ref.startsWith("CP-"), "Should return a CP- reference");

      const enquiries = store.listEnquiries();
      const saved = enquiries.find((e) => e.id === ref);
      assert.ok(saved, "Enquiry must be retrieved from database");
      assert.equal(saved.name, "Rahul Verma");
      assert.equal(saved.phone, "9876543210");
      assert.equal(saved.email, "rahul.verma@example.com");
      assert.equal(saved.status, "Pending", "Default status must be Pending");
      assert.ok(saved.createdAt, "Must have createdAt timestamp");
    });

    // -------------------------------------------------------------------------
    // FEATURE 3: Automatic Feedback Storage
    // -------------------------------------------------------------------------
    await t.test("Feature 3: Save customer feedback in database", () => {
      const fb = store.saveFeedback({
        name: "Pooja Mishra",
        service: "Washing Machines",
        rating: 5,
        comment: "Excellent service on time!",
        verified: true,
      });

      assert.ok(fb.id.startsWith("FB-"), "Should return an FB- reference");
      const list = store.getFeedbackListAll();
      const saved = list.find((item) => item.id === fb.id);
      assert.ok(saved, "Review must be found in feedback list");
      assert.equal(saved.name, "Pooja Mishra");
      assert.equal(saved.rating, 5);
      assert.equal(saved.comment, "Excellent service on time!");
    });

    // -------------------------------------------------------------------------
    // FEATURE 4: Customer Contact Details
    // -------------------------------------------------------------------------
    await t.test("Feature 4: Formatted customer details available", () => {
      const ref = store.save(
        "amc",
        {
          name: "Suresh Gupta",
          phone: "9123456789",
          email: "suresh@example.com",
          city: "Prayagraj",
          pin: "211001",
          address: "12 Civil Lines",
          message: "Enrolling for annual home appliance maintenance.",
          consent: true,
        },
        "token-hash-test-2",
      );

      const item = store.listEnquiries().find((e) => e.id === ref);
      assert.ok(item);
      assert.equal(item.name, "Suresh Gupta");
      assert.equal(item.phone, "9123456789");
      assert.equal(item.email, "suresh@example.com");
      assert.equal(item.pincode, "211001");
      assert.equal(item.city, "Prayagraj");
      assert.equal(item.address, "12 Civil Lines");
      assert.equal(item.message, "Enrolling for annual home appliance maintenance.");
    });

    // -------------------------------------------------------------------------
    // FEATURE 5: Enquiry Status Management
    // -------------------------------------------------------------------------
    await t.test("Feature 5: Update status: Pending -> In Progress -> Completed", () => {
      const ref = store.save(
        "contact",
        {
          name: "Anita Roy",
          phone: "9988776655",
          message: "Inquiry about commercial partnership.",
          consent: true,
        },
        "token-hash-test-3",
      );

      // Verify initial status
      let item = store.listEnquiries().find((e) => e.id === ref);
      assert.equal(item.status, "Pending");

      // Update to In Progress
      const ok1 = store.updateEnquiryStatus(ref, "In Progress");
      assert.equal(ok1, true);
      item = store.listEnquiries().find((e) => e.id === ref);
      assert.equal(item.status, "In Progress");

      // Update to Completed
      const ok2 = store.updateEnquiryStatus(ref, "Completed");
      assert.equal(ok2, true);
      item = store.listEnquiries().find((e) => e.id === ref);
      assert.equal(item.status, "Completed");

      // Reject invalid status
      const ok3 = store.updateEnquiryStatus(ref, "InvalidStatus");
      assert.equal(ok3, false);
    });

    // -------------------------------------------------------------------------
    // FEATURE 6: Search & Filter
    // -------------------------------------------------------------------------
    await t.test("Feature 6: Search and filter inquiries", () => {
      // Search by Name
      const byName = store.listEnquiries({ search: "Anita" });
      assert.ok(byName.length >= 1);
      assert.ok(byName.some((e) => e.name.includes("Anita")));

      // Search by Phone
      const byPhone = store.listEnquiries({ search: "9988776655" });
      assert.ok(byPhone.length >= 1);
      assert.ok(byPhone.some((e) => e.phone === "9988776655"));

      // Filter by Status
      const completed = store.listEnquiries({ status: "Completed" });
      assert.ok(completed.every((e) => e.status === "Completed"));

      // Filter by Service
      const acList = store.listEnquiries({ service: "Air Conditioners" });
      assert.ok(acList.every((e) => e.service.includes("Air Conditioners")));
    });

    // -------------------------------------------------------------------------
    // FEATURE 7: Export Records
    // -------------------------------------------------------------------------
    await t.test("Feature 7: Export all enquiries and feedback", () => {
      const allEnquiries = store.listEnquiries();
      assert.ok(allEnquiries.length >= 3);

      const allFeedback = store.getFeedbackListAll();
      assert.ok(allFeedback.length >= 1);

      // Verify fields present for export
      const enq = allEnquiries[0];
      assert.ok("id" in enq);
      assert.ok("name" in enq);
      assert.ok("phone" in enq);
      assert.ok("status" in enq);
      assert.ok("createdAt" in enq);

      const fb = allFeedback[0];
      assert.ok("id" in fb);
      assert.ok("name" in fb);
      assert.ok("rating" in fb);
      assert.ok("comment" in fb);
    });

    // -------------------------------------------------------------------------
    // FEATURE 8: Email Notification Integration
    // -------------------------------------------------------------------------
    await t.test("Feature 8: Email notification module executes safely without crashing", async () => {
      // Without RESEND_API_KEY set, it should log and return non-blocking result
      const result = await sendAdminEnquiryEmail({
        reference: "CP-TESTMAIL",
        kind: "service",
        name: "Test Customer",
        phone: "9810863934",
        email: "test@example.com",
        service: "Air Conditioners",
        message: "AC servicing test notification",
      });

      assert.equal(result.sent, false);
      assert.equal(result.reason, "RESEND_API_KEY_NOT_SET");
    });
  } finally {
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  }
});
