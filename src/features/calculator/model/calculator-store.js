import { createStore } from "../../../shared/state/create-store.js";
import { initialCalculatorState } from "./constants.js";

const NUMERIC_FIELDS = new Set([
  "area",
  "demolitionArea",
  "electricalPoints",
  "plumbingPoints",
  "screedArea",
  "tileArea",
  "paintArea",
  "laminateArea",
  "plinthLength",
  "floorNumber",
]);

/**
 * @typedef {Object} CalculatorForm
 * @property {string} locationCity
 * @property {string} locationDistrict
 * @property {string} propertyType
 * @property {number} area
 * @property {string} conditionStage
 * @property {string} estimateMode
 * @property {string} pricingPackage
 * @property {string} renovationLevel
 * @property {string} wetZonesCount
 * @property {string} engineeringScope
 * @property {string} replanningNeeded
 * @property {string} demolitionScope
 * @property {string[]} workModules
 * @property {number} demolitionArea
 * @property {number} electricalPoints
 * @property {number} plumbingPoints
 * @property {number} screedArea
 * @property {number} tileArea
 * @property {number} paintArea
 * @property {number} laminateArea
 * @property {number} plinthLength
 * @property {number} floorNumber
 * @property {string} elevator
 * @property {string} accessLevel
 * @property {string} urgency
 * @property {string} name
 * @property {string} phone
 * @property {string} comment
 */

export const calculatorStore = createStore(initialCalculatorState);

export function setCalculatorStep(step) {
  calculatorStore.setState((state) => ({
    ...state,
    step,
  }));
}

export function updateCalculatorField(field, value) {
  calculatorStore.setState((state) => ({
    ...state,
    form: {
      ...state.form,
      [field]: Array.isArray(value) ? value : NUMERIC_FIELDS.has(field) ? Number(value) : value,
    },
  }));
}
