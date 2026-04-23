import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateEstimateScenarioBreakdowns,
  calculateEstimateScenarios,
  calculateRateLineItem,
  roundToNearestStep,
} from "../src/features/calculator/lib/estimate-formula.js";
import { initialCalculatorForm } from "../src/features/calculator/model/constants.js";

function createForm(overrides = {}) {
  return {
    ...initialCalculatorForm,
    ...overrides,
    workModules: Array.isArray(overrides.workModules)
      ? [...overrides.workModules]
      : [...initialCalculatorForm.workModules],
  };
}

test("electric only uses new point range without project uplifts", () => {
  const form = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-rough",
    workModules: ["electrical"],
    electricalPoints: 10,
    locationCity: "gyumri",
    propertyType: "house",
    urgency: "very-urgent",
    floorNumber: 12,
    elevator: "no",
  });

  const scenarios = calculateEstimateScenarios(form);
  const breakdowns = calculateEstimateScenarioBreakdowns(form);

  assert.deepEqual(scenarios, {
    minimal: 40000,
    realistic: 54500,
    high: 85000,
  });
  assert.equal(breakdowns.realistic.items[0].laborSubtotal, 30000);
  assert.equal(breakdowns.realistic.items[0].materialSubtotal, 24550);
  assert.equal(breakdowns.realistic.items[0].finalRoundedTotal, 54500);
});

test("tile only uses the provided total range per m2", () => {
  const form = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-all",
    workModules: ["tile"],
    tileArea: 10,
  });

  assert.deepEqual(calculateEstimateScenarios(form), {
    minimal: 130000,
    realistic: 160000,
    high: 290000,
  });
});

test("plumbing minimum order is enforced for small jobs", () => {
  const form = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-rough",
    workModules: ["plumbing"],
    plumbingPoints: 1,
    plumberHours: 0,
  });

  const scenarios = calculateEstimateScenarios(form);
  const breakdowns = calculateEstimateScenarioBreakdowns(form);

  assert.deepEqual(scenarios, {
    minimal: 10000,
    realistic: 10000,
    high: 15000,
  });
  assert.equal(breakdowns.minimal.items[0].minimumOrderAdjustment, 5000);
  assert.equal(breakdowns.realistic.items[0].minimumOrderAdjustment, 0);
});

test("plumber hourly line uses the hourly rate table", () => {
  const form = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-rough",
    workModules: ["plumbing"],
    plumbingPoints: 0,
    plumberHours: 2,
  });

  assert.deepEqual(calculateEstimateScenarios(form), {
    minimal: 10000,
    realistic: 14000,
    high: 20000,
  });
});

test("package item helper returns the fixed package benchmark", () => {
  const line = calculateRateLineItem({
    rateKey: "bathroom_fixture_package",
    quantity: 1,
    scenarioId: "realistic",
    estimateMode: "selected-works",
  });

  assert.equal(line.packageSubtotal, 355000);
  assert.equal(line.finalRoundedTotal, 355000);
});

test("mixed selected works sums only the chosen positions", () => {
  const form = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-all",
    workModules: ["electrical", "tile", "plumbing"],
    electricalPoints: 10,
    tileArea: 5,
    plumbingPoints: 1,
    plumberHours: 2,
    paintArea: 999,
    locationCity: "other",
    propertyType: "commercial",
    urgency: "very-urgent",
    floorNumber: 18,
    elevator: "no",
  });

  assert.deepEqual(calculateEstimateScenarios(form), {
    minimal: 125000,
    realistic: 158500,
    high: 265000,
  });
});

test("rounding helper rounds to the nearest 500 AMD", () => {
  assert.equal(roundToNearestStep(5455), 5500);
  assert.equal(roundToNearestStep(54550), 54500);
});

test("selected works ignore floor, city, urgency, and other project uplifts", () => {
  const baseForm = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-rough",
    workModules: ["electrical"],
    electricalPoints: 8,
    locationCity: "yerevan",
    propertyType: "apartment",
    urgency: "standard",
    floorNumber: 1,
    elevator: "yes",
  });
  const adjustedForm = createForm({
    ...baseForm,
    locationCity: "gyumri",
    propertyType: "house",
    urgency: "very-urgent",
    floorNumber: 14,
    elevator: "no",
  });

  assert.deepEqual(calculateEstimateScenarios(adjustedForm), calculateEstimateScenarios(baseForm));
});

test("project uplifts remain available in full-renovation mode", () => {
  const baseForm = createForm({
    estimateMode: "full-renovation",
    pricingPackage: "labor-plus-rough",
    renovationLevel: "capital",
    area: 60,
    conditionStage: "new-shell",
    propertyType: "apartment",
    wetZonesCount: "1",
    engineeringScope: "keep-existing",
    replanningNeeded: "no",
    demolitionScope: "none",
    locationCity: "yerevan",
    urgency: "standard",
    floorNumber: 1,
    elevator: "yes",
  });
  const adjustedForm = createForm({
    ...baseForm,
    propertyType: "house",
    conditionStage: "secondary-lived-in",
    wetZonesCount: "3plus",
    engineeringScope: "full-replace",
    replanningNeeded: "yes",
    demolitionScope: "medium",
    locationCity: "gyumri",
    urgency: "very-urgent",
    floorNumber: 10,
    elevator: "no",
  });

  const baseBreakdowns = calculateEstimateScenarioBreakdowns(baseForm);
  const adjustedBreakdowns = calculateEstimateScenarioBreakdowns(adjustedForm);

  assert.ok(adjustedBreakdowns.realistic.total > baseBreakdowns.realistic.total);
  assert.notEqual(adjustedBreakdowns.realistic.projectAdjustmentTotal, 0);
  assert.ok(adjustedBreakdowns.realistic.projectAdjustmentDetails.length > 0);
});

test("scenario boundaries map to min, typical, and max values", () => {
  const form = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-all",
    workModules: ["electrical"],
    electricalPoints: 1,
  });

  assert.deepEqual(calculateEstimateScenarios(form), {
    minimal: 4000,
    realistic: 5500,
    high: 8500,
  });
});
