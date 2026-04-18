import { calculatorPriceFactors } from "../model/constants.js";

export function calculateEstimate(form) {
  const estimate =
    calculatorPriceFactors.baseRate *
    form.area *
    (calculatorPriceFactors.objectType[form.objectType] || 1) *
    (calculatorPriceFactors.workType[form.workType] || 1) *
    (calculatorPriceFactors.condition[form.condition] || 1) *
    (calculatorPriceFactors.urgency[form.urgency] || 1) *
    (calculatorPriceFactors.demolition[form.demolition] || 1) *
    (calculatorPriceFactors.materials[form.materials] || 1);

  return Math.round(estimate / 1000) * 1000;
}
