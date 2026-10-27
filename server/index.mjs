import express from "express";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, extname } from "node:path";
import { createApp } from "./app.mjs";
import { getConfig, projectRoot } from "./config.mjs";
import { pageMetadata, withMetadata } from "./seo.mjs";

process.umask(0o077);
const config = getConfig();
const dist = join(projectRoot, "dist");
const html = readFileSync(join(dist, "index.html"), "utf8");
// Vite's single-file output uses an inline module. Hash its exact bytes rather than allowing arbitrary inline scripts.
const hashes = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
  .filter((match) => match[1])
  .map(
    (match) =>
      `'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`,
  );
const { app, close } = createApp({
  config,
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", ...hashes],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "data:"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: null,
    },
  },
});
app.get("/robots.txt", (_req, res) => {
  const sitemap = config.siteUrl
    ? `\nSitemap: ${new URL("/sitemap.xml", config.siteUrl).href}`
    : "";
  res
    .type("text/plain")
    .send(`User-agent: *\nAllow: /\nDisallow: /api/${sitemap}\n`);
});
app.get("/sitemap.xml", (_req, res) => {
  if (!config.siteUrl)
    return res
      .status(503)
      .type("text/plain")
      .send("Configure the verified SITE_URL to publish a sitemap.");
  const urls = Object.keys(pageMetadata)
    .map(
      (path) => `<url><loc>${new URL(path, config.siteUrl).href}</loc></url>`,
    )
    .join("");
  return res
    .type("application/xml")
    .send(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    );
});
app.use(express.static(dist, { index: false, maxAge: "7d" }));
app.use((req, res) => {
  if (req.method !== "GET" || extname(req.path))
    return res.status(404).type("text/plain").send("Not found.");
  const path = req.path.replace(/\/$/, "") || "/";
  return res
    .status(pageMetadata[path] ? 200 : 404)
    .set("Cache-Control", "no-cache")
    .type("html")
    .send(withMetadata(html, path, config.siteUrl));
});
const server = app.listen(Number(process.env.PORT || 5173), "0.0.0.0", () =>
  console.log(`Consumer Point is running on port ${process.env.PORT || 5173}.`),
);
function shutdown() {
  server.close(() => {
    close();
    process.exit(0);
  });
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
