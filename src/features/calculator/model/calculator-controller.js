import { appStore } from "../../../app/model/app-store.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { formatNumber } from "../../../shared/lib/number.js";
import { openWhatsAppMessage } from "../../../shared/lib/whatsapp.js";
import { buildCalculatorRequestLines } from "../lib/request-message.js";
import { calculateEstimate } from "../lib/estimate-formula.js";
import { calculatorStore, setCalculatorStep, updateCalculatorField } from "./calculator-store.js";

function syncChoiceButtons(formState, root) {
  root.querySelectorAll("[data-choice]").forEach((button) => {
    const field = button.dataset.field;
    const value = button.dataset.value;
    button.classList.toggle("is-selected", Boolean(field && formState[field] === value));
  });
}

function syncPanels(step, panels, indicators, backButton, nextButton, sendButton) {
  panels.forEach((panel) => {
    const active = Number(panel.dataset.step) === step;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });

  indicators.forEach((indicator) => {
    const indicatorStep = Number(indicator.dataset.stepIndicator);
    indicator.classList.toggle("is-active", indicatorStep === step);
    indicator.classList.toggle("is-complete", indicatorStep < step);
  });

  backButton?.classList.toggle("is-hidden", step === 1);
  nextButton?.classList.toggle("is-hidden", step === 4);
  sendButton?.classList.toggle("is-hidden", step !== 4);
}

export function initCalculatorController() {
  const calculatorForm = document.getElementById("calculator-form");
  if (!calculatorForm) {
    return () => {};
  }

  const areaRange = document.getElementById("area-range");
  const areaValue = document.querySelector("[data-area-value]");
  const estimateValue = document.querySelector("[data-estimate-value]");
  const conditionSelect = document.getElementById("condition-select");
  const panels = document.querySelectorAll(".calculator-panel");
  const indicators = document.querySelectorAll("[data-step-indicator]");
  const backButton = document.querySelector("[data-calculator-back]");
  const nextButton = document.querySelector("[data-calculator-next]");
  const sendButton = document.querySelector("[data-calculator-send]");

  const syncView = ({ step, form }) => {
    syncChoiceButtons(form, calculatorForm);
    syncPanels(step, panels, indicators, backButton, nextButton, sendButton);

    if (areaRange) {
      areaRange.value = String(form.area);
    }

    if (areaValue) {
      areaValue.textContent = String(form.area);
    }

    if (conditionSelect) {
      conditionSelect.value = form.condition;
    }

    if (estimateValue) {
      estimateValue.textContent = formatNumber(calculateEstimate(form));
    }
  };

  const unsubscribe = calculatorStore.subscribe(syncView);
  syncView(calculatorStore.getState());

  const handleChoiceClick = (event) => {
    const button = event.target.closest("[data-choice]");
    if (!button) {
      return;
    }

    const { field, value } = button.dataset;
    if (field && typeof value === "string") {
      updateCalculatorField(field, value);
    }
  };

  const handleFieldInput = (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLTextAreaElement)) {
      return;
    }

    if (!field.name || field.type === "range") {
      return;
    }

    updateCalculatorField(field.name, field.value.trim());
  };

  const handleAreaInput = () => updateCalculatorField("area", areaRange?.value || 0);
  const handleConditionChange = () => updateCalculatorField("condition", conditionSelect?.value || "");
  const handleBack = () => setCalculatorStep(Math.max(1, calculatorStore.getState().step - 1));
  const handleNext = () => setCalculatorStep(Math.min(4, calculatorStore.getState().step + 1));
  const handleSend = () => {
    const { language } = appStore.getState();
    const { form } = calculatorStore.getState();
    const estimate = formatNumber(calculateEstimate(form));

    openWhatsAppMessage({
      phone: siteConfig.phone.raw,
      lines: buildCalculatorRequestLines({
        language,
        form,
        estimate,
      }),
    });
  };

  calculatorForm.addEventListener("click", handleChoiceClick);
  calculatorForm.addEventListener("input", handleFieldInput);
  areaRange?.addEventListener("input", handleAreaInput);
  conditionSelect?.addEventListener("change", handleConditionChange);
  backButton?.addEventListener("click", handleBack);
  nextButton?.addEventListener("click", handleNext);
  sendButton?.addEventListener("click", handleSend);

  return () => {
    unsubscribe();
    calculatorForm.removeEventListener("click", handleChoiceClick);
    calculatorForm.removeEventListener("input", handleFieldInput);
    areaRange?.removeEventListener("input", handleAreaInput);
    conditionSelect?.removeEventListener("change", handleConditionChange);
    backButton?.removeEventListener("click", handleBack);
    nextButton?.removeEventListener("click", handleNext);
    sendButton?.removeEventListener("click", handleSend);
  };
}
