import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../server/app.mjs";
import { getConfig } from "../server/config.mjs";
import { validateEnquiry, indiaToday } from "../shared/validation.mjs";

const base = {
  name: "Test Customer",
  phone: "9876543210",
  email: "",
  consent: true,
};
const examples = {
  contact: {
    ...base,
    enquiryType: "General Enquiry",
    category: "",
    message: "A synthetic enquiry used only for automated testing.",
  },
  service: {
    ...base,
    city: "Test City",
    pin: "123456",
    category: "Air Conditioners",
    brandModel: "",
    message: "Synthetic cooling issue for a test appliance.",
    preferredDate: "",
    contactMethod: "Phone",
  },
  amc: {
    ...base,
    city: "Test City",
    pin: "123456",
    category: "Multiple appliances",
    plan: "Essential Maintenance",
    applianceCount: "2",
    message: "A synthetic annual maintenance proposal requirement.",
    contactMethod: "Phone",
  },
  partnership: {
    ...base,
    company: "Synthetic Test Business",
    email: "test@example.com",
    businessType: "Dealer / Retailer",
    requiredServices: ["Installation support"],
    territories: "Test City",
    volume: "1-25 requests",
    message: "",
  },
};

async function setup(t, options = {}) {
  const dataDir = await mkdtemp(join(tmpdir(), "consumer-point-api-"));
  const config = getConfig({
    dataDir,
    serviceAreasFile: join(dataDir, "service-areas.json"),
    encryptionKey: "a".repeat(64),
    production: false,
    siteUrl: "",
    allowedOrigins: [],
  });
  const instance = createApp({ config, ...options });
  const server = instance.app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    instance.close();
    await rm(dataDir, { recursive: true, force: true });
  });
  const post = (kind, data, extra = {}, headers = {}) =>
    fetch(`${url}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: url, ...headers },
      body: JSON.stringify({
        kind,
        data,
        token: instance.signToken(Date.now() - 2000),
        website: "",
        ...extra,
      }),
    });
  return { ...instance, url, post, dataDir };
}

for (const [kind, data] of Object.entries(examples)) {
  test(`${kind}: valid enquiry is really persisted and encrypted`, async (t) => {
    const { post, store } = await setup(t);
    const response = await post(kind, data);
    assert.equal(response.status, 201);
    const result = await response.json();
    assert.match(result.reference, /^CP-[A-F\d]{12}$/);
    assert.deepEqual(store.get(result.reference).data, data);
    const row = store.db.prepare("SELECT * FROM enquiries").get();
    assert.ok(Buffer.isBuffer(row.ciphertext));
    assert.equal(row.ciphertext.includes(Buffer.from(data.name)), false);
    assert.equal(row.ciphertext.includes(Buffer.from(data.phone)), false);
    assert.equal(row.iv.length, 12);
    assert.equal(row.auth_tag.length, 16);
    assert.equal(row.consent_version, "2026-01");
  });

  test(`${kind}: missing consent, invalid phone, and unknown fields are rejected`, async (t) => {
    const { post, store } = await setup(t);
    for (const invalid of [
      { ...data, consent: false },
      { ...data, phone: "12345" },
      { ...data, unexpected: "not allowed" },
    ]) {
      const response = await post(kind, invalid);
      assert.equal(response.status, 422);
      assert.ok(Object.keys((await response.json()).errors).length);
    }
    assert.equal(store.list().length, 0);
  });
}

test("validation: all required fields in all four schemas reject blanks", () => {
  const required = {
    contact: ["name", "phone", "enquiryType", "message"],
    service: [
      "name",
      "phone",
      "city",
      "pin",
      "category",
      "message",
      "contactMethod",
    ],
    amc: [
      "name",
      "phone",
      "city",
      "pin",
      "category",
      "plan",
      "applianceCount",
      "message",
      "contactMethod",
    ],
    partnership: [
      "name",
      "phone",
      "company",
      "email",
      "businessType",
      "territories",
      "volume",
    ],
  };
  for (const [kind, fields] of Object.entries(required))
    for (const field of fields) {
      const validation = validateEnquiry(kind, {
        ...examples[kind],
        [field]: "",
      });
      assert.equal(
        validation.success,
        false,
        `${kind}.${field} should be required`,
      );
      assert.ok(
        validation.errors[field],
        `${kind}.${field} should have an error`,
      );
    }
  assert.equal(
    validateEnquiry("partnership", {
      ...examples.partnership,
      requiredServices: [],
    }).success,
    false,
  );
});

test("validation: Indian mobile, PIN, email, and text boundaries", () => {
  for (const phone of [
    "9876543210",
    "+91 9876543210",
    "919876543210",
    "98765 43210",
    "(98765)43210",
  ])
    assert.equal(
      validateEnquiry("contact", { ...examples.contact, phone }).success,
      true,
      phone,
    );
  for (const phone of [
    "1234567890",
    "987654321",
    "98765432100",
    "+1 9876543210",
    "abcdefghij",
  ])
    assert.equal(
      validateEnquiry("contact", { ...examples.contact, phone }).success,
      false,
      phone,
    );
  for (const pin of ["000000", "12345", "1234567", "abcdef"])
    assert.equal(
      validateEnquiry("service", { ...examples.service, pin }).success,
      false,
      pin,
    );
  for (const email of [
    "invalid",
    "a@",
    "@example.com",
    "with space@example.com",
  ])
    assert.equal(
      validateEnquiry("contact", { ...examples.contact, email }).success,
      false,
    );
  assert.equal(
    validateEnquiry("contact", { ...examples.contact, email: "" }).success,
    true,
  );
  assert.equal(
    validateEnquiry("contact", { ...examples.contact, name: "a" }).success,
    false,
  );
  assert.equal(
    validateEnquiry("contact", { ...examples.contact, name: "a".repeat(81) })
      .success,
    false,
  );
  assert.equal(
    validateEnquiry("contact", { ...examples.contact, message: "short" })
      .success,
    false,
  );
  assert.equal(
    validateEnquiry("contact", {
      ...examples.contact,
      message: "a".repeat(3001),
    }).success,
    false,
  );
});

test("validation: date preferences, email contact, plan count, and enum boundaries", () => {
  for (const preferredDate of ["2000-01-01", "not-a-date", "2030-02-31"])
    assert.equal(
      validateEnquiry("service", { ...examples.service, preferredDate })
        .success,
      false,
    );
  assert.equal(
    validateEnquiry("service", {
      ...examples.service,
      preferredDate: indiaToday(),
    }).success,
    true,
  );
  assert.equal(
    validateEnquiry("service", {
      ...examples.service,
      contactMethod: "Email",
      email: "",
    }).success,
    false,
  );
  assert.equal(
    validateEnquiry("service", {
      ...examples.service,
      contactMethod: "Email",
      email: "test@example.com",
    }).success,
    true,
  );
  assert.equal(
    validateEnquiry("amc", {
      ...examples.amc,
      contactMethod: "Email",
      email: "",
    }).success,
    false,
  );
  for (const applianceCount of ["0", "-1", "1.5", "5001", "no"])
    assert.equal(
      validateEnquiry("amc", { ...examples.amc, applianceCount }).success,
      false,
    );
  assert.equal(
    validateEnquiry("amc", { ...examples.amc, applianceCount: "5000" }).success,
    true,
  );
  assert.equal(
    validateEnquiry("amc", { ...examples.amc, plan: "Unlimited free repairs" })
      .success,
    false,
  );
  assert.equal(
    validateEnquiry("service", {
      ...examples.service,
      category: "Unknown Category",
    }).success,
    false,
  );
  assert.equal(
    validateEnquiry("partnership", {
      ...examples.partnership,
      requiredServices: ["Invented service"],
    }).success,
    false,
  );
  assert.equal(validateEnquiry("unknown", {}).success, false);
});

test("validation: field-specific maximum lengths and required service selections", () => {
  const cases = [
    ["contact", "category", "x".repeat(101)],
    ["contact", "email", "x".repeat(255) + "@example.com"],
    ["service", "city", "x".repeat(81)],
    ["service", "brandModel", "x".repeat(151)],
    ["amc", "city", "x".repeat(81)],
    ["amc", "message", "x".repeat(3001)],
    ["partnership", "company", "x".repeat(151)],
    ["partnership", "territories", "x".repeat(1001)],
    ["partnership", "message", "x".repeat(3001)],
  ];
  for (const [kind, field, value] of cases) {
    const result = validateEnquiry(kind, { ...examples[kind], [field]: value });
    assert.equal(result.success, false, `${kind}.${field}`);
    assert.ok(result.errors[field], `${kind}.${field}`);
  }
  assert.equal(
    validateEnquiry("partnership", {
      ...examples.partnership,
      requiredServices: Array(6).fill("Installation support"),
    }).success,
    false,
  );
  assert.equal(
    validateEnquiry("contact", { ...examples.contact, consent: "true" })
      .success,
    false,
  );
  assert.equal(validateEnquiry("__proto__", {}).success, false);
});

test("API rejects malformed body, unsupported formats, and excessive payloads", async (t) => {
  const { url, post } = await setup(t);
  assert.equal(
    (await post("contact", examples.contact, { kind: "unknown" })).status,
    422,
  );
  assert.equal(
    (
      await fetch(`${url}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{broken",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await fetch(`${url}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "no",
      })
    ).status,
    415,
  );
  assert.equal(
    (
      await fetch(`${url}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ huge: "x".repeat(25000) }),
      })
    ).status,
    413,
  );
});

test("security rejects foreign origins and cross-site requests", async (t) => {
  const { post } = await setup(t);
  assert.equal(
    (
      await post(
        "contact",
        examples.contact,
        {},
        { Origin: "https://untrusted.example" },
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await post(
        "contact",
        examples.contact,
        {},
        { "Sec-Fetch-Site": "cross-site" },
      )
    ).status,
    403,
  );
});

test("security rejects fresh, expired, tampered, missing, and honeypot tokens", async (t) => {
  const { post, signToken, store } = await setup(t);
  for (const token of [
    "",
    "invalid",
    signToken(),
    signToken(Date.now() - 3 * 3600000),
    `${signToken(Date.now() - 2000).slice(0, -2)}xx`,
  ])
    assert.equal(
      (await post("contact", examples.contact, { token })).status,
      403,
    );
  assert.equal(
    (await post("contact", examples.contact, { website: "spam.example" }))
      .status,
    403,
  );
  assert.equal(store.list().length, 0);
});

test("security prevents token replay, including persistence in the database", async (t) => {
  const { post, signToken, store } = await setup(t);
  const token = signToken(Date.now() - 2000);
  assert.equal(
    (await post("contact", examples.contact, { token })).status,
    201,
  );
  assert.equal(
    (await post("contact", examples.contact, { token })).status,
    409,
  );
  assert.equal(store.list().length, 1);
});

test("security limits public submissions and returns a retry message", async (t) => {
  const { post } = await setup(t, { submissionLimit: 2 });
  assert.equal((await post("contact", examples.contact)).status, 201);
  assert.equal((await post("contact", examples.contact)).status, 201);
  const blocked = await post("contact", examples.contact);
  assert.equal(blocked.status, 429);
  assert.ok(blocked.headers.get("retry-after"));
  assert.match((await blocked.json()).message, /15 minutes/);
});

test("coverage never confirms unknown, missing, empty, or malformed data", async (t) => {
  const { url, config } = await setup(t);
  const check = () =>
    fetch(
      `${url}/api/coverage?location=Test%20City&category=Air%20Conditioners`,
    ).then((result) => result.json());
  assert.equal((await check()).status, "unconfirmed");
  await writeFile(
    config.serviceAreasFile,
    JSON.stringify({ confirmed: false, areas: [] }),
  );
  assert.equal((await check()).status, "unconfirmed");
  await writeFile(config.serviceAreasFile, "broken");
  assert.equal((await check()).status, "unconfirmed");
  await writeFile(
    config.serviceAreasFile,
    JSON.stringify({ confirmed: true, areas: [] }),
  );
  assert.equal((await check()).status, "unconfirmed");
  assert.equal(
    (
      await fetch(
        `${url}/api/coverage?location=000000&category=Air%20Conditioners`,
      )
    ).status,
    422,
  );
  assert.equal(
    (await fetch(`${url}/api/coverage?location=Test%20City&category=Unknown`))
      .status,
    422,
  );
});

test("coverage matches only explicitly verified locations and categories", async (t) => {
  const { url, config } = await setup(t);
  await writeFile(
    config.serviceAreasFile,
    JSON.stringify({
      confirmed: true,
      areas: [
        {
          city: "Test City",
          pins: ["123456"],
          categories: ["Air Conditioners"],
          verified: true,
        },
      ],
    }),
  );
  const check = (location, category = "Air Conditioners") =>
    fetch(
      `${url}/api/coverage?location=${encodeURIComponent(location)}&category=${encodeURIComponent(category)}`,
    ).then((result) => result.json());
  assert.equal((await check("test city")).status, "available");
  assert.equal((await check("123456")).status, "available");
  assert.equal((await check("Other Test City")).status, "unavailable");
  assert.equal(
    (await check("Test City", "Refrigerators")).status,
    "unavailable",
  );
});

test("privacy: config exposes no key, reads are not public, retention deletes expired records", async (t) => {
  const { url, post, store } = await setup(t);
  const configResponse = await fetch(`${url}/api/config`);
  assert.match(configResponse.headers.get("cache-control"), /no-store/);
  const data = await configResponse.json();
  assert.equal(data.whatsapp, "");
  assert.equal(data.phone, "");
  assert.equal(data.encryptionKey, undefined);
  assert.equal((await fetch(`${url}/api/enquiries`)).status, 404);
  const response = await post("contact", examples.contact);
  const { reference } = await response.json();
  store.db
    .prepare("UPDATE enquiries SET created_at = ? WHERE id = ?")
    .run("2000-01-01T00:00:00.000Z", reference);
  assert.equal(store.purge(), 1);
  assert.equal(store.get(reference), null);
  assert.equal((await fetch(`${url}/api/health`)).status, 200);
});
