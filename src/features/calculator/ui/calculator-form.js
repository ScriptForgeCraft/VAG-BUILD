import { renderButton } from "../../../shared/ui/button.js";
import { renderIcon } from "../../../shared/ui/icons.js";
import {
  renderChoiceButtons,
  renderInputField,
  renderRangeField,
  renderSegmentedButtons,
  renderSelectField,
  renderTextareaField,
} from "../../../shared/ui/form-controls.js";
import { escapeHtml } from "../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../shared/lib/i18n.js";
import { formatNumber } from "../../../shared/lib/number.js";
import { calculateEstimate } from "../lib/estimate-formula.js";
import {
  calculatorFields,
  calculatorProgressSteps,
  calculatorText,
  initialCalculatorForm,
} from "../model/constants.js";

function renderProgressStep(item) {
  return `
    <li class="calculator-progress__item${item.step === 1 ? " is-active" : ""}" data-step-indicator="${item.step}">
      <span class="calculator-progress__number">${String(item.step).padStart(2, "0")}</span>
      <span ${createI18nTextAttributes(item.label)}>${escapeHtml(item.label.am)}</span>
    </li>
  `;
}

export function renderCalculatorForm() {
  const initialEstimate = formatNumber(calculateEstimate(initialCalculatorForm));

  return `
    <div class="calculator-card">
      <aside class="calculator-card__aside">
        <div class="calculator-card__icon">
          ${renderIcon("calculator")}
        </div>
        <h2 ${createI18nTextAttributes(calculatorText.title)}>${escapeHtml(calculatorText.title.am)}</h2>
        <p ${createI18nTextAttributes(calculatorText.description)}>${escapeHtml(calculatorText.description.am)}</p>

        <ol class="calculator-progress">
          ${calculatorProgressSteps.map(renderProgressStep).join("")}
        </ol>
      </aside>

      <div class="calculator-card__body">
        <form class="calculator-form" id="calculator-form" novalidate>
          <section class="calculator-panel is-active" data-step="1">
            ${renderChoiceButtons({
              field: "objectType",
              label: calculatorFields.objectType.label,
              options: calculatorFields.objectType.options,
              selectedValue: initialCalculatorForm.objectType,
            })}
            ${renderRangeField({
              id: "area-range",
              name: "area",
              fieldName: "area",
              label: calculatorFields.area.label,
              value: initialCalculatorForm.area,
              min: 10,
              max: 500,
              step: 5,
            })}
          </section>

          <section class="calculator-panel" data-step="2" hidden>
            ${renderChoiceButtons({
              field: "workType",
              label: calculatorFields.workType.label,
              options: calculatorFields.workType.options,
              selectedValue: initialCalculatorForm.workType,
              layoutClass: "choice-stack",
              buttonClass: "choice-button choice-button--wide",
            })}
          </section>

          <section class="calculator-panel" data-step="3" hidden>
            <div class="calculator-grid">
              ${renderSelectField({
                id: "condition-select",
                name: "condition",
                fieldName: "condition",
                label: calculatorFields.condition.label,
                options: calculatorFields.condition.options,
              })}
              ${renderSegmentedButtons({
                field: "urgency",
                label: calculatorFields.urgency.label,
                options: calculatorFields.urgency.options,
                selectedValue: initialCalculatorForm.urgency,
              })}
              ${renderSegmentedButtons({
                field: "demolition",
                label: calculatorFields.demolition.label,
                options: calculatorFields.demolition.options,
                selectedValue: initialCalculatorForm.demolition,
                compact: true,
              })}
              ${renderSegmentedButtons({
                field: "materials",
                label: calculatorFields.materials.label,
                options: calculatorFields.materials.options,
                selectedValue: initialCalculatorForm.materials,
                compact: true,
              })}
            </div>
          </section>

          <section class="calculator-panel" data-step="4" hidden>
            <div class="estimate-box">
              <p class="estimate-box__label" ${createI18nTextAttributes(calculatorText.estimateLabel)}>
                ${escapeHtml(calculatorText.estimateLabel.am)}
              </p>
              <p class="estimate-box__value">
                ~ <span data-estimate-value>${initialEstimate}</span> <span class="estimate-box__currency">AMD</span>
              </p>
              <p class="estimate-box__note" ${createI18nTextAttributes(calculatorText.estimateNote)}>
                ${escapeHtml(calculatorText.estimateNote.am)}
              </p>
            </div>

            <div class="calculator-grid">
              ${renderInputField({
                id: "calc-name",
                name: "name",
                fieldName: "name",
                label: calculatorFields.name.label,
                placeholder: calculatorFields.name.placeholder,
                autocomplete: "name",
              })}
              ${renderInputField({
                id: "calc-phone",
                name: "phone",
                fieldName: "phone",
                type: "tel",
                label: calculatorFields.phone.label,
                placeholder: calculatorFields.phone.placeholder,
                autocomplete: "tel",
              })}
            </div>

            ${renderTextareaField({
              id: "calc-comment",
              name: "comment",
              fieldName: "comment",
              label: calculatorFields.comment.label,
              placeholder: calculatorFields.comment.placeholder,
            })}
          </section>

          <div class="calculator-actions">
            <button class="text-button js-only" type="button" data-calculator-back>
              ${renderIcon("arrow-left")}
              <span ${createI18nTextAttributes(calculatorText.backButton)}>${escapeHtml(calculatorText.backButton.am)}</span>
            </button>

            ${renderButton({
              type: "button",
              label: calculatorText.nextButton,
              variant: "primary",
              icon: "arrow-right",
              classes: "js-only",
              attributes: "data-calculator-next",
            })}

            ${renderButton({
              type: "button",
              label: calculatorText.sendButton,
              variant: "primary",
              icon: "send",
              classes: "is-hidden",
              attributes: "data-calculator-send",
            })}
          </div>
        </form>
      </div>
    </div>
  `;
}
