import { DEFAULT_LANGUAGE, LANGUAGES } from "../constants/languages.js";
import { escapeAttribute } from "./html.js";

export function getTranslation(translations, language = DEFAULT_LANGUAGE) {
  if (!translations) {
    return "";
  }

  return translations[language] ?? translations[DEFAULT_LANGUAGE] ?? "";
}

function buildLocalizedAttributes(prefix, translations) {
  return LANGUAGES.map(
    (language) => `${prefix}-${language}="${escapeAttribute(getTranslation(translations, language))}"`
  ).join(" ");
}

export function createI18nTextAttributes(translations) {
  return `data-i18n ${buildLocalizedAttributes("data", translations)}`;
}

export function createI18nPlaceholderAttributes(translations) {
  return buildLocalizedAttributes("data-placeholder", translations);
}

export function createI18nAltAttributes(translations) {
  return buildLocalizedAttributes("data-alt", translations);
}

export function createI18nAriaLabelAttributes(translations) {
  return buildLocalizedAttributes("data-aria-label", translations);
}

export function createI18nOptionAttributes(translations) {
  return buildLocalizedAttributes("data-text", translations);
}

export function getStoredLanguage(root = document.documentElement) {
  const pageLanguage = root.dataset.pageLanguage || root.dataset.defaultLanguage;

  if (pageLanguage) {
    return pageLanguage;
  }

  try {
    return localStorage.getItem("vag-language") || root.dataset.defaultLanguage || DEFAULT_LANGUAGE;
  } catch {
    return root.dataset.defaultLanguage || DEFAULT_LANGUAGE;
  }
}

export function persistLanguage(language) {
  if (document.documentElement.dataset.pageLanguage) {
    return;
  }

  try {
    localStorage.setItem("vag-language", language);
  } catch {
    // Ignore storage access errors in private or restricted modes.
  }
}
