import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../server/app.mjs";
import { createStore } from "../server/store.mjs";
import { getConfig } from "../server/config.mjs";
import { allocateTechnician } from "../server/allocation.mjs";

test("Allocation Engine: assigns eligible primary technician", async () => {
  const dataDir = await mkdtemp(join(tmpdir(), "cp-test-alloc-"));
  const config = getConfig({
    dataDir,
    encryptionKey: "b".repeat(64),
    production: false,
    siteUrl: "",
    allowedOrigins: [],
  });
  const store = createStore(config);

  try {
    // 222001 is mapped to UPTECH0008 (Mr. Abhishek Kaushal)
    const result = allocateTechnician({
      pincode: "222001",
      applianceCategory: "Air Conditioners",
      store,
    });

    assert.equal(result.assignedTechId, "UPTECH0008");
    assert.equal(result.assignmentStatus, "Auto Assigned (Primary)");
    assert.equal(result.jobStatus, "Assigned");
  } finally {
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  }
});

test("Allocation Engine: falls back to backup technician when primary is unavailable", async () => {
  const dataDir = await mkdtemp(join(tmpdir(), "cp-test-alloc-"));
  const config = getConfig({
    dataDir,
    encryptionKey: "c".repeat(64),
    production: false,
    siteUrl: "",
    allowedOrigins: [],
  });
  const store = createStore(config);

  try {
    // Set primary UPTECH0008 to 'On Leave'
    store.updateTechnician("UPTECH0008", { availability: "On Leave" });

    // 222001 primary is UPTECH0008, backup is UPTECH0009
    const result = allocateTechnician({
      pincode: "222001",
      applianceCategory: "Air Conditioners",
      store,
    });

    assert.equal(result.assignedTechId, "UPTECH0009");
    assert.equal(result.assignmentStatus, "Auto Assigned (Backup)");
    assert.equal(result.jobStatus, "Assigned");
  } finally {
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  }
});

test("Allocation Engine: flags Manual Assignment Required when all technicians reach capacity", async () => {
  const dataDir = await mkdtemp(join(tmpdir(), "cp-test-alloc-"));
  const config = getConfig({
    dataDir,
    encryptionKey: "d".repeat(64),
    production: false,
    siteUrl: "",
    allowedOrigins: [],
  });
  const store = createStore(config);

  try {
    // Reduce capacities of UPTECH0008 and UPTECH0009 to 0
    store.updateTechnician("UPTECH0008", { daily_capacity: 0 });
    store.updateTechnician("UPTECH0009", { daily_capacity: 0 });

    const result = allocateTechnician({
      pincode: "222001",
      applianceCategory: "Air Conditioners",
      store,
    });

    assert.equal(result.assignedTechId, null);
    assert.equal(result.assignmentStatus, "Manual Assignment Required");
    assert.equal(result.jobStatus, "Manual Assignment Required");
  } finally {
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  }
});

test("Allocation Engine: flags Manual Assignment Required for unknown unserviced PIN code", async () => {
  const dataDir = await mkdtemp(join(tmpdir(), "cp-test-alloc-"));
  const config = getConfig({
    dataDir,
    encryptionKey: "e".repeat(64),
    production: false,
    siteUrl: "",
    allowedOrigins: [],
  });
  const store = createStore(config);

  try {
    const result = allocateTechnician({
      pincode: "999999",
      applianceCategory: "Air Conditioners",
      store,
    });

    assert.equal(result.assignedTechId, null);
    assert.equal(result.assignmentStatus, "Manual Assignment Required");
  } finally {
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  }
});

test("Admin and Technician Portal APIs: authentication, data isolation, and workflow", async () => {
  const dataDir = await mkdtemp(join(tmpdir(), "cp-test-portal-"));
  const config = getConfig({
    dataDir,
    encryptionKey: "f".repeat(64),
    production: false,
    siteUrl: "",
    allowedOrigins: [],
  });
  const store = createStore(config);

  try {
    // 1. Admin Authentication
    const admin = store.authenticateAdmin("admin", "Admin@CP2026!");
    assert.ok(admin);
    assert.equal(admin.username, "admin");

    // 2. Technician Authentication
    const tech = store.authenticateTechnician("UPTECH0008", "1234");
    assert.ok(tech);
    assert.equal(tech.id, "UPTECH0008");
    assert.equal(tech.name, "Mr. Abhishek Kaushal");

    // 3. Technician Portal Data Isolation
    const tech8Jobs = store.getTechnicianJobs("UPTECH0008");
    for (const job of tech8Jobs) {
      assert.equal(job.assigned_tech_id, "UPTECH0008");
    }

    // 4. Job Status Update & History
    const sampleJob = tech8Jobs[0];
    if (sampleJob) {
      store.updateServiceJob(
        sampleJob.id,
        { job_status: "In Progress", technician_remarks: "On site diagnostic" },
        "Technician (Mr. Abhishek Kaushal)",
        "Job accepted and underway",
      );
      const updated = store.getServiceJob(sampleJob.id);
      assert.equal(updated.job_status, "In Progress");

      const history = store.getJobHistory(sampleJob.id);
      assert.ok(history.length > 0);
      assert.equal(history[0].new_status, "In Progress");
    }

    // 5. Admin Manual Override
    const manualJob = store.createServiceJob({
      customer_name: "Test Customer Override",
      customer_phone: "9876543210",
      customer_pincode: "222001",
      appliance_category: "Air Conditioners",
      assignment_status: "Manual Assignment Required",
      job_status: "Manual Assignment Required",
    });

    store.updateServiceJob(
      manualJob.id,
      {
        assigned_tech_id: "UPTECH0005",
        assignment_status: "Manual Override",
        job_status: "Assigned",
      },
      "Admin (Lead Admin)",
      "Manual assignment to Rajesh Maurya",
    );

    const overridden = store.getServiceJob(manualJob.id);
    assert.equal(overridden.assigned_tech_id, "UPTECH0005");
    assert.equal(overridden.assignment_status, "Manual Override");
    assert.equal(overridden.job_status, "Assigned");
  } finally {
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  }
});

