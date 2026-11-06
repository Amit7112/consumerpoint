import express from "express";
import compression from "compression";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { readFile } from "node:fs/promises";
import { z } from "zod";
import { applianceCategories, validateEnquiry, validateFeedback } from "../shared/validation.mjs";
import { getConfig } from "./config.mjs";
import { createStore } from "./store.mjs";
import { allocateTechnician } from "./allocation.mjs";

export function createApp(options = {}) {
  const config = options.config || getConfig();
  const store = options.store || createStore(config);
  const app = express();
  app.disable("x-powered-by");
  app.use(compression({ threshold: 1024 }));
  if (config.trustProxy !== false) app.set("trust proxy", config.trustProxy);
  app.use(
    helmet({
      contentSecurityPolicy: options.csp || false,
      crossOriginEmbedderPolicy: false,
      strictTransportSecurity: config.production ? undefined : false,
    }),
  );
  app.use("/api", (req, res, next) => {
    res.set("Cache-Control", "no-store");
    const origin = req.get("Origin");
    const allowed = [
      config.siteUrl,
      ...config.allowedOrigins,
      ...(!config.production ? [`${req.protocol}://${req.get("Host")}`] : []),
    ].filter(Boolean);
    if (
      (origin && !allowed.includes(origin)) ||
      (req.method === "POST" && req.get("Sec-Fetch-Site") === "cross-site")
    )
      return res.status(403).json({
        message:
          "Please submit this request directly from the Consumer Point website.",
      });
    next();
  });
  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: options.apiLimit || (config.production ? 150 : 2000),
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: {
        message: "Too many requests. Please wait a few minutes and try again.",
      },
    }),
  );
  app.use(express.json({ limit: "30kb", strict: true }));

  // Form security challenges
  const tokenKey = createHmac("sha256", store.key)
    .update("consumer-point-form-challenge-v1")
    .digest();
  const signature = (text) =>
    createHmac("sha256", tokenKey).update(text).digest("hex");
  const signToken = (issuedAt = Date.now()) => {
    const unsigned = `${issuedAt}.${randomBytes(16).toString("hex")}`;
    return `${unsigned}.${signature(unsigned)}`;
  };
  const verifyToken = (token) => {
    if (
      typeof token !== "string" ||
      !/^\d{13}\.[a-f\d]{32}\.[a-f\d]{64}$/.test(token)
    )
      return false;
    const [timestamp, nonce, signed] = token.split(".");
    const age = Date.now() - Number(timestamp);
    if (age < (options.challengeMinAgeMs ?? 1000) || age > 2 * 60 * 60 * 1000)
      return false;
    return timingSafeEqual(
      Buffer.from(signed, "hex"),
      Buffer.from(signature(`${timestamp}.${nonce}`), "hex"),
    );
  };

  // JWT-style session tokens for Admin and Technicians
  const authSecret = createHmac("sha256", store.key)
    .update("consumer-point-auth-token-v1")
    .digest();

  function createAuthToken(payload) {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
    const body = Buffer.from(
      JSON.stringify({
        ...payload,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 86400,
      }),
    ).toString("base64url");
    const sig = createHmac("sha256", authSecret)
      .update(`${header}.${body}`)
      .digest("base64url");
    return `${header}.${body}.${sig}`;
  }

  function verifyAuthToken(token) {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expectedSig = createHmac("sha256", authSecret)
      .update(`${header}.${body}`)
      .digest("base64url");
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null;
    try {
      const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
      if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
      return payload;
    } catch {
      return null;
    }
  }

  function requireAdmin(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Admin authentication required." });
    }
    const token = auth.slice(7);
    const payload = verifyAuthToken(token);
    if (!payload || payload.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden. Admin role required." });
    }
    req.user = payload;
    next();
  }

  function requireTechnician(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Technician authentication required." });
    }
    const token = auth.slice(7);
    const payload = verifyAuthToken(token);
    if (!payload || (!payload.techId && payload.role !== "admin")) {
      return res.status(403).json({ message: "Access forbidden. Technician access required." });
    }
    req.authTech = payload;
    next();
  }

  // Base endpoints
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/config", async (_req, res) => {
    const coverage = await readCoverage();
    res.json({
      ...config.business,
      coveragePublished: Boolean(coverage?.confirmed && coverage.areas.length),
    });
  });
  app.get("/api/form-token", (_req, res) => res.json({ token: signToken() }));

  const areasSchema = z.object({
    confirmed: z.boolean(),
    areas: z.array(
      z.object({
        city: z.string().trim().min(2),
        pins: z.array(z.string().regex(/^[1-9]\d{5}$/)),
        categories: z.array(z.enum(applianceCategories)).min(1),
        verified: z.literal(true),
      }),
    ),
  });
  const readCoverage = async () => {
    try {
      return areasSchema.parse(
        JSON.parse(await readFile(config.serviceAreasFile, "utf8")),
      );
    } catch {
      return null;
    }
  };

  app.get("/api/coverage", async (req, res) => {
    const location =
      typeof req.query.location === "string" ? req.query.location.trim() : "";
    const category = req.query.category;
    if (
      location.length < 2 ||
      location.length > 80 ||
      (/^\d+$/.test(location) && !/^[1-9]\d{5}$/.test(location)) ||
      !applianceCategories.includes(category)
    )
      return res.status(422).json({
        message:
          "Enter a city or valid Indian PIN code and choose an appliance category.",
      });
    const coverage = await readCoverage();
    if (!coverage?.confirmed || !coverage.areas.length)
      return res.json({
        status: "unconfirmed",
        message:
          "Verified service-area information is not available yet. Please send an enquiry with your city or PIN code, appliance, and service requirements so the team can confirm coverage.",
      });
    const matched = coverage.areas.find(
      (area) =>
        (area.city.toLowerCase() === location.toLowerCase() ||
          area.pins.includes(location)) &&
        area.categories.includes(category),
    );
    return res.json(
      matched
        ? {
            status: "available",
            message:
              "This location and appliance category are listed in the verified coverage data. Product eligibility, current capacity, charges, and an appointment still require confirmation.",
          }
        : {
            status: "unavailable",
            message:
              "This location and appliance category are not in the currently verified coverage list. You can send an enquiry to ask whether support can be arranged; availability is not confirmed.",
          },
    );
  });

  app.get("/api/pincodes", async (req, res) => {
    try {
      const data = JSON.parse(await readFile(config.pincodesFile, "utf8"));
      const { pincode, q, district, taluk } = req.query;
      let filtered = data;

      if (typeof pincode === "string" && pincode.trim()) {
        const pin = pincode.trim();
        filtered = filtered.filter((item) => item.pincode === pin);
      } else if (typeof q === "string" && q.trim()) {
        const query = q.trim().toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.pincode.includes(query) ||
            item.officeName.toLowerCase().includes(query) ||
            item.district.toLowerCase().includes(query) ||
            item.taluk.toLowerCase().includes(query),
        );
      }

      if (typeof district === "string" && district.trim()) {
        const d = district.trim().toLowerCase();
        filtered = filtered.filter((item) => item.district.toLowerCase() === d);
      }
      if (typeof taluk === "string" && taluk.trim()) {
        const t = taluk.trim().toLowerCase();
        filtered = filtered.filter((item) => item.taluk.toLowerCase() === t);
      }

      return res.json({
        total: filtered.length,
        items: filtered,
      });
    } catch {
      return res.status(500).json({ message: "Unable to load PIN code data." });
    }
  });

  app.get("/api/pincodes/:pincode", async (req, res) => {
    try {
      const pin = String(req.params.pincode).trim();
      const data = JSON.parse(await readFile(config.pincodesFile, "utf8"));
      const matches = data.filter((item) => item.pincode === pin);
      if (matches.length > 0) {
        return res.json({
          available: true,
          pincode: pin,
          locations: matches,
          message:
            "Great! Your location is listed in our service area. Contact our team to confirm service availability.",
        });
      }
      return res.json({
        available: false,
        pincode: pin,
        locations: [],
        message:
          "Sorry! We currently don't have this PIN code listed in our database. Please contact our team for assistance.",
      });
    } catch {
      return res.status(500).json({ message: "Unable to check PIN code." });
    }
  });

  const envelope = z
    .object({
      kind: z.enum(["contact", "service", "amc", "partnership", "career"]),
      data: z.record(z.string(), z.unknown()),
      token: z.string().max(200),
      website: z.string().max(200).default(""),
    })
    .strict();

  const submissionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: options.submissionLimit || 8,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      message:
        "You have reached the enquiry limit. Please wait 15 minutes before trying again.",
    },
  });

  // Customer Enquiry Submission + Automatic Technician Allocation
  app.post("/api/enquiries", submissionLimiter, (req, res) => {
    if (!req.is("application/json"))
      return res
        .status(415)
        .json({ message: "Please use the secure website enquiry form." });
    const parsed = envelope.safeParse(req.body);
    if (!parsed.success)
      return res.status(422).json({
        message:
          "The request format is invalid. Please check the form and try again.",
      });
    const { kind, data, token, website } = parsed.data;
    if (website || !verifyToken(token))
      return res.status(403).json({
        message:
          "The form security check expired or could not be verified. Please submit again.",
      });
    const hash = createHash("sha256").update(token).digest("hex");
    if (store.hasToken(hash))
      return res.status(409).json({
        message:
          "This request was already received. Please keep your original reference, or refresh the page for a new enquiry.",
      });
    const validation = validateEnquiry(kind, data);
    if (!validation.success)
      return res.status(422).json({
        message: "Please check the highlighted fields.",
        errors: validation.errors,
      });

    // 1. Save original encrypted enquiry
    const reference = store.save(kind, validation.data, hash);

    // 2. Automatic Technician Allocation for Service Enquiries
    let createdJobId = null;
    let allocationSummary = null;

    if (kind === "service") {
      try {
        const pin = String(validation.data.pin || "").trim();
        const cat = String(validation.data.category || "").trim();
        const alloc = allocateTechnician({
          pincode: pin,
          applianceCategory: cat,
          store,
        });

        const job = store.createServiceJob({
          customer_name: validation.data.name,
          customer_phone: validation.data.phone,
          customer_email: validation.data.email || "",
          customer_pincode: pin,
          district: validation.data.city || "",
          locality: validation.data.city || "",
          address: validation.data.address || validation.data.city || "",
          appliance_category: cat,
          service_type: "Service / Repair",
          problem_description: `${validation.data.brandModel ? `[Model: ${validation.data.brandModel}] ` : ""}${validation.data.message || ""}`.trim(),
          priority: "Normal",
          primary_tech_id: alloc.primaryTechId,
          backup_tech_id: alloc.backupTechId,
          assigned_tech_id: alloc.assignedTechId,
          assignment_status: alloc.assignmentStatus,
          job_status: alloc.jobStatus,
          admin_notes: alloc.reason,
          enquiry_ref: reference,
        });

        createdJobId = job.id;
        allocationSummary = {
          jobId: job.id,
          assignmentStatus: job.assignment_status,
          status: job.job_status,
        };
      } catch (err) {
        console.error("Auto allocation warning:", err.message);
      }
    }

    return res.status(201).json({
      reference,
      jobId: createdJobId,
      allocation: allocationSummary,
      message:
        createdJobId
          ? `Your service request has been registered under Request ID #${createdJobId}. A technician is being assigned.`
          : "Your enquiry has been securely recorded. This is not a confirmed appointment.",
    });
  });

  // Customer Feedback
  app.get("/api/feedback", (req, res) => {
    const service = req.query.service ? String(req.query.service) : null;
    return res.json({
      items: store.getFeedbackList(service),
      summary: store.getFeedbackSummary(),
    });
  });

  const feedbackEnvelope = z
    .object({
      data: z.record(z.string(), z.unknown()),
      token: z.string().max(200),
      website: z.string().max(200).default(""),
    })
    .strict();

  app.post("/api/feedback", submissionLimiter, (req, res) => {
    if (!req.is("application/json"))
      return res
        .status(415)
        .json({ message: "Please use the feedback form." });
    const parsed = feedbackEnvelope.safeParse(req.body);
    if (!parsed.success)
      return res.status(422).json({
        message: "The request format is invalid. Please check the form.",
      });
    const { data, token, website } = parsed.data;
    if (website || !verifyToken(token))
      return res.status(403).json({
        message:
          "The security check expired or could not be verified. Please submit again.",
      });
    const validation = validateFeedback(data);
    if (!validation.success)
      return res.status(422).json({
        message: "Please complete all required feedback fields.",
        errors: validation.errors,
      });
    const item = store.saveFeedback(validation.data);
    return res.status(201).json({
      item,
      summary: store.getFeedbackSummary(),
      message: "Thank you for your valuable feedback! Your review has been recorded.",
    });
  });

  // =========================================================================
  // AUTHENTICATION ROUTES
  // =========================================================================
  app.post("/api/auth/admin/login", (req, res) => {
    const { username, password } = req.body || {};
    const admin = store.authenticateAdmin(username, password);
    if (!admin) {
      return res.status(401).json({ message: "Invalid administrator credentials." });
    }
    const token = createAuthToken({
      userId: admin.id,
      username: admin.username,
      name: admin.name,
      role: "admin",
    });
    return res.json({
      success: true,
      token,
      user: admin,
    });
  });

  app.post("/api/auth/technician/login", (req, res) => {
    const { identifier, password } = req.body || {};
    const tech = store.authenticateTechnician(identifier, password);
    if (!tech) {
      return res.status(401).json({
        message: "Invalid Technician ID or mobile number. Check credentials and try again.",
      });
    }
    const token = createAuthToken({
      techId: tech.id,
      phone: tech.phone,
      name: tech.name,
      role: "technician",
    });
    return res.json({
      success: true,
      token,
      technician: {
        id: tech.id,
        name: tech.name,
        phone: tech.phone,
        base_pincode: tech.base_pincode,
        home_area: tech.home_area,
        skills: tech.skills,
        service_type: tech.service_type,
        daily_capacity: tech.daily_capacity,
        availability: tech.availability,
        active_status: tech.active_status,
      },
    });
  });

  // =========================================================================
  // ADMIN DASHBOARD & MANAGEMENT API
  // =========================================================================
  app.get("/api/admin/stats", requireAdmin, (_req, res) => {
    return res.json(store.getDashboardStats());
  });

  // Technician management
  app.get("/api/admin/technicians", requireAdmin, (req, res) => {
    const { status, availability, search } = req.query;
    const technicians = store.getTechnicians({
      status: status ? String(status) : undefined,
      availability: availability ? String(availability) : undefined,
      search: search ? String(search) : undefined,
    });
    return res.json({ items: technicians });
  });

  app.post("/api/admin/technicians", requireAdmin, (req, res) => {
    const { name, phone, base_pincode, home_area, skills, service_type, daily_capacity, availability, active_status, notes } = req.body || {};
    if (!name || !phone) {
      return res.status(422).json({ message: "Technician name and mobile number are required." });
    }
    const created = store.createTechnician({
      name,
      phone,
      base_pincode,
      home_area,
      skills,
      service_type,
      daily_capacity: Number(daily_capacity) || 4,
      availability: availability || "Available",
      active_status: active_status || "Active",
      notes,
    });
    return res.status(201).json({ item: created, message: "Technician registered successfully." });
  });

  app.put("/api/admin/technicians/:id", requireAdmin, (req, res) => {
    const updated = store.updateTechnician(req.params.id, req.body || {});
    if (!updated) {
      return res.status(404).json({ message: "Technician not found." });
    }
    return res.json({ item: updated, message: "Technician details updated." });
  });

  app.delete("/api/admin/technicians/:id", requireAdmin, (req, res) => {
    const ok = store.deleteTechnician(req.params.id);
    if (!ok) {
      return res.status(404).json({ message: "Technician not found or could not be removed." });
    }
    return res.json({ success: true, message: "Technician removed." });
  });

  // PIN Mapping management
  app.get("/api/admin/pin-mappings", requireAdmin, (req, res) => {
    const { pincode, district, applianceCategory, coverageStatus, search } = req.query;
    const items = store.getPinMappings({
      pincode: pincode ? String(pincode) : undefined,
      district: district ? String(district) : undefined,
      applianceCategory: applianceCategory ? String(applianceCategory) : undefined,
      coverageStatus: coverageStatus ? String(coverageStatus) : undefined,
      search: search ? String(search) : undefined,
    });
    return res.json({ items });
  });

  app.post("/api/admin/pin-mappings", requireAdmin, (req, res) => {
    const { pincode, district, locality, appliance_category, primary_tech_id, backup_tech_id, zone, coverage_status, travel_notes } = req.body || {};
    if (!pincode || !district) {
      return res.status(422).json({ message: "PIN code and district are required." });
    }
    const created = store.createPinMapping({
      pincode,
      district,
      locality,
      appliance_category,
      primary_tech_id,
      backup_tech_id,
      zone,
      coverage_status,
      travel_notes,
    });
    return res.status(201).json({ item: created, message: "PIN coverage mapping created." });
  });

  app.put("/api/admin/pin-mappings/:id", requireAdmin, (req, res) => {
    const updated = store.updatePinMapping(req.params.id, req.body || {});
    if (!updated) {
      return res.status(404).json({ message: "PIN mapping not found." });
    }
    return res.json({ item: updated, message: "PIN mapping updated." });
  });

  app.delete("/api/admin/pin-mappings/:id", requireAdmin, (req, res) => {
    const ok = store.deletePinMapping(req.params.id);
    if (!ok) {
      return res.status(404).json({ message: "PIN mapping not found." });
    }
    return res.json({ success: true, message: "PIN mapping deleted." });
  });

  // Service Jobs management
  app.get("/api/admin/service-jobs", requireAdmin, (req, res) => {
    const { status, assignmentStatus, techId, search, date } = req.query;
    const items = store.getServiceJobs({
      status: status ? String(status) : undefined,
      assignmentStatus: assignmentStatus ? String(assignmentStatus) : undefined,
      techId: techId ? String(techId) : undefined,
      search: search ? String(search) : undefined,
      date: date ? String(date) : undefined,
    });
    return res.json({ items });
  });

  app.get("/api/admin/service-jobs/:id", requireAdmin, (req, res) => {
    const item = store.getServiceJob(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Service job not found." });
    }
    const history = store.getJobHistory(req.params.id);
    return res.json({ item, history });
  });

  app.put("/api/admin/service-jobs/:id", requireAdmin, (req, res) => {
    const updated = store.updateServiceJob(
      req.params.id,
      req.body || {},
      `Admin (${req.user.name})`,
      req.body.admin_notes || "Job details edited by administrator",
    );
    if (!updated) {
      return res.status(404).json({ message: "Service job not found." });
    }
    return res.json({ item: updated, message: "Service job updated." });
  });

  app.post("/api/admin/service-jobs/:id/override", requireAdmin, (req, res) => {
    const { assigned_tech_id, notes } = req.body || {};
    if (!assigned_tech_id) {
      return res.status(422).json({ message: "Please select a technician to assign." });
    }
    const tech = store.getTechnician(assigned_tech_id);
    if (!tech) {
      return res.status(404).json({ message: "Selected technician does not exist." });
    }

    const updated = store.updateServiceJob(
      req.params.id,
      {
        assigned_tech_id,
        assignment_status: "Manual Override",
        job_status: "Assigned",
        admin_notes: notes || `Manually assigned to ${tech.name} by administrator.`,
      },
      `Admin (${req.user.name})`,
      `Manual assignment override -> ${tech.name} (${tech.id}). ${notes || ""}`,
    );

    if (!updated) {
      return res.status(404).json({ message: "Service job not found." });
    }
    return res.json({ item: updated, message: `Successfully assigned to ${tech.name}.` });
  });

  // Export full system backup
  app.get("/api/admin/export", requireAdmin, (_req, res) => {
    const technicians = store.getTechnicians();
    const pinMappings = store.getPinMappings();
    const serviceJobs = store.getServiceJobs();
    const stats = store.getDashboardStats();

    res.set("Content-Disposition", 'attachment; filename="consumer-point-data-backup.json"');
    return res.json({
      exportDate: new Date().toISOString(),
      stats,
      technicians,
      pinMappings,
      serviceJobs,
    });
  });

  // =========================================================================
  // TECHNICIAN PORTAL API (Role isolated)
  // =========================================================================
  app.get("/api/technician/profile", requireTechnician, (req, res) => {
    const tech = store.getTechnician(req.authTech.techId);
    if (!tech) {
      return res.status(404).json({ message: "Technician profile not found." });
    }
    return res.json({ technician: tech });
  });

  app.put("/api/technician/profile", requireTechnician, (req, res) => {
    const { availability } = req.body || {};
    if (!["Available", "On Leave", "Busy", "Unavailable"].includes(availability)) {
      return res.status(422).json({ message: "Invalid availability status." });
    }
    const updated = store.updateTechnician(req.authTech.techId, { availability });
    return res.json({ technician: updated, message: `Availability status set to ${availability}.` });
  });

  app.get("/api/technician/jobs", requireTechnician, (req, res) => {
    const { status } = req.query;
    const jobs = store.getTechnicianJobs(req.authTech.techId, {
      status: status ? String(status) : undefined,
    });
    return res.json({ items: jobs });
  });

  app.get("/api/technician/jobs/:id", requireTechnician, (req, res) => {
    const job = store.getServiceJob(req.params.id);
    if (!job || (job.assigned_tech_id !== req.authTech.techId && req.authTech.role !== "admin")) {
      return res.status(404).json({ message: "Job not found or not assigned to you." });
    }
    const history = store.getJobHistory(req.params.id);
    return res.json({ item: job, history });
  });

  app.post("/api/technician/jobs/:id/action", requireTechnician, (req, res) => {
    const job = store.getServiceJob(req.params.id);
    if (!job || (job.assigned_tech_id !== req.authTech.techId && req.authTech.role !== "admin")) {
      return res.status(404).json({ message: "Job not found or not assigned to you." });
    }

    const { action, remarks } = req.body || {};
    let updates = {};
    let noteText = "";

    if (action === "accept") {
      updates = { job_status: "In Progress" };
      noteText = `Job accepted by technician ${req.authTech.name}. Service underway.`;
    } else if (action === "reject") {
      updates = {
        assigned_tech_id: null,
        assignment_status: "Manual Assignment Required",
        job_status: "Manual Assignment Required",
        technician_remarks: remarks || "Declined by assigned technician.",
      };
      noteText = `Technician ${req.authTech.name} declined job: ${remarks || "No reason specified"}. Flagged for manual reallocation.`;
    } else if (action === "complete") {
      updates = {
        job_status: "Completed",
        completion_date: new Date().toISOString().slice(0, 10),
        technician_remarks: remarks || "Service completed successfully.",
      };
      noteText = `Job marked completed by technician ${req.authTech.name}. Remarks: ${remarks || "None"}`;
    } else if (action === "update_status") {
      const allowed = ["Assigned", "In Progress", "Completed"];
      if (!allowed.includes(req.body.job_status)) {
        return res.status(422).json({ message: "Invalid status update." });
      }
      updates = {
        job_status: req.body.job_status,
        technician_remarks: remarks || job.technician_remarks,
      };
      noteText = `Status updated to ${req.body.job_status} by technician ${req.authTech.name}`;
    } else {
      return res.status(422).json({ message: "Invalid action." });
    }

    const updated = store.updateServiceJob(
      job.id,
      updates,
      `Technician (${req.authTech.name})`,
      noteText,
    );

    return res.json({ item: updated, message: "Job updated successfully." });
  });

  // Fallthrough 404
  app.use("/api", (_req, res) =>
    res.status(404).json({ message: "This endpoint does not exist." }),
  );

  app.use((error, _req, res, _next) => {
    if (error.type === "entity.too.large")
      return res.status(413).json({
        message: "The request is too large. Please shorten the description.",
      });
    if (error instanceof SyntaxError)
      return res.status(400).json({
        message: "The submitted request could not be read. Please try again.",
      });
    console.error("Request processing failed:", error.code || error.name);
    return res.status(500).json({
      message: "Your enquiry could not be saved. Please try again shortly.",
    });
  });

  const retentionTimer = setInterval(
    () => {
      try {
        store.purge();
      } catch {
        console.error("Retention cleanup failed. Operator review required.");
      }
    },
    60 * 60 * 1000,
  );
  retentionTimer.unref();

  return {
    app,
    config,
    store,
    signToken,
    close: () => {
      clearInterval(retentionTimer);
      store.close();
    },
  };
}
