import fs from 'node:fs';
import { applianceGuides } from '../src/data/applianceGuides.ts';

const categoryIds = [
  "refrigerators",
  "air-conditioners",
  "washing-machines",
  "televisions",
  "water-purifiers",
  "microwave-ovens",
  "geysers",
  "dishwashers",
  "led-lighting",
  "inverters-power-backup",
  "electric-vehicles",
  "home-electrical-wiring",
];

console.log('Testing all 12 Category Guides...');
let pass = 0;

for (const id of categoryIds) {
  const guide = applianceGuides[id];
  if (!guide) {
    console.error(`FAIL: Missing category guide for ${id}`);
    process.exit(1);
  }
  
  // Section A
  if (!guide.knowYourProduct?.types?.length) throw new Error(`${id}: missing types`);
  if (!guide.knowYourProduct?.technologies?.length) throw new Error(`${id}: missing technologies`);
  if (!guide.knowYourProduct?.keySpecifications?.length) throw new Error(`${id}: missing keySpecifications`);
  if (!guide.knowYourProduct?.featuresWorthPayingFor?.length) throw new Error(`${id}: missing featuresWorthPayingFor`);
  if (!guide.knowYourProduct?.gimmicksToSkip?.length) throw new Error(`${id}: missing gimmicksToSkip`);
  if (!guide.knowYourProduct?.commonMisconceptions?.length) throw new Error(`${id}: missing commonMisconceptions`);

  // Section B
  if (!guide.buyingChecklist?.householdSizing?.length) throw new Error(`${id}: missing householdSizing`);
  if (!guide.buyingChecklist?.spaceAndInstallationChecks?.length) throw new Error(`${id}: missing spaceAndInstallationChecks`);
  if (!guide.buyingChecklist?.energyAndRunningCosts?.starRatingImpact) throw new Error(`${id}: missing starRatingImpact`);
  if (!guide.buyingChecklist?.longTermOwnershipCosts?.length) throw new Error(`${id}: missing longTermOwnershipCosts`);

  // Section C
  if (!guide.recommendationProfiles?.length) throw new Error(`${id}: missing recommendationProfiles`);

  // Section D
  if (!guide.warrantyGuidance?.standardComprehensive) throw new Error(`${id}: missing standardComprehensive`);
  if (!guide.warrantyGuidance?.criticalExclusions?.length) throw new Error(`${id}: missing criticalExclusions`);

  pass++;
  console.log(`PASS: [${pass}/12] ${guide.name} (${id})`);
}

console.log('All 12 category guides successfully validated!');

