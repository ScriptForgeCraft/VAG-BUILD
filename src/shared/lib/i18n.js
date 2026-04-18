import { DEFAULT_LANGUAGE, HTML_LANG_BY_LANGUAGE, LANGUAGES } from "../constants/languages.js";
import { escapeAttribute } from "./html.js";

export function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

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

export function createI18nOptionAttributes(translations) {
  return buildLocalizedAttributes("data-text", translations);
}

export function getStoredLanguage(root = document.documentElement) {
  try {
    return localStorage.getItem("vag-language") || root.dataset.defaultLanguage || DEFAULT_LANGUAGE;
  } catch {
    return root.dataset.defaultLanguage || DEFAULT_LANGUAGE;
  }
}

export function persistLanguage(language) {
  try {
    localStorage.setItem("vag-language", language);
  } catch {
    // Ignore storage access errors in private or restricted modes.
  }
}

export function applyLanguage(language, { root = document.documentElement } = {}) {
  root.lang = HTML_LANG_BY_LANGUAGE[language] ?? language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translated = element.dataset[language];
    if (translated) {
      element.textContent = translated;
    }
  });

  document.querySelectorAll("[data-placeholder-am]").forEach((element) => {
    const translated = element.dataset[`placeholder${capitalize(language)}`];
    if (translated) {
      element.setAttribute("placeholder", translated);
    }
  });

  document.querySelectorAll("[data-text-am]").forEach((element) => {
    const translated = element.dataset[`text${capitalize(language)}`];
    if (translated) {
      element.textContent = translated;
    }
  });

  document.querySelectorAll("[data-alt-am]").forEach((element) => {
    const translated = element.dataset[`alt${capitalize(language)}`];
    if (translated) {
      element.setAttribute("alt", translated);
    }
  });

  document.querySelectorAll("[data-language-switch]").forEach((button) => {
    const active = button.dataset.languageSwitch === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
