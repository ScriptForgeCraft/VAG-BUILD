import { getTranslation } from "../lib/i18n.js";

const skipLinkLabel = {
  am: "Անցնել հիմնական բովանդակությանը",
  ru: "Перейти к основному содержанию",
  en: "Skip to main content",
};

export function renderSkipLink(language) {
  return `<a class="skip-link" href="#content">${getTranslation(skipLinkLabel, language)}</a>`;
}
