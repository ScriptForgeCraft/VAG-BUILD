import {
  calculatorFullRenovationRateCatalog,
  calculatorPricingConfig,
  calculatorProjectAdjustmentLabels,
  calculatorRateCatalog,
  calculatorScenarioMeta,
  calculatorSelectedWorkFieldCatalog,
  calculatorWorkModuleFieldMap,
} from "../model/constants.js";

const SCENARIO_SUFFIX_MAP = {
  minimal: "Min",
  realistic: "Typical",
  high: "Max",
};

function getScenarioValue(value, scenarioId) {
  if (typeof value === "number") {
    return value;
  }

  return value?.[scenarioId] ?? 1;
}

function getScenarioRateValue(rate, fieldBase, scenarioId) {
  const suffix = SCENARIO_SUFFIX_MAP[scenarioId] || SCENARIO_SUFFIX_MAP.realistic;
  return rate?.[`${fieldBase}${suffix}`] ?? 0;
}

function hasScenarioRateValue(rate, fieldBase) {
  return ["Min", "Typical", "Max"].some((suffix) => typeof rate?.[`${fieldBase}${suffix}`] === "number");
}

function getPackageOverrideValue(rate, pricingPackage, scenarioId) {
  const packageRate = rate?.packagePricing?.[pricingPackage];

  if (typeof packageRate === "number") {
    return packageRate;
  }

  return packageRate?.[scenarioId] ?? null;
}

export function roundToNearestStep(value, step = calculatorPricingConfig.roundingStep) {
  const normalized = Math.max(0, Number(value) || 0);
  return Math.round(normalized / step) * step;
}

function toCurrency(value) {
  return Math.round(Number(value) || 0);
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
  if (form.propertyType !== "apartment" || Number(form.floorNumber) <= 1) {
    return 0;
  }

  const floorDelta = Math.max(0, Number(form.floorNumber) - 1);
  const key = form.elevator === "yes" ? "withElevator" : "noElevator";
  const perFloor = getScenarioValue(calculatorPricingConfig.floorSurcharge[key], scenarioId);

  return floorDelta * perFloor;
}

function getCityLogistics(form, scenarioId) {
  return getScenarioValue(calculatorPricingConfig.cityLogistics[form.locationCity], scenarioId);
}

function getPackageCoefficient(pricingPackage, scenarioId) {
  return getScenarioValue(calculatorPricingConfig.packageCoefficients[pricingPackage], scenarioId);
}

function createEmptyLineItem({ rateKey, fieldName, quantity }) {
  const rate = calculatorRateCatalog[rateKey];

  return {
    key: rateKey,
    fieldName,
    label: rate?.label || null,
    unit: rate?.unit || "",
    pricingMode: rate?.pricingMode || "unit",
    quantity: Math.max(0, Number(quantity) || 0),
    laborSubtotal: 0,
    materialSubtotal: 0,
    packageSubtotal: 0,
    minimumOrderAdjustment: 0,
    totalBeforeRounding: 0,
    finalRoundedTotal: 0,
    sourceConfidence: rate?.sourceConfidence || "low",
    sourceNote: rate?.sourceNote || "",
  };
}

export function calculateRateLineItem({
  rateKey,
  fieldName = null,
  quantity = 0,
  scenarioId = "realistic",
  pricingPackage = "labor-plus-rough",
  estimateMode = "selected-works",
  rateMultiplier = 1,
} = {}) {
  const rate = calculatorRateCatalog[rateKey];
  const safeQuantity = Math.max(0, Number(quantity) || 0);

  if (!rate || safeQuantity <= 0) {
    return createEmptyLineItem({ rateKey, fieldName, quantity: safeQuantity });
  }

  let laborSubtotal = 0;
  let materialSubtotal = 0;
  let packageSubtotal = 0;

  const packageOverrideValue = getPackageOverrideValue(rate, pricingPackage, scenarioId);

  switch (rate.pricingMode) {
    case "hybrid": {
      const laborRate = getScenarioRateValue(rate, "labor", scenarioId);
      const materialRate = getScenarioRateValue(rate, "material", scenarioId);
      const totalRate = getScenarioRateValue(rate, "total", scenarioId);

      if (pricingPackage === "labor-only" && laborRate > 0) {
        laborSubtotal = safeQuantity * laborRate;
      } else {
        const effectiveTotal =
          packageOverrideValue !== null
            ? safeQuantity * packageOverrideValue
            : totalRate > 0
              ? safeQuantity * totalRate
              : safeQuantity * (laborRate + materialRate);

        if (laborRate > 0) {
          laborSubtotal = safeQuantity * laborRate;
          materialSubtotal = Math.max(0, effectiveTotal - laborSubtotal);
        } else if (materialRate > 0) {
          materialSubtotal = effectiveTotal;
        } else {
          packageSubtotal = effectiveTotal;
        }
      }
      break;
    }
    case "unit":
    case "hourly":
    case "minimum_order": {
      const laborRate = getScenarioRateValue(rate, "labor", scenarioId);
      const materialRate = getScenarioRateValue(rate, "material", scenarioId);
      const totalRate = getScenarioRateValue(rate, "total", scenarioId);

      if (packageOverrideValue !== null) {
        const overrideTotal = safeQuantity * packageOverrideValue;

        if (pricingPackage === "labor-only" && laborRate > 0) {
          laborSubtotal = safeQuantity * laborRate;
        } else if (laborRate > 0 || materialRate > 0) {
          laborSubtotal = safeQuantity * laborRate;
          materialSubtotal = safeQuantity * materialRate;
          packageSubtotal = Math.max(0, overrideTotal - laborSubtotal - materialSubtotal);
        } else {
          packageSubtotal = overrideTotal;
        }
      } else if (pricingPackage === "labor-only" && laborRate > 0) {
        laborSubtotal = safeQuantity * laborRate;
      } else if (laborRate > 0 || materialRate > 0) {
        laborSubtotal = safeQuantity * laborRate;
        materialSubtotal = safeQuantity * materialRate;
        packageSubtotal = Math.max(0, safeQuantity * totalRate - laborSubtotal - materialSubtotal);
      } else {
        packageSubtotal = safeQuantity * totalRate;
      }
      break;
    }
    case "package": {
      packageSubtotal = safeQuantity * getScenarioRateValue(rate, "packageTotal", scenarioId);
      break;
    }
    case "sqm_package": {
      if (estimateMode !== "full-renovation") {
        return createEmptyLineItem({ rateKey, fieldName, quantity: safeQuantity });
      }

      packageSubtotal =
        safeQuantity * getScenarioRateValue(rate, "total", scenarioId) * (Number(rateMultiplier) || 1);
      break;
    }
    default:
      packageSubtotal = safeQuantity * getScenarioRateValue(rate, "total", scenarioId);
      break;
  }

  laborSubtotal = toCurrency(laborSubtotal);
  materialSubtotal = toCurrency(materialSubtotal);
  packageSubtotal = toCurrency(packageSubtotal);

  const rawTotal = laborSubtotal + materialSubtotal + packageSubtotal;
  const minimumOrderAdjustment =
    rate.pricingMode === "minimum_order" && safeQuantity > 0
      ? Math.max(0, toCurrency(rate.minOrderTotal) - rawTotal)
      : 0;
  const totalBeforeRounding = rawTotal + minimumOrderAdjustment;

  return {
    key: rateKey,
    fieldName,
    label: rate.label || null,
    unit: rate.unit,
    pricingMode: rate.pricingMode,
    quantity: safeQuantity,
    laborSubtotal,
    materialSubtotal,
    packageSubtotal,
    minimumOrderAdjustment,
    totalBeforeRounding,
    finalRoundedTotal: roundToNearestStep(totalBeforeRounding),
    sourceConfidence: rate.sourceConfidence,
    sourceNote: rate.sourceNote,
  };
}

function calculateSelectedWorksScenarioBreakdown(form, scenarioId) {
  const selectedModules = Array.isArray(form.workModules) ? form.workModules : [];
  const selectedFields = selectedModules.flatMap((moduleId) => calculatorWorkModuleFieldMap[moduleId] || []);
  const uniqueFields = Array.from(new Set(selectedFields));

  const items = uniqueFields
    .map((fieldName) => {
      const quantity = Number(form[fieldName]) || 0;
      const rateKey = calculatorSelectedWorkFieldCatalog[fieldName]?.rateKey;

      return calculateRateLineItem({
        rateKey,
        fieldName,
        quantity,
        scenarioId,
        pricingPackage: form.pricingPackage,
        estimateMode: "selected-works",
      });
    })
    .filter((item) => item.totalBeforeRounding > 0);

  const totalBeforeRounding = items.reduce((sum, item) => sum + item.totalBeforeRounding, 0);

  return {
    scenarioId,
    mode: "selected-works",
    items,
    projectAdjustmentDetails: [],
    projectAdjustmentTotal: 0,
    totalBeforeRounding,
    total: roundToNearestStep(totalBeforeRounding),
  };
}

function applyMultiplierAdjustment(details, key, currentTotal, multiplier) {
  const normalizedMultiplier = Number(multiplier) || 1;

  if (normalizedMultiplier === 1) {
    return currentTotal;
  }

  const nextTotal = currentTotal * normalizedMultiplier;
  const delta = toCurrency(nextTotal - currentTotal);

  if (delta !== 0) {
    details.push({
      key,
      label: calculatorProjectAdjustmentLabels[key],
      amount: delta,
    });
  }

  return currentTotal + delta;
}

function applyFlatAdjustment(details, key, currentTotal, amount) {
  const delta = toCurrency(amount);

  if (delta !== 0) {
    details.push({
      key,
      label: calculatorProjectAdjustmentLabels[key],
      amount: delta,
    });
  }

  return currentTotal + delta;
}

function calculateFullRenovationScenarioBreakdown(form, scenarioId) {
  const area = Math.max(0, Number(form.area) || 0);
  const renovationRateKey =
    calculatorFullRenovationRateCatalog[form.renovationLevel] ||
    calculatorFullRenovationRateCatalog.capital;
  const canApplyReplanning = form.renovationLevel !== "cosmetic";
  const canApplyDemolition =
    ["secondary-empty", "secondary-lived-in"].includes(form.conditionStage) ||
    (canApplyReplanning && form.replanningNeeded === "yes");
  const projectAdjustmentDetails = [];
  const baseItem = calculateRateLineItem({
    rateKey: renovationRateKey,
    quantity: area,
    scenarioId,
    pricingPackage: form.pricingPackage,
    estimateMode: "full-renovation",
    rateMultiplier: getPackageCoefficient(form.pricingPackage, scenarioId),
  });

  let totalBeforeRounding = baseItem.totalBeforeRounding;

  totalBeforeRounding = applyMultiplierAdjustment(
    projectAdjustmentDetails,
    "cityCoefficient",
    totalBeforeRounding,
    getCityCoefficient(form)
  );
  totalBeforeRounding = applyMultiplierAdjustment(
    projectAdjustmentDetails,
    "districtCoefficient",
    totalBeforeRounding,
    getDistrictCoefficient(form)
  );
  totalBeforeRounding = applyMultiplierAdjustment(
    projectAdjustmentDetails,
    "propertyCoefficient",
    totalBeforeRounding,
    getScenarioValue(calculatorPricingConfig.propertyCoefficients[form.propertyType], scenarioId)
  );
  totalBeforeRounding = applyMultiplierAdjustment(
    projectAdjustmentDetails,
    "conditionCoefficient",
    totalBeforeRounding,
    getScenarioValue(calculatorPricingConfig.conditionCoefficients[form.conditionStage], scenarioId)
  );
  totalBeforeRounding = applyMultiplierAdjustment(
    projectAdjustmentDetails,
    "engineeringCoefficient",
    totalBeforeRounding,
    getScenarioValue(calculatorPricingConfig.engineeringCoefficients[form.engineeringScope], scenarioId)
  );

  if (form.propertyType !== "commercial") {
    totalBeforeRounding = applyMultiplierAdjustment(
      projectAdjustmentDetails,
      "wetZoneCoefficient",
      totalBeforeRounding,
      getScenarioValue(calculatorPricingConfig.wetZoneCoefficients[form.wetZonesCount], scenarioId)
    );
  }

  totalBeforeRounding = applyMultiplierAdjustment(
    projectAdjustmentDetails,
    "accessCoefficient",
    totalBeforeRounding,
    getScenarioValue(calculatorPricingConfig.accessCoefficients[form.accessLevel], scenarioId)
  );
  totalBeforeRounding = applyMultiplierAdjustment(
    projectAdjustmentDetails,
    "urgencyCoefficient",
    totalBeforeRounding,
    getScenarioValue(calculatorPricingConfig.urgencyCoefficients[form.urgency], scenarioId)
  );

  if (canApplyDemolition) {
    totalBeforeRounding = applyFlatAdjustment(
      projectAdjustmentDetails,
      "demolitionScope",
      totalBeforeRounding,
      area * getScenarioValue(calculatorPricingConfig.demolitionScopeRates[form.demolitionScope], scenarioId)
    );
  }

  if (canApplyReplanning && form.replanningNeeded === "yes") {
    totalBeforeRounding = applyFlatAdjustment(
      projectAdjustmentDetails,
      "replanning",
      totalBeforeRounding,
      getScenarioValue(calculatorPricingConfig.replanningCosts[form.propertyType], scenarioId)
    );
  }

  totalBeforeRounding = applyFlatAdjustment(
    projectAdjustmentDetails,
    "cityLogistics",
    totalBeforeRounding,
    getCityLogistics(form, scenarioId)
  );
  totalBeforeRounding = applyFlatAdjustment(
    projectAdjustmentDetails,
    "floorSurcharge",
    totalBeforeRounding,
    getFloorSurcharge(form, scenarioId)
  );

  const projectAdjustmentTotal = projectAdjustmentDetails.reduce((sum, item) => sum + item.amount, 0);

  return {
    scenarioId,
    mode: "full-renovation",
    items: baseItem.totalBeforeRounding > 0 ? [baseItem] : [],
    projectAdjustmentDetails,
    projectAdjustmentTotal,
    totalBeforeRounding,
    total: roundToNearestStep(totalBeforeRounding),
  };
}

export function calculateEstimateScenarioBreakdowns(form) {
  return calculatorScenarioMeta.reduce((accumulator, { id }) => {
    accumulator[id] =
      form.estimateMode === "selected-works"
        ? calculateSelectedWorksScenarioBreakdown(form, id)
        : calculateFullRenovationScenarioBreakdown(form, id);

    return accumulator;
  }, {});
}

export function calculateEstimateScenarios(form) {
  const breakdowns = calculateEstimateScenarioBreakdowns(form);

  return Object.fromEntries(Object.entries(breakdowns).map(([scenarioId, value]) => [scenarioId, value.total]));
}

export function calculateEstimate(form) {
  return calculateEstimateScenarios(form).realistic;
}

export function getScenarioRateBound(rateKey, scenarioId, fieldBase = "total") {
  const rate = calculatorRateCatalog[rateKey];

  if (!rate) {
    return 0;
  }

  if (!hasScenarioRateValue(rate, fieldBase)) {
    return 0;
  }

  return getScenarioRateValue(rate, fieldBase, scenarioId);
}
