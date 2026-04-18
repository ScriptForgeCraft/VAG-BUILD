import {
  calculatorPricingConfig,
  calculatorScenarioMeta,
  calculatorWorkModuleFieldMap,
} from "../model/constants.js";

function getScenarioValue(value, scenarioId) {
  if (typeof value === "number") {
    return value;
  }

  return value?.[scenarioId] ?? 1;
}

function roundEstimate(value) {
  const rounded = Math.max(0, value);
  return Math.round(rounded / calculatorPricingConfig.roundingStep) * calculatorPricingConfig.roundingStep;
}

function getDistrictCoefficient(form) {
  if (form.locationCity !== "yerevan") {
    return 1;
  }

  return calculatorPricingConfig.districtCoefficients[form.locationDistrict] || 1;
}

function getCityCoefficient(form) {
  return calculatorPricingConfig.cityCoefficients[form.locationCity] || 1;
}

function getFloorSurcharge(form, scenarioId) {
  if (form.propertyType !== "apartment" || form.floorNumber <= 1) {
    return 0;
  }

  const floorDelta = Math.max(0, form.floorNumber - 1);
  const key = form.elevator === "yes" ? "withElevator" : "noElevator";
  const perFloor = getScenarioValue(calculatorPricingConfig.floorSurcharge[key], scenarioId);

  return floorDelta * perFloor;
}

function getCityLogistics(form, scenarioId) {
  return getScenarioValue(calculatorPricingConfig.cityLogistics[form.locationCity], scenarioId);
}

function getReserveRatio(scenarioId) {
  return calculatorScenarioMeta.find((item) => item.id === scenarioId)?.reserve || 0;
}

function calculateFullRenovationScenario(form, scenarioId) {
  const area = Number(form.area) || 0;
  const canApplyReplanning = form.renovationLevel !== "cosmetic";
  const canApplyDemolition =
    ["secondary-empty", "secondary-lived-in"].includes(form.conditionStage) ||
    (canApplyReplanning && form.replanningNeeded === "yes");
  const baseRate = getScenarioValue(
    calculatorPricingConfig.fullRenovationRates[form.renovationLevel] ||
      calculatorPricingConfig.fullRenovationRates.capital,
    scenarioId
  );

  let subtotal = area * baseRate;
  subtotal *= getScenarioValue(calculatorPricingConfig.packageCoefficients[form.pricingPackage], scenarioId);
  subtotal *= getCityCoefficient(form);
  subtotal *= getDistrictCoefficient(form);
  subtotal *= getScenarioValue(calculatorPricingConfig.propertyCoefficients[form.propertyType], scenarioId);
  subtotal *= getScenarioValue(calculatorPricingConfig.conditionCoefficients[form.conditionStage], scenarioId);
  subtotal *= getScenarioValue(calculatorPricingConfig.engineeringCoefficients[form.engineeringScope], scenarioId);
  subtotal *= getScenarioValue(calculatorPricingConfig.accessCoefficients[form.accessLevel], scenarioId);
  subtotal *= getScenarioValue(calculatorPricingConfig.urgencyCoefficients[form.urgency], scenarioId);

  if (form.propertyType !== "commercial") {
    subtotal *= getScenarioValue(calculatorPricingConfig.wetZoneCoefficients[form.wetZonesCount], scenarioId);
  }

  if (canApplyDemolition) {
    subtotal +=
      area *
      getScenarioValue(calculatorPricingConfig.demolitionScopeRates[form.demolitionScope], scenarioId);
  }

  if (canApplyReplanning && form.replanningNeeded === "yes") {
    subtotal += getScenarioValue(calculatorPricingConfig.replanningCosts[form.propertyType], scenarioId);
  }

  subtotal += getCityLogistics(form, scenarioId);
  subtotal += getFloorSurcharge(form, scenarioId);

  return roundEstimate(subtotal * (1 + getReserveRatio(scenarioId)));
}

function getSelectedWorkPackageCoefficient(fieldName, pricingPackage, scenarioId) {
  const fieldConfig = calculatorPricingConfig.selectedWorkPackageCoefficients[fieldName];
  if (!fieldConfig) {
    return 1;
  }

  return getScenarioValue(fieldConfig[pricingPackage], scenarioId);
}

function calculateSelectedWorksScenario(form, scenarioId) {
  const selectedModules = Array.isArray(form.workModules) ? form.workModules : [];

  if (!selectedModules.length) {
    return 0;
  }

  let subtotal = 0;

  selectedModules.forEach((moduleId) => {
    const fields = calculatorWorkModuleFieldMap[moduleId] || [];

    fields.forEach((fieldName) => {
      const quantity = Number(form[fieldName]) || 0;
      const rate = getScenarioValue(calculatorPricingConfig.selectedWorkRates[fieldName], scenarioId);
      const packageCoefficient = getSelectedWorkPackageCoefficient(fieldName, form.pricingPackage, scenarioId);

      subtotal += quantity * rate * packageCoefficient;
    });
  });

  subtotal *= getCityCoefficient(form);
  subtotal *= getDistrictCoefficient(form);
  subtotal *= getScenarioValue(calculatorPricingConfig.propertyCoefficients[form.propertyType], scenarioId);
  subtotal *= getScenarioValue(calculatorPricingConfig.accessCoefficients[form.accessLevel], scenarioId);
  subtotal *= getScenarioValue(calculatorPricingConfig.urgencyCoefficients[form.urgency], scenarioId);

  subtotal += getCityLogistics(form, scenarioId);
  subtotal += getFloorSurcharge(form, scenarioId);

  return roundEstimate(subtotal * (1 + getReserveRatio(scenarioId)));
}

export function calculateEstimateScenarios(form) {
  const scenarios = {};

  calculatorScenarioMeta.forEach(({ id }) => {
    scenarios[id] =
      form.estimateMode === "selected-works"
        ? calculateSelectedWorksScenario(form, id)
        : calculateFullRenovationScenario(form, id);
  });

  return scenarios;
}

export function calculateEstimate(form) {
  return calculateEstimateScenarios(form).realistic;
}
