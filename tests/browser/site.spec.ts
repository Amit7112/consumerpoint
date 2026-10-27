import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/about",
  "/products",
  "/services",
  "/partnerships",
  "/amc-maintenance",
  "/service-locations",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-and-conditions",
  "/service-policy",
  "/refund-cancellation-policy",
];

test("public pages meet automated WCAG A/AA accessibility checks", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      audit.violations,
      `${route}: ${audit.violations.map((item) => item.id).join(", ")}`,
    ).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/contact"]) {
    await page.goto(route);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(audit.violations, `${route} on mobile`).toEqual([]);
  }
});

test("development server does not expose private database files or encryption keys", async ({
  request,
}) => {
  for (const path of [
    "/data/e2e/.encryption-key",
    "/data/e2e/enquiries.sqlite",
    "/.env",
    "/@fs" + process.cwd() + "/data/e2e/.encryption-key",
  ]) {
    const response = await request.get(path);
    expect([403, 404]).toContain(response.status());
    expect(await response.text()).not.toMatch(/^[a-f\d]{64}$/i);
  }
});

async function fillCommon(page: Page) {
  await page.locator('[name="name"]').fill("Synthetic Test Customer");
  await page.locator('[name="phone"]').fill("9876543210");
  await page.locator('[name="consent"]').check();
}

test("all public pages, titles, images, header and footer link destinations work", async ({
  page,
  request,
}) => {
  const consoleErrors: string[] = [];
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const destinations = new Set<string>();
  const titles = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(/Consumer Point/);
    titles.add(await page.title());
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")!),
      );
    links.forEach((link) => destinations.add(link));
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.src),
        ),
    ).toEqual([]);
  }
  expect(titles.size).toBe(routes.length);
  for (const destination of destinations)
    expect((await request.get(destination)).ok(), destination).toBeTruthy();
  expect(consoleErrors).toEqual([]);
  await page.goto("/");
  for (const label of [
    "About Us",
    "Products",
    "Services",
    "Brand Partnerships",
    "AMC & Maintenance",
    "Contact Us",
    "Home",
  ]) {
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByText("404", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to Home" }).click();
  await expect(page).toHaveURL("/");
});

test("all pages fit mobile, tablet, and desktop without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/products",
      "/contact",
      "/services",
      "/amc-maintenance",
      "/partnerships",
      "/about",
      "/service-locations",
    ]) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      expect(overflow, `${route} at ${width}px`).toBeFalsy();
    }
  }
});

test("mobile hamburger, sticky header, and Escape navigation behave correctly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Products", exact: true })
    .click();
  await expect(page).toHaveURL("/products");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 900));
  expect((await page.locator(".site-header").boundingBox())?.y).toBe(0);
});

test("product search, filter, reset, and enquiry prefilling work", async ({
  page,
}) => {
  await page.goto("/products");
  await expect(page.locator(".product-card")).toHaveCount(8);
  await page.getByRole("searchbox").fill("refrigerator");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("searchbox").fill("nothing-matches-this");
  await expect(page.getByText("No match just yet.")).toBeVisible();
  await page.getByRole("button", { name: "Show all appliances" }).click();
  await page.getByLabel("Filter appliance category").selectOption("Cooling");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(8);
  await page
    .getByRole("link", { name: "Enquire about Air Conditioners", exact: true })
    .click();
  await expect(page.locator('[name="enquiryType"]')).toHaveValue(
    "Product Enquiry",
  );
  await expect(page.locator('[name="category"]')).toHaveValue(
    "Air Conditioners",
  );
  await expect(page.locator('[name="message"]')).toContainText(
    "air conditioners",
  );
});

test("FAQ expands and collapses with accessible state", async ({ page }) => {
  await page.goto("/faq");
  const question = page.getByRole("button", {
    name: "Do you provide installation services?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(
      "We welcome installation enquiries for eligible appliances.",
      { exact: false },
    ),
  ).toBeVisible();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
});

test("contact form validates required fields and handles a real submission", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Enquiry", exact: true }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#phone-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();
  await expect(page.locator("#consent-error")).toBeVisible();
  await fillCommon(page);
  await page.locator('[name="phone"]').fill("12345");
  await page.locator('[name="email"]').fill("not-an-email");
  await page
    .locator('[name="message"]')
    .fill("Please record this synthetic automated contact enquiry.");
  await page.getByRole("button", { name: "Send Enquiry", exact: true }).click();
  await expect(page.locator("#phone-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await page.locator('[name="phone"]').fill("+91 9876543210");
  await page.locator('[name="email"]').fill("");
  await page.getByRole("button", { name: "Send Enquiry", exact: true }).click();
  await expect(page.getByText("Your enquiry is in.")).toBeVisible();
  await expect(page.locator(".reference-label")).toHaveText(
    /REFERENCE: CP-[A-F\d]{12}/,
  );
  await expect(
    page.getByRole("button", { name: "WhatsApp not configured" }),
  ).toBeDisabled();
  await expect(page.locator(".whatsapp-float")).toHaveCount(0);
  await page.getByRole("button", { name: "Send another enquiry" }).click();
  await expect(page.locator('[name="name"]')).toHaveValue("");
});

test("service form validates date, PIN, email preference, and real submission", async ({
  page,
}) => {
  await page.goto("/services?category=Refrigerators#service-request");
  await expect(page.locator('[name="category"]')).toHaveValue("Refrigerators");
  await fillCommon(page);
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="pin"]').fill("000000");
  await page
    .locator('[name="message"]')
    .fill("Synthetic refrigerator cooling issue for automated testing.");
  await page.locator('[name="preferredDate"]').fill("2000-01-01");
  await page.locator('[name="contactMethod"]').selectOption("Email");
  await page
    .getByRole("button", { name: "Submit Service Request", exact: true })
    .click();
  await expect(page.locator("#pin-error")).toBeVisible();
  await expect(page.locator("#preferredDate-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await page.locator('[name="pin"]').fill("123456");
  await page.locator('[name="preferredDate"]').fill("");
  await page.locator('[name="contactMethod"]').selectOption("Phone");
  await page
    .getByRole("button", { name: "Submit Service Request", exact: true })
    .click();
  await expect(page.getByText("Your enquiry is in.")).toBeVisible();
});

test("AMC plan prefilling, count validation, and real proposal submission work", async ({
  page,
}) => {
  await page.goto("/amc-maintenance");
  await page
    .locator(".amc-plan")
    .nth(1)
    .getByRole("link", { name: "Request a proposal" })
    .click();
  await expect(page.locator('[name="plan"]')).toHaveValue(
    "Comprehensive Maintenance",
  );
  await fillCommon(page);
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="pin"]').fill("123456");
  await page.locator('[name="category"]').selectOption("Multiple appliances");
  await page.locator('[name="applianceCount"]').fill("0");
  await page
    .locator('[name="message"]')
    .fill("Synthetic request to discuss annual appliance maintenance.");
  await page
    .getByRole("button", { name: "Request an AMC Proposal", exact: true })
    .click();
  await expect(page.locator("#applianceCount-error")).toBeVisible();
  await page.locator('[name="applianceCount"]').fill("3");
  await page
    .getByRole("button", { name: "Request an AMC Proposal", exact: true })
    .click();
  await expect(page.getByText("Your enquiry is in.")).toBeVisible();
});

test("partnership business details, services validation, and real submission work", async ({
  page,
}) => {
  await page.goto("/partnerships#partnership-enquiry");
  await fillCommon(page);
  await page
    .locator('[name="company"]')
    .fill("Synthetic Automated Test Business");
  await page.locator('[name="email"]').fill("test@example.com");
  await page.locator('[name="businessType"]').selectOption("Dealer / Retailer");
  await page.locator('[name="territories"]').fill("Test City");
  await page.locator('[name="volume"]').selectOption("1-25 requests");
  await page
    .getByRole("button", { name: "Send Partnership Enquiry", exact: true })
    .click();
  await expect(page.locator("#requiredServices-error")).toBeVisible();
  await page.getByLabel("Installation support", { exact: true }).check();
  await page
    .getByRole("button", { name: "Send Partnership Enquiry", exact: true })
    .click();
  await expect(page.getByText("Your enquiry is in.")).toBeVisible();
});

test("submission errors are visible and preserve entered information", async ({
  page,
}) => {
  await page.goto("/contact");
  await fillCommon(page);
  await page
    .locator('[name="message"]')
    .fill("Synthetic enquiry that intentionally exercises the error state.");
  await page.route("**/api/enquiries", (route) =>
    route.fulfill({
      status: 503,
      json: { message: "Test server is temporarily unavailable." },
    }),
  );
  await page.getByRole("button", { name: "Send Enquiry", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveText(
    "Test server is temporarily unavailable.",
  );
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Synthetic Test Customer",
  );
  await expect(page.getByText("Your enquiry is in.")).toHaveCount(0);
});

test("coverage checks validate input and do not invent availability", async ({
  page,
}) => {
  await page.goto("/service-locations");
  await page.getByRole("button", { name: "Check Availability" }).click();
  await expect(page.locator("#coverage-error")).toBeVisible();
  await page.getByLabel("City or PIN code").fill("000000");
  await page.getByLabel("Appliance category").selectOption("Air Conditioners");
  await page.getByRole("button", { name: "Check Availability" }).click();
  await expect(page.locator("#coverage-error")).toBeVisible();
  await page.getByLabel("City or PIN code").fill("Test City");
  await page.getByRole("button", { name: "Check Availability" }).click();
  await expect(page.getByText("Let us confirm that for you.")).toBeVisible();
  await expect(page.getByText("Your area is listed.")).toHaveCount(0);
  await page.route("**/api/coverage?**", (route) => route.abort());
  await page.getByRole("button", { name: "Check Availability" }).click();
  await expect(
    page.getByText("The coverage checker is unavailable right now.", {
      exact: false,
    }),
  ).toBeVisible();
});

test("a service enquiry can be completed on a small mobile screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/services?category=Washing%20Machines#service-request");
  await fillCommon(page);
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="pin"]').fill("123456");
  await page
    .locator('[name="message"]')
    .fill("Synthetic mobile request: the washing machine needs an inspection.");
  await page
    .getByRole("button", { name: "Submit Service Request", exact: true })
    .click();
  await expect(page.getByText("Your enquiry is in.")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    360,
  );
});
