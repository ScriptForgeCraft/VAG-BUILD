import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS } from "../constants/languages.js";
import { escapeAttribute, escapeHtml } from "../lib/html.js";
import { getTranslation } from "../lib/i18n.js";

const languageSwitcherLabels = {
  mobile: {
    am: "Բջջային լեզվի ընտրություն",
    ru: "Выбор языка в мобильном меню",
    en: "Mobile language switcher",
  },
  desktop: {
    am: "Լեզվի ընտրություն",
    ru: "Выбор языка",
    en: "Language switcher",
  },
};

const languageHrefMap = {
  am: "/am/",
  ru: "/ru/",
  en: "/en/",
};

export function renderLanguageSwitcher({ mobile = false, currentLanguage = DEFAULT_LANGUAGE } = {}) {
  const className = mobile ? "language-switcher language-switcher--mobile" : "language-switcher";
  const ariaLabel = mobile ? languageSwitcherLabels.mobile : languageSwitcherLabels.desktop;
  const localizedAriaLabel = getTranslation(ariaLabel, currentLanguage);

  return `
    <div
      class="${escapeAttribute(className)}"
      role="group"
      aria-label="${escapeAttribute(localizedAriaLabel)}"
    >
      ${LANGUAGE_OPTIONS.map((option) => {
        const active = option.code === currentLanguage;
        return `
          <a
            class="language-switcher__button${active ? " is-active" : ""}"
            href="${escapeAttribute(languageHrefMap[option.code] || "/")}"
            ${active ? 'aria-current="page"' : ""}
          >
            ${escapeHtml(option.label)}
          </a>
        `;
      }).join("")}
    </div>
  `;
}
