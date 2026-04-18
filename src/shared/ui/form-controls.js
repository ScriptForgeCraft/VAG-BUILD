import { escapeAttribute, escapeHtml } from "../lib/html.js";
import {
  createI18nOptionAttributes,
  createI18nPlaceholderAttributes,
  createI18nTextAttributes,
} from "../lib/i18n.js";

function renderLabel({ label, fieldName, forId, classes = "field-label", suffixHtml = "" }) {
  const targetAttribute = forId ? `for="${escapeAttribute(forId)}"` : "";
  return `
    <label class="${escapeAttribute(classes)}" ${targetAttribute} data-field-label="${escapeAttribute(fieldName)}">
      <span ${createI18nTextAttributes(label)}>${escapeHtml(label.am)}</span>
      ${suffixHtml}
    </label>
  `;
}

export function renderInputField({
  id,
  name,
  type = "text",
  label,
  fieldName = name,
  placeholder,
  classes = "field-input",
  autocomplete = "",
  extraAttributes = "",
  value = "",
}) {
  const autocompleteAttribute = autocomplete ? `autocomplete="${escapeAttribute(autocomplete)}"` : "";
  const valueAttribute = value === "" ? "" : `value="${escapeAttribute(value)}"`;

  return `
    <div class="field-group">
      ${renderLabel({ label, fieldName, forId: id })}
      <input
        class="${escapeAttribute(classes)}"
        id="${escapeAttribute(id)}"
        name="${escapeAttribute(name)}"
        type="${escapeAttribute(type)}"
        ${autocompleteAttribute}
        ${createI18nPlaceholderAttributes(placeholder)}
        placeholder="${escapeAttribute(placeholder.am)}"
        ${valueAttribute}
        ${extraAttributes}
      />
    </div>
  `;
}

export function renderTextareaField({
  id,
  name,
  label,
  fieldName = name,
  placeholder,
  rows = 3,
  classes = "field-input field-input--textarea",
}) {
  return `
    <div class="field-group">
      ${renderLabel({ label, fieldName, forId: id })}
      <textarea
        class="${escapeAttribute(classes)}"
        id="${escapeAttribute(id)}"
        name="${escapeAttribute(name)}"
        rows="${escapeAttribute(rows)}"
        ${createI18nPlaceholderAttributes(placeholder)}
        placeholder="${escapeAttribute(placeholder.am)}"
      ></textarea>
    </div>
  `;
}

function renderChoiceButton({ field, option, classes, selectedValue }) {
  const selectedClass = option.value === selectedValue ? " is-selected" : "";
  return `
    <button
      class="${escapeAttribute(`${classes}${selectedClass}`)}"
      type="button"
      data-choice
      data-field="${escapeAttribute(field)}"
      data-value="${escapeAttribute(option.value)}"
    >
      <span ${createI18nTextAttributes(option.label)}>${escapeHtml(option.label.am)}</span>
    </button>
  `;
}

export function renderChoiceButtons({
  field,
  label,
  options,
  selectedValue,
  layoutClass = "choice-grid",
  buttonClass = "choice-button",
}) {
  return `
    <fieldset class="calculator-fieldset">
      <legend class="field-label" data-field-label="${escapeAttribute(field)}">
        <span ${createI18nTextAttributes(label)}>${escapeHtml(label.am)}</span>
      </legend>
      <div class="${escapeAttribute(layoutClass)}">
        ${options.map((option) => renderChoiceButton({ field, option, classes: buttonClass, selectedValue })).join("")}
      </div>
    </fieldset>
  `;
}

export function renderSegmentedButtons({ field, label, options, selectedValue, compact = false }) {
  return `
    <div class="field-group">
      <span class="field-label" data-field-label="${escapeAttribute(field)}">
        <span ${createI18nTextAttributes(label)}>${escapeHtml(label.am)}</span>
      </span>
      <div class="segmented-control${compact ? " segmented-control--compact" : ""}">
        ${options
          .map((option) =>
            renderChoiceButton({
              field,
              option,
              classes: "segment-button",
              selectedValue,
            })
          )
          .join("")}
      </div>
    </div>
  `;
}

export function renderSelectField({ id, name, fieldName = name, label, options }) {
  return `
    <div class="field-group">
      ${renderLabel({ label, fieldName, forId: id })}
      <select class="field-select" id="${escapeAttribute(id)}" name="${escapeAttribute(name)}">
        ${options
          .map(
            (option) => `
              <option value="${escapeAttribute(option.value)}" ${createI18nOptionAttributes(option.label)}>
                ${escapeHtml(option.label.am)}
              </option>
            `
          )
          .join("")}
      </select>
    </div>
  `;
}

export function renderCheckboxCards({
  field,
  label,
  options,
  selectedValues = [],
  layoutClass = "choice-grid",
}) {
  return `
    <fieldset class="calculator-fieldset">
      <legend class="field-label" data-field-label="${escapeAttribute(field)}">
        <span ${createI18nTextAttributes(label)}>${escapeHtml(label.am)}</span>
      </legend>
      <div class="${escapeAttribute(layoutClass)}">
        ${options
          .map((option) => {
            const isSelected = selectedValues.includes(option.value);

            return `
              <label
                class="choice-button choice-button--checkbox${isSelected ? " is-selected" : ""}"
                data-checkbox-card
                data-field="${escapeAttribute(field)}"
                data-value="${escapeAttribute(option.value)}"
              >
                <input
                  class="choice-checkbox"
                  type="checkbox"
                  name="${escapeAttribute(field)}"
                  value="${escapeAttribute(option.value)}"
                  ${isSelected ? "checked" : ""}
                />
                <span ${createI18nTextAttributes(option.label)}>${escapeHtml(option.label.am)}</span>
              </label>
            `;
          })
          .join("")}
      </div>
    </fieldset>
  `;
}

export function renderRangeField({ id, name, fieldName = name, label, value, min, max, step }) {
  return `
    <div class="calculator-range">
      ${renderLabel({
        label,
        fieldName,
        forId: id,
        classes: "field-label field-label--range",
        suffixHtml: `<strong><span data-area-value>${escapeHtml(value)}</span> m²</strong>`,
      })}
      <input
        id="${escapeAttribute(id)}"
        name="${escapeAttribute(name)}"
        type="range"
        min="${escapeAttribute(min)}"
        max="${escapeAttribute(max)}"
        step="${escapeAttribute(step)}"
        value="${escapeAttribute(value)}"
      />
      <div class="calculator-range__limits">
        <span>${escapeHtml(min)} m²</span>
        <span>${escapeHtml(max)} m²</span>
      </div>
    </div>
  `;
}
