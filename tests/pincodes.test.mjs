import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
function getLocationWhatsAppUrl(locationName, district, pincode, phone = "919810863934") {
  const loc = locationName || "my area";
  const dist = district || "our district";
  const pin = pincode || "my PIN code";
  const target = phone.replace(/\D/g, "");
  const message = `Hello Consumer Point, I want to enquire about service availability in ${loc}, ${dist}, PIN Code: ${pin}. Please assist me.`;
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}

const pincodes = JSON.parse(
  readFileSync(resolve(process.cwd(), "config/pincodes.json"), "utf8"),
);

test("pincode database contains all 432 records", () => {
  assert.equal(pincodes.length, 432);
});

test("all records have 6-digit valid numeric PIN codes", () => {
  for (const r of pincodes) {
    assert.match(r.pincode, /^[1-9]\d{5}$/, `Invalid PIN code: ${r.pincode}`);
    assert.ok(r.officeName, "Office name must exist");
    assert.ok(r.district, "District must exist");
    assert.ok(r.taluk, "Taluk must exist");
  }
});

test("includes Sheet 1 UpCountry locations: Sirathu (212217), Chakwan (212201), Rajrooppur (212202)", () => {
  const sirathu = pincodes.find((p) => p.pincode === "212217");
  assert.ok(sirathu, "Sirathu must exist in database");
  assert.equal(sirathu.officeName, "Sirathu");
  assert.equal(sirathu.district, "Kaushambi");

  const chakwan = pincodes.find((p) => p.pincode === "212201");
  assert.ok(chakwan, "Chakwan must exist in database");
  assert.equal(chakwan.officeName, "Chakwan");

  const rajrooppur = pincodes.find((p) => p.pincode === "212202");
  assert.ok(rajrooppur, "Rajrooppur must exist in database");
  assert.equal(rajrooppur.officeName, "Rajrooppur");
  assert.equal(rajrooppur.district, "Prayagraj");
});

test("PIN codes with multiple post offices return all matching locations (e.g. 222002)", () => {
  const matches = pincodes.filter((p) => p.pincode === "222002");
  assert.ok(matches.length > 10, "PIN 222002 should have 17 associated post offices");
  assert.ok(matches.some((m) => m.officeName.includes("Civil Court")));
  assert.ok(matches.some((m) => m.officeName.includes("Harbaspur")));
});

test("single PIN search works accurately for 222001 (Jaunpur H.O)", () => {
  const matches = pincodes.filter((p) => p.pincode === "222001");
  assert.ok(matches.length >= 6);
  assert.ok(matches.some((m) => m.officeName === "Jaunpur H.O"));
});

test("location name search matches case-insensitively", () => {
  const chandwak = pincodes.filter((p) =>
    p.officeName.toLowerCase().includes("chandwak"),
  );
  assert.ok(chandwak.length > 0);
  assert.equal(chandwak[0].pincode, "222129");
});

test("district filtering partitions locations correctly", () => {
  const jaunpur = pincodes.filter((p) => p.district === "Jaunpur");
  const kaushambi = pincodes.filter((p) => p.district === "Kaushambi");
  const prayagraj = pincodes.filter((p) => p.district === "Prayagraj");

  assert.equal(jaunpur.length, 429);
  assert.equal(kaushambi.length, 2);
  assert.equal(prayagraj.length, 1);
  assert.equal(jaunpur.length + kaushambi.length + prayagraj.length, 432);
});

test("sub-district / taluk search works correctly", () => {
  const kerakat = pincodes.filter((p) => p.taluk === "Kerakat");
  assert.ok(kerakat.length > 50, "Kerakat taluk should have over 50 post offices");

  const shahganj = pincodes.filter((p) => p.taluk === "Shahganj");
  assert.ok(shahganj.length > 50, "Shahganj taluk should have over 50 post offices");
});

test("invalid and unserviced PIN codes return empty results", () => {
  assert.equal(pincodes.filter((p) => p.pincode === "110001").length, 0);
  assert.equal(pincodes.filter((p) => p.pincode === "999999").length, 0);
  assert.equal(pincodes.filter((p) => p.pincode === "000000").length, 0);
});

test("WhatsApp enquiry message formatting conforms to requirement", () => {
  const url = getLocationWhatsAppUrl("Jaunpur H.O", "Jaunpur", "222001", "919810863934");
  assert.ok(url.startsWith("https://wa.me/919810863934?text="));

  const decoded = decodeURIComponent(url.replace("https://wa.me/919810863934?text=", ""));
  assert.equal(
    decoded,
    "Hello Consumer Point, I want to enquire about service availability in Jaunpur H.O, Jaunpur, PIN Code: 222001. Please assist me.",
  );
});
