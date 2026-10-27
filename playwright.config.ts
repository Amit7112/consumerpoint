import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: { timeout: 8000 },
  reporter: "list",
  use: {
    baseURL: "http://localhost:5174",
    headless: true,
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "PORT=5174 DATA_DIR=data/e2e npm run dev",
    url: "http://localhost:5174/api/health",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
