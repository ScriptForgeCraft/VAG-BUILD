import { createStore } from "../../../shared/state/create-store.js";
import { initialCalculatorState } from "./constants.js";

/**
 * @typedef {Object} CalculatorForm
 * @property {string} objectType
 * @property {number} area
 * @property {string} workType
 * @property {string} condition
 * @property {string} urgency
 * @property {string} demolition
 * @property {string} materials
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
      [field]: field === "area" ? Number(value) : value,
    },
  }));
}
