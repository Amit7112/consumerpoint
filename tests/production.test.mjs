import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { randomBytes } from "node:crypto";
import { chromium } from "playwright";

test("production build: metadata, CSP, gzip, deep links, 404, privacy, and real browser submission", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "consumer-point-production-"));
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await new Promise((resolve) => reservation.once("listening", resolve));
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  const origin = `http://localhost:${port}`;
  let output = "";
  const server = spawn(process.execPath, ["server/index.mjs"], {
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: "production",
      DATA_DIR: directory,
      PII_ENCRYPTION_KEY: randomBytes(32).toString("hex"),
      SITE_URL: "https://consumer-point.example",
      ALLOWED_ORIGINS: origin,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (data) => {
    output += data;
  });
  server.stderr.on("data", (data) => {
    output += data;
  });
  t.after(async () => {
    if (server.exitCode === null) {
      server.kill("SIGTERM");
      await new Promise((resolve) => server.once("exit", resolve));
    }
    await rm(directory, { recursive: true, force: true });
  });
  let healthy = false;
  for (let count = 0; count < 100; count++) {
    try {
      healthy = (await fetch(`${origin}/api/health`)).ok;
    } catch {
      /* Wait for the isolated server to listen. */
    }
    if (healthy) break;
    if (server.exitCode !== null) throw new Error(output);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.equal(healthy, true, output);
  const products = await fetch(`${origin}/products`, {
    headers: { "Accept-Encoding": "gzip" },
  });
  assert.equal(products.status, 200);
  assert.equal(products.headers.get("content-encoding"), "gzip");
  assert.match(products.headers.get("content-security-policy"), /sha256-/);
  assert.doesNotMatch(
    products.headers.get("content-security-policy"),
    /script-src[^;]*unsafe-inline/,
  );
  const markup = await products.text();
  assert.match(
    markup,
    /<title>Home Appliances &amp; Product Enquiries \| Consumer Point<\/title>/,
  );
  assert.match(
    markup,
    /rel="canonical" href="https:\/\/consumer-point.example\/products"/,
  );
  assert.equal((await fetch(`${origin}/missing-page`)).status, 404);
  assert.equal((await fetch(`${origin}/data/.encryption-key`)).status, 404);
  assert.equal((await fetch(`${origin}/data/enquiries.sqlite`)).status, 404);
  assert.equal((await fetch(`${origin}/.env`)).status, 404);
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  assert.match(sitemap, /https:\/\/consumer-point.example\/service-locations/);

  const browser = await chromium.launch();
  t.after(() => browser.close());
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /Content Security Policy|Refused to/.test(message.text())
    )
      errors.push(message.text());
  });
  for (const path of [
    "/",
    "/products",
    "/about",
    "/services",
    "/amc-maintenance",
    "/partnerships",
    "/contact",
  ]) {
    await page.goto(`${origin}${path}`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").isVisible(), true, path);
  }
  await page.locator('[name="name"]').fill("Synthetic Production Test");
  await page.locator('[name="phone"]').fill("9876543210");
  await page
    .locator('[name="message"]')
    .fill(
      "Synthetic production build submission, used only for automated verification.",
    );
  await page.locator('[name="consent"]').check();
  await page.getByRole("button", { name: "Send Enquiry", exact: true }).click();
  await page
    .getByText("Your enquiry is in.")
    .waitFor({ state: "visible", timeout: 10000 });
  assert.match(
    await page.locator(".reference-label").textContent(),
    /CP-[A-F\d]{12}/,
  );
  assert.deepEqual(errors, []);
});
