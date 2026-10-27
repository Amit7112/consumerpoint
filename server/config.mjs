import "dotenv/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = fileURLToPath(new URL("..", import.meta.url));

export function getConfig(overrides = {}) {
  const production = process.env.NODE_ENV === "production";
  const encryptionKey = process.env.PII_ENCRYPTION_KEY || "";
  if (encryptionKey && !/^[a-f\d]{64}$/i.test(encryptionKey))
    throw new Error(
      "PII_ENCRYPTION_KEY must contain exactly 64 hexadecimal characters.",
    );
  if (production && !encryptionKey)
    throw new Error("Set PII_ENCRYPTION_KEY before starting production.");
  const suppliedSiteUrl = process.env.SITE_URL || "";
  const siteUrl = suppliedSiteUrl ? new URL(suppliedSiteUrl).origin : "";
  if (production && (!siteUrl || new URL(siteUrl).protocol !== "https:"))
    throw new Error("Production SITE_URL must be the verified HTTPS origin.");
  const trustProxy = process.env.TRUST_PROXY_HOPS
    ? Number(process.env.TRUST_PROXY_HOPS)
    : false;
  if (
    trustProxy !== false &&
    (!Number.isInteger(trustProxy) || trustProxy < 0 || trustProxy > 5)
  ) {
    throw new Error(
      "TRUST_PROXY_HOPS must be the exact trusted proxy count, between 0 and 5.",
    );
  }
  const whatsapp = (process.env.BUSINESS_WHATSAPP || "").replace(/[\s+-]/g, "");
  if (whatsapp && !/^[1-9]\d{9,14}$/.test(whatsapp))
    throw new Error(
      "BUSINESS_WHATSAPP must be a verified international number with country code.",
    );
  const mapsUrl = process.env.BUSINESS_MAPS_URL || "";
  if (mapsUrl) {
    const parsed = new URL(mapsUrl);
    if (
      parsed.protocol !== "https:" ||
      ![
        "www.google.com",
        "maps.google.com",
        "maps.app.goo.gl",
        "www.google.co.in",
      ].includes(parsed.hostname)
    )
      throw new Error(
        "BUSINESS_MAPS_URL must be a verified HTTPS Google Maps URL.",
      );
  }
  const retentionDays = Number(process.env.RETENTION_DAYS || 180);
  if (
    !Number.isInteger(retentionDays) ||
    retentionDays < 1 ||
    retentionDays > 3650
  )
    throw new Error("RETENTION_DAYS must be between 1 and 3650.");
  return {
    production,
    encryptionKey,
    dataDir: resolve(projectRoot, process.env.DATA_DIR || "data"),
    serviceAreasFile: resolve(
      projectRoot,
      process.env.SERVICE_AREAS_FILE || "config/service-areas.json",
    ),
    siteUrl,
    retentionDays,
    trustProxy,
    allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((value) => (value.trim() ? new URL(value.trim()).origin : ""))
      .filter(Boolean),
    business: {
      name: "Consumer Point",
      phone: process.env.BUSINESS_PHONE || "",
      email: process.env.BUSINESS_EMAIL || "",
      address: process.env.BUSINESS_ADDRESS || "",
      hours: process.env.BUSINESS_HOURS || "",
      whatsapp,
      mapsUrl,
      retentionDays,
    },
    ...overrides,
  };
}
