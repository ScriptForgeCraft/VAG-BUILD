import { getTranslation } from "../../../shared/lib/i18n.js";
import { calculatorFields, calculatorText } from "../model/constants.js";

function getOptionLabel(fieldName, value, language) {
  const option = calculatorFields[fieldName]?.options?.find((item) => item.value === value);
  return option ? getTranslation(option.label, language) : "-";
}

export function buildCalculatorRequestLines({ language, form, estimate }) {
  return [
    getTranslation(calculatorText.sendButton, language),
    `${getTranslation(calculatorFields.objectType.label, language)}: ${getOptionLabel("objectType", form.objectType, language)}`,
    `${getTranslation(calculatorFields.area.label, language)}: ${form.area} m²`,
    `${getTranslation(calculatorFields.workType.label, language)}: ${getOptionLabel("workType", form.workType, language)}`,
    `${getTranslation(calculatorFields.condition.label, language)}: ${getOptionLabel("condition", form.condition, language)}`,
    `${getTranslation(calculatorFields.urgency.label, language)}: ${getOptionLabel("urgency", form.urgency, language)}`,
    `${getTranslation(calculatorFields.demolition.label, language)}: ${getOptionLabel("demolition", form.demolition, language)}`,
    `${getTranslation(calculatorFields.materials.label, language)}: ${getOptionLabel("materials", form.materials, language)}`,
    `${getTranslation(calculatorFields.name.label, language)}: ${form.name || "-"}`,
    `${getTranslation(calculatorFields.phone.label, language)}: ${form.phone || "-"}`,
    `${getTranslation(calculatorFields.comment.label, language)}: ${form.comment || "-"}`,
    `${getTranslation(calculatorText.estimateLabel, language)}: ${estimate} AMD`,
  ];
}
