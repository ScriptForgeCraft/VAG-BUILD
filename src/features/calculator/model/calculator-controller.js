import { appStore } from "../../../app/model/app-store.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { formatNumber } from "../../../shared/lib/number.js";
import { openWhatsAppMessage } from "../../../shared/lib/whatsapp.js";
import {
  calculateEstimateScenarioBreakdowns,
  calculateEstimateScenarios,
} from "../lib/estimate-formula.js";
import { buildCalculatorRequestLines } from "../lib/request-message.js";
import { renderEstimateBreakdown } from "../ui/calculator-form.js";
import { calculatorStore, setCalculatorStep, updateCalculatorField } from "./calculator-store.js";

function syncChoiceButtons(formState, root) {
  root.querySelectorAll("[data-choice]").forEach((button) => {
    const field = button.dataset.field;
    const value = button.dataset.value;
    button.classList.toggle("is-selected", Boolean(field && formState[field] === value));
  });
}

function syncCheckboxCards(formState, root) {
  const selectedValues = new Set(Array.isArray(formState.workModules) ? formState.workModules : []);

  root.querySelectorAll("[data-checkbox-card]").forEach((label) => {
    const value = label.dataset.value;
    const input = label.querySelector('input[type="checkbox"]');
    const selected = Boolean(value && selectedValues.has(value));

    label.classList.toggle("is-selected", selected);

    if (input instanceof HTMLInputElement) {
      input.checked = selected;
    }
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

function getVisibilityState(form) {
  const selectedWorks = new Set(Array.isArray(form.workModules) ? form.workModules : []);
  const isFullRenovation = form.estimateMode === "full-renovation";
  const canShowDemolitionScope =
    isFullRenovation &&
    (["secondary-empty", "secondary-lived-in"].includes(form.conditionStage) || form.replanningNeeded === "yes");

  return {
    district: form.locationCity === "yerevan",
    "full-renovation": isFullRenovation,
    "selected-works": form.estimateMode === "selected-works",
    "wet-zones": isFullRenovation && form.propertyType !== "commercial",
    replanning: isFullRenovation && form.renovationLevel !== "cosmetic",
    "demolition-scope": canShowDemolitionScope,
    floor: form.propertyType === "apartment",
    elevator: form.propertyType === "apartment" && Number(form.floorNumber) > 1,
    "module-demolition": selectedWorks.has("demolition"),
    "module-electrical": selectedWorks.has("electrical"),
    "module-plumbing": selectedWorks.has("plumbing"),
    "module-screed": selectedWorks.has("screed"),
    "module-tile": selectedWorks.has("tile"),
    "module-wall-paint": selectedWorks.has("wall-paint"),
    "module-laminate-floor": selectedWorks.has("laminate-floor"),
  };
}

function syncVisibility(form, root) {
  const visibility = getVisibilityState(form);

  root.querySelectorAll("[data-visibility]").forEach((element) => {
    const visible = visibility[element.dataset.visibility] ?? false;
    element.hidden = !visible;
    element.classList.toggle("is-hidden", !visible);
  });
}

function syncFieldValues(form, root) {
  root.querySelectorAll("input[name], textarea[name], select[name]").forEach((field) => {
    if (field instanceof HTMLInputElement) {
      if (field.type === "checkbox") {
        const selectedValues = Array.isArray(form[field.name]) ? form[field.name] : [];
        field.checked = selectedValues.includes(field.value);
        return;
      }

      if (field === document.activeElement) {
        return;
      }

      const nextValue = form[field.name];
      if (typeof nextValue !== "undefined" && field.value !== String(nextValue)) {
        field.value = String(nextValue);
      }
      return;
    }

    if (field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
      if (field === document.activeElement) {
        return;
      }

      const nextValue = form[field.name];
      if (typeof nextValue !== "undefined" && field.value !== String(nextValue)) {
        field.value = String(nextValue);
      }
    }
  });
}

export function initCalculatorController() {
  const calculatorForm = document.getElementById("calculator-form");
  if (!calculatorForm) {
    return () => {};
  }

  const areaValue = document.querySelector("[data-area-value]");
  const estimateValues = Array.from(document.querySelectorAll("[data-estimate-value]"));
  const panels = document.querySelectorAll(".calculator-panel");
  const indicators = document.querySelectorAll("[data-step-indicator]");
  const backButton = document.querySelector("[data-calculator-back]");
  const nextButton = document.querySelector("[data-calculator-next]");
  const sendButton = document.querySelector("[data-calculator-send]");
  const breakdownRoot = document.querySelector("[data-estimate-breakdown-root]");

  const syncView = ({ step, form }) => {
    const estimates = calculateEstimateScenarios(form);
    const breakdowns = calculateEstimateScenarioBreakdowns(form);
    const { language } = appStore.getState();

    syncChoiceButtons(form, calculatorForm);
    syncCheckboxCards(form, calculatorForm);
    syncPanels(step, panels, indicators, backButton, nextButton, sendButton);
    syncVisibility(form, calculatorForm);
    syncFieldValues(form, calculatorForm);

    if (areaValue) {
      areaValue.textContent = String(form.area);
    }

    estimateValues.forEach((element) => {
      const scenarioId = element.dataset.estimateValue;
      element.textContent = formatNumber(estimates[scenarioId] || 0);
    });

    if (breakdownRoot) {
      breakdownRoot.innerHTML = renderEstimateBreakdown({
        breakdown: breakdowns.realistic,
        form,
        language,
      });
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

    if (!field || !("name" in field) || !field.name) {
      return;
    }

    if (field instanceof HTMLInputElement) {
      if (field.type === "checkbox") {
        const currentValues = calculatorStore.getState().form[field.name] || [];
        const nextValues = field.checked
          ? [...currentValues, field.value]
          : currentValues.filter((item) => item !== field.value);

        updateCalculatorField(field.name, Array.from(new Set(nextValues)));
        return;
      }

      updateCalculatorField(field.name, field.value.trim());
      return;
    }

    if (field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
      updateCalculatorField(field.name, field.value.trim());
    }
  };

  const handleBack = () => setCalculatorStep(Math.max(1, calculatorStore.getState().step - 1));
  const handleNext = () => setCalculatorStep(Math.min(4, calculatorStore.getState().step + 1));
  const handleSend = () => {
    const { language } = appStore.getState();
    const { form } = calculatorStore.getState();
    const estimates = calculateEstimateScenarios(form);
    const formattedEstimates = Object.fromEntries(
      Object.entries(estimates).map(([key, value]) => [key, formatNumber(value)])
    );

    openWhatsAppMessage({
      phone: siteConfig.phone.raw,
      lines: buildCalculatorRequestLines({
        language,
        form,
        estimates: formattedEstimates,
      }),
    });
  };

  calculatorForm.addEventListener("click", handleChoiceClick);
  calculatorForm.addEventListener("input", handleFieldInput);
  calculatorForm.addEventListener("change", handleFieldInput);
  backButton?.addEventListener("click", handleBack);
  nextButton?.addEventListener("click", handleNext);
  sendButton?.addEventListener("click", handleSend);

  return () => {
    unsubscribe();
    calculatorForm.removeEventListener("click", handleChoiceClick);
    calculatorForm.removeEventListener("input", handleFieldInput);
    calculatorForm.removeEventListener("change", handleFieldInput);
    backButton?.removeEventListener("click", handleBack);
    nextButton?.removeEventListener("click", handleNext);
    sendButton?.removeEventListener("click", handleSend);
  };
}
