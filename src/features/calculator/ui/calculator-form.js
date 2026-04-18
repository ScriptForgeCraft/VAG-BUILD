import { renderButton } from "../../../shared/ui/button.js";
import { renderIcon } from "../../../shared/ui/icons.js";
import {
  renderCheckboxCards,
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
import { calculateEstimateScenarios } from "../lib/estimate-formula.js";
import {
  calculatorFields,
  calculatorProgressSteps,
  calculatorScenarioMeta,
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

function renderHint(translations, classes = "calculator-hint") {
  return `<p class="${classes}" ${createI18nTextAttributes(translations)}>${escapeHtml(translations.am)}</p>`;
}

function renderNumberField({ id, name, label, placeholder, value, min = 0, step = 1 }) {
  return renderInputField({
    id,
    name,
    type: "number",
    fieldName: name,
    label,
    placeholder,
    value,
    extraAttributes: `min="${min}" step="${step}"`,
  });
}

function renderScenarioCard(item, estimates) {
  return `
    <article class="estimate-card estimate-card--${item.id}">
      <p class="estimate-card__label" ${createI18nTextAttributes(item.label)}>${escapeHtml(item.label.am)}</p>
      <p class="estimate-card__value">
        <span data-estimate-value="${item.id}">${formatNumber(estimates[item.id])}</span>
        <span class="estimate-card__currency">AMD</span>
      </p>
      <p class="estimate-card__note" ${createI18nTextAttributes(item.note)}>${escapeHtml(item.note.am)}</p>
    </article>
  `;
}

export function renderCalculatorForm() {
  const initialEstimates = calculateEstimateScenarios(initialCalculatorForm);

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
            <div class="calculator-grid">
              ${renderSelectField({
                id: "location-city",
                name: "locationCity",
                fieldName: "locationCity",
                label: calculatorFields.locationCity.label,
                options: calculatorFields.locationCity.options,
              })}
              <div data-visibility="district">
                ${renderSelectField({
                  id: "location-district",
                  name: "locationDistrict",
                  fieldName: "locationDistrict",
                  label: calculatorFields.locationDistrict.label,
                  options: calculatorFields.locationDistrict.options,
                })}
              </div>
              ${renderSelectField({
                id: "condition-stage",
                name: "conditionStage",
                fieldName: "conditionStage",
                label: calculatorFields.conditionStage.label,
                options: calculatorFields.conditionStage.options,
              })}
            </div>

            ${renderChoiceButtons({
              field: "propertyType",
              label: calculatorFields.propertyType.label,
              options: calculatorFields.propertyType.options,
              selectedValue: initialCalculatorForm.propertyType,
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
              field: "estimateMode",
              label: calculatorFields.estimateMode.label,
              options: calculatorFields.estimateMode.options,
              selectedValue: initialCalculatorForm.estimateMode,
              layoutClass: "choice-stack",
              buttonClass: "choice-button choice-button--wide",
            })}

            <div class="calculator-spacer"></div>

            ${renderChoiceButtons({
              field: "pricingPackage",
              label: calculatorFields.pricingPackage.label,
              options: calculatorFields.pricingPackage.options,
              selectedValue: initialCalculatorForm.pricingPackage,
              layoutClass: "choice-stack",
              buttonClass: "choice-button choice-button--wide",
            })}
          </section>

          <section class="calculator-panel" data-step="3" hidden>
            <div data-visibility="full-renovation">
              ${renderChoiceButtons({
                field: "renovationLevel",
                label: calculatorFields.renovationLevel.label,
                options: calculatorFields.renovationLevel.options,
                selectedValue: initialCalculatorForm.renovationLevel,
                layoutClass: "choice-stack",
                buttonClass: "choice-button choice-button--wide",
              })}

              <div class="calculator-grid">
                <div data-visibility="wet-zones">
                  ${renderSegmentedButtons({
                    field: "wetZonesCount",
                    label: calculatorFields.wetZonesCount.label,
                    options: calculatorFields.wetZonesCount.options,
                    selectedValue: initialCalculatorForm.wetZonesCount,
                  })}
                </div>
                ${renderSegmentedButtons({
                  field: "engineeringScope",
                  label: calculatorFields.engineeringScope.label,
                  options: calculatorFields.engineeringScope.options,
                  selectedValue: initialCalculatorForm.engineeringScope,
                })}
                <div data-visibility="replanning">
                  ${renderSegmentedButtons({
                    field: "replanningNeeded",
                    label: calculatorFields.replanningNeeded.label,
                    options: calculatorFields.replanningNeeded.options,
                    selectedValue: initialCalculatorForm.replanningNeeded,
                    compact: true,
                  })}
                </div>
              </div>

              <div data-visibility="demolition-scope">
                ${renderChoiceButtons({
                  field: "demolitionScope",
                  label: calculatorFields.demolitionScope.label,
                  options: calculatorFields.demolitionScope.options,
                  selectedValue: initialCalculatorForm.demolitionScope,
                  layoutClass: "choice-grid",
                })}
              </div>
            </div>

            <div data-visibility="selected-works" hidden>
              ${renderHint(calculatorText.selectedWorksHint)}
              ${renderCheckboxCards({
                field: "workModules",
                label: calculatorFields.workModules.label,
                options: calculatorFields.workModules.options,
                selectedValues: initialCalculatorForm.workModules,
              })}

              <div class="calculator-grid">
                <div data-visibility="module-demolition" hidden>
                  ${renderNumberField({
                    id: "demolition-area",
                    name: "demolitionArea",
                    label: calculatorFields.demolitionArea.label,
                    placeholder: calculatorFields.demolitionArea.placeholder,
                    value: initialCalculatorForm.demolitionArea,
                    min: 0,
                  })}
                </div>
                <div data-visibility="module-electrical" hidden>
                  ${renderNumberField({
                    id: "electrical-points",
                    name: "electricalPoints",
                    label: calculatorFields.electricalPoints.label,
                    placeholder: calculatorFields.electricalPoints.placeholder,
                    value: initialCalculatorForm.electricalPoints,
                    min: 0,
                  })}
                </div>
                <div data-visibility="module-plumbing" hidden>
                  ${renderNumberField({
                    id: "plumbing-points",
                    name: "plumbingPoints",
                    label: calculatorFields.plumbingPoints.label,
                    placeholder: calculatorFields.plumbingPoints.placeholder,
                    value: initialCalculatorForm.plumbingPoints,
                    min: 0,
                  })}
                </div>
                <div data-visibility="module-screed" hidden>
                  ${renderNumberField({
                    id: "screed-area",
                    name: "screedArea",
                    label: calculatorFields.screedArea.label,
                    placeholder: calculatorFields.screedArea.placeholder,
                    value: initialCalculatorForm.screedArea,
                    min: 0,
                  })}
                </div>
                <div data-visibility="module-tile" hidden>
                  ${renderNumberField({
                    id: "tile-area",
                    name: "tileArea",
                    label: calculatorFields.tileArea.label,
                    placeholder: calculatorFields.tileArea.placeholder,
                    value: initialCalculatorForm.tileArea,
                    min: 0,
                  })}
                </div>
                <div data-visibility="module-wall-paint" hidden>
                  ${renderNumberField({
                    id: "paint-area",
                    name: "paintArea",
                    label: calculatorFields.paintArea.label,
                    placeholder: calculatorFields.paintArea.placeholder,
                    value: initialCalculatorForm.paintArea,
                    min: 0,
                  })}
                </div>
                <div data-visibility="module-laminate-floor" hidden>
                  ${renderNumberField({
                    id: "laminate-area",
                    name: "laminateArea",
                    label: calculatorFields.laminateArea.label,
                    placeholder: calculatorFields.laminateArea.placeholder,
                    value: initialCalculatorForm.laminateArea,
                    min: 0,
                  })}
                </div>
                <div data-visibility="module-laminate-floor" hidden>
                  ${renderNumberField({
                    id: "plinth-length",
                    name: "plinthLength",
                    label: calculatorFields.plinthLength.label,
                    placeholder: calculatorFields.plinthLength.placeholder,
                    value: initialCalculatorForm.plinthLength,
                    min: 0,
                  })}
                </div>
              </div>
            </div>

            <div class="calculator-divider"></div>

            <div class="calculator-grid">
              <div data-visibility="floor" hidden>
                ${renderNumberField({
                  id: "floor-number",
                  name: "floorNumber",
                  label: calculatorFields.floorNumber.label,
                  placeholder: calculatorFields.floorNumber.placeholder,
                  value: initialCalculatorForm.floorNumber,
                  min: 1,
                })}
              </div>
              <div data-visibility="elevator" hidden>
                ${renderSegmentedButtons({
                  field: "elevator",
                  label: calculatorFields.elevator.label,
                  options: calculatorFields.elevator.options,
                  selectedValue: initialCalculatorForm.elevator,
                  compact: true,
                })}
              </div>
              ${renderSegmentedButtons({
                field: "accessLevel",
                label: calculatorFields.accessLevel.label,
                options: calculatorFields.accessLevel.options,
                selectedValue: initialCalculatorForm.accessLevel,
              })}
              ${renderSegmentedButtons({
                field: "urgency",
                label: calculatorFields.urgency.label,
                options: calculatorFields.urgency.options,
                selectedValue: initialCalculatorForm.urgency,
              })}
            </div>
          </section>

          <section class="calculator-panel" data-step="4" hidden>
            <div class="estimate-box">
              <p class="estimate-box__label" ${createI18nTextAttributes(calculatorText.estimateLabel)}>
                ${escapeHtml(calculatorText.estimateLabel.am)}
              </p>
              <p class="estimate-box__summary" ${createI18nTextAttributes(calculatorText.estimateSummary)}>
                ${escapeHtml(calculatorText.estimateSummary.am)}
              </p>

              <div class="estimate-box__grid">
                ${calculatorScenarioMeta.map((item) => renderScenarioCard(item, initialEstimates)).join("")}
              </div>

              <p class="estimate-box__note" ${createI18nTextAttributes(calculatorText.estimateNote)}>
                ${escapeHtml(calculatorText.estimateNote.am)}
              </p>
            </div>

            ${renderHint(calculatorText.contactHint)}

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
