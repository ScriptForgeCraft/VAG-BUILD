import { getTranslation } from "../../../shared/lib/i18n.js";
import {
  calculatorFields,
  calculatorScenarioMeta,
  calculatorText,
  calculatorWorkModuleFieldMap,
} from "../model/constants.js";

function getOptionLabel(fieldName, value, language) {
  const option = calculatorFields[fieldName]?.options?.find((item) => item.value === value);
  return option ? getTranslation(option.label, language) : "-";
}

function getMultiOptionLabel(fieldName, values, language) {
  const options = calculatorFields[fieldName]?.options || [];

  return values
    .map((value) => options.find((item) => item.value === value))
    .filter(Boolean)
    .map((option) => getTranslation(option.label, language))
    .join(", ");
}

function getFieldValueLine(fieldName, value, language, suffix = "") {
  return `${getTranslation(calculatorFields[fieldName].label, language)}: ${value}${suffix}`;
}

function getUnit(fieldName, language) {
  if (["electricalPoints", "plumbingPoints", "floorNumber"].includes(fieldName)) {
    return {
      am: " հատ",
      ru: " шт.",
      en: " pcs",
    }[language];
  }

  if (fieldName === "plumberHours") {
    return {
      am: " ժ",
      ru: " ч.",
      en: " hr",
    }[language];
  }

  if (fieldName === "plinthLength") {
    return {
      am: " գծ.մ.",
      ru: " п.м.",
      en: " lm",
    }[language];
  }

  return " m²";
}

export function buildCalculatorRequestLines({ language, form, estimates }) {
  const lines = [getTranslation(calculatorText.sendButton, language)];

  lines.push(
    getFieldValueLine("propertyType", getOptionLabel("propertyType", form.propertyType, language), language),
    getFieldValueLine("area", form.area, language, " m²"),
    getFieldValueLine(
      "conditionStage",
      getOptionLabel("conditionStage", form.conditionStage, language),
      language
    ),
    getFieldValueLine("estimateMode", getOptionLabel("estimateMode", form.estimateMode, language), language),
    getFieldValueLine(
      "pricingPackage",
      getOptionLabel("pricingPackage", form.pricingPackage, language),
      language
    )
  );

  if (form.estimateMode === "full-renovation") {
    lines.push(
      getFieldValueLine(
        "renovationLevel",
        getOptionLabel("renovationLevel", form.renovationLevel, language),
        language
      ),
      getFieldValueLine(
        "engineeringScope",
        getOptionLabel("engineeringScope", form.engineeringScope, language),
        language
      )
    );

    if (form.propertyType !== "commercial") {
      lines.push(
        getFieldValueLine("wetZonesCount", getOptionLabel("wetZonesCount", form.wetZonesCount, language), language)
      );
    }

    lines.push(
      getFieldValueLine(
        "replanningNeeded",
        getOptionLabel("replanningNeeded", form.replanningNeeded, language),
        language
      )
    );

    if (
      ["secondary-empty", "secondary-lived-in"].includes(form.conditionStage) ||
      form.replanningNeeded === "yes"
    ) {
      lines.push(
        getFieldValueLine(
          "demolitionScope",
          getOptionLabel("demolitionScope", form.demolitionScope, language),
          language
        )
      );
    }
  } else {
    const modules = Array.isArray(form.workModules) ? form.workModules : [];
    lines.push(
      getFieldValueLine("workModules", getMultiOptionLabel("workModules", modules, language) || "-", language)
    );

    modules.forEach((moduleId) => {
      const fieldIds = calculatorWorkModuleFieldMap[moduleId] || [];
      fieldIds.forEach((fieldId) => {
        lines.push(getFieldValueLine(fieldId, form[fieldId] || 0, language, getUnit(fieldId, language)));
      });
    });
  }

  if (form.propertyType === "apartment") {
    lines.push(getFieldValueLine("floorNumber", form.floorNumber || 1, language, getUnit("floorNumber", language)));

    if (Number(form.floorNumber) > 1) {
      lines.push(getFieldValueLine("elevator", getOptionLabel("elevator", form.elevator, language), language));
    }
  }

  lines.push(
    getFieldValueLine("urgency", getOptionLabel("urgency", form.urgency, language), language)
  );

  calculatorScenarioMeta.forEach((scenario) => {
    lines.push(
      `${getTranslation(scenario.label, language)}: ${estimates[scenario.id] || 0} AMD`
    );
  });

  lines.push(
    `${getTranslation(calculatorFields.name.label, language)}: ${form.name || "-"}`,
    `${getTranslation(calculatorFields.phone.label, language)}: ${form.phone || "-"}`,
    `${getTranslation(calculatorFields.comment.label, language)}: ${form.comment || "-"}`
  );

  return lines;
}
