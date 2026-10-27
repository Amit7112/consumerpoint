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
      limit: options.apiLimit || (config.production ? 150 : 1000),
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: {
        message: "Too many requests. Please wait a few minutes and try again.",
      },
    }),
  );
  app.use(express.json({ limit: "20kb", strict: true }));

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
    const reference = store.save(kind, validation.data, hash);
    return res.status(201).json({
      reference,
      message:
        "Your enquiry has been securely recorded. This is not a confirmed appointment.",
    });
  });

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
