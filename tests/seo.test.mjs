import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { routesConfig } from "../scripts/build-seo.mjs";

test("SEO: robots.txt protects private portals and publishes sitemap", () => {
  const robots = readFileSync(resolve("public/robots.txt"), "utf8");
  assert.ok(robots.includes("Disallow: /admin"));
  assert.ok(robots.includes("Disallow: /technician"));
  assert.ok(robots.includes("Disallow: /api/"));
  assert.ok(robots.includes("Sitemap: https://consumerpoint.co.in/sitemap.xml"));
});

test("SEO: sitemap.xml exists and includes all 15 public pages", () => {
  const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
  assert.ok(sitemap.startsWith("<?xml"));
  assert.ok(sitemap.includes("<urlset"));

  for (const route of routesConfig) {
    const loc = `<loc>https://consumerpoint.co.in${route.path === "/" ? "/" : route.path}</loc>`;
    assert.ok(sitemap.includes(loc), `Missing in sitemap: ${loc}`);
  }
});

test("SEO: Open Graph image asset exists and is readable", () => {
  assert.ok(existsSync(resolve("public/images/og-image.jpg")));
});

test("SEO: Prerendered pages have unique titles, descriptions, canonicals, and schemas", () => {
  for (const route of routesConfig) {
    const filePath =
      route.path === "/"
        ? resolve("dist/index.html")
        : resolve(`dist${route.path}/index.html`);

    assert.ok(existsSync(filePath), `Prerendered file missing: ${filePath}`);
    const html = readFileSync(filePath, "utf8");

    // Title
    assert.ok(html.includes(`<title>${route.title.replace(/&/g, "&amp;")}</title>`));

    // Description
    assert.ok(html.includes(`content="${route.description.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`));

    // Canonical
    const expectedCanonical = `https://consumerpoint.co.in${route.path === "/" ? "/" : route.path}`;
    assert.ok(html.includes(`<link rel="canonical" href="${expectedCanonical}" />`));

    // Schema
    assert.ok(html.includes('"HomeAndConstructionBusiness"'));
    assert.ok(html.includes('"BreadcrumbList"'));
    assert.ok(html.includes('"WebSite"'));
    assert.ok(html.includes('"Bhadohi"'));
    assert.ok(html.includes('"Prayagraj"'));
    assert.ok(html.includes('"Kaushambi"'));
    assert.ok(html.includes('"Jaunpur"'));

    // Verify crawlable semantic fallback markup exists inside #root
    assert.ok(html.includes('id="ssr-seo-content"'), `Missing crawlable SSR content in: ${filePath}`);
    assert.ok(html.includes("<h1"), `Missing semantic h1 in: ${filePath}`);

    // If not homepage, also verify clean .html file exists for Vercel cleanUrls
    if (route.path !== "/") {
      const cleanHtmlPath = resolve(`dist${route.path}.html`);
      assert.ok(existsSync(cleanHtmlPath), `Clean URL HTML file missing for Vercel: ${cleanHtmlPath}`);
    }
  }
});

test("SEO: Target keywords verified on AMC and Services routes", () => {
  const amcHtml = readFileSync(resolve("dist/amc-maintenance/index.html"), "utf8");
  assert.ok(amcHtml.includes("Best Home Appliance Maintenance Services"));

  const servicesHtml = readFileSync(resolve("dist/services/index.html"), "utf8");
  assert.ok(servicesHtml.includes("Doorstep Appliance Repair"));
});

test("SEO: 404 page exists and contains noindex directive", () => {
  const notFoundPath = resolve("dist/404.html");
  assert.ok(existsSync(notFoundPath));
  const html = readFileSync(notFoundPath, "utf8");
  assert.ok(html.includes('content="noindex, follow"'));
});
