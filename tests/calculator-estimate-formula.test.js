import test from "node:test";
import assert from "node:assert/strict";

import { calculateEstimateScenarios } from "../src/features/calculator/lib/estimate-formula.js";
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

test("selected works uses explicit electrical benchmark pricing", () => {
  const form = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-plus-rough",
    workModules: ["electrical"],
    electricalPoints: 10,
    locationDistrict: "other",
    accessLevel: "easy",
    urgency: "standard",
    floorNumber: 10,
    elevator: "no",
  });

  const scenarios = calculateEstimateScenarios(form);

  assert.equal(scenarios.minimal, 60000);
  assert.equal(scenarios.realistic, 62500);
  assert.equal(scenarios.high, 65500);
});

test("selected works no longer adds apartment floor surcharge", () => {
  const lowFloor = createForm({
    estimateMode: "selected-works",
    pricingPackage: "labor-only",
    workModules: ["electrical"],
    electricalPoints: 8,
    locationDistrict: "other",
    accessLevel: "easy",
    floorNumber: 1,
    elevator: "yes",
  });
  const highFloor = createForm({
    ...lowFloor,
    floorNumber: 12,
    elevator: "no",
  });

  assert.deepEqual(calculateEstimateScenarios(highFloor), calculateEstimateScenarios(lowFloor));
});

test("full renovation still keeps floor-based surcharge logic", () => {
  const lowFloor = createForm({
    estimateMode: "full-renovation",
    pricingPackage: "labor-plus-rough",
    renovationLevel: "capital",
    floorNumber: 1,
    elevator: "yes",
  });
  const highFloor = createForm({
    ...lowFloor,
    floorNumber: 12,
    elevator: "no",
  });

  const lowFloorEstimate = calculateEstimateScenarios(lowFloor);
  const highFloorEstimate = calculateEstimateScenarios(highFloor);

  assert.ok(highFloorEstimate.realistic > lowFloorEstimate.realistic);
});
