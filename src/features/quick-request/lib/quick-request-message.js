import { getTranslation } from "../../../shared/lib/i18n.js";

const quickRequestText = {
  title: {
    am: "Արագ հաղորդագրություն",
    ru: "Быстрое сообщение",
    en: "Quick Message",
  },
  name: {
    am: "Անուն",
    ru: "Имя",
    en: "Name",
  },
  phone: {
    am: "Հեռախոս",
    ru: "Телефон",
    en: "Phone",
  },
};

export function buildQuickRequestLines({ language, form }) {
  return [
    getTranslation(quickRequestText.title, language),
    `${getTranslation(quickRequestText.name, language)}: ${form.quickName || "-"}`,
    `${getTranslation(quickRequestText.phone, language)}: ${form.quickPhone || "-"}`,
  ];
}
