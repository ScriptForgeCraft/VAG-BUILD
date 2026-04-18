import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS } from "../constants/languages.js";
import { escapeAttribute, escapeHtml } from "../lib/html.js";

export function renderLanguageSwitcher({ mobile = false } = {}) {
  const className = mobile ? "language-switcher language-switcher--mobile" : "language-switcher";
  const ariaLabel = mobile ? "Mobile language switcher" : "Language switcher";

  return `
    <div class="${escapeAttribute(className)}" role="group" aria-label="${escapeAttribute(ariaLabel)}">
      ${LANGUAGE_OPTIONS.map((option) => {
        const active = option.code === DEFAULT_LANGUAGE;
        return `
          <button
            class="language-switcher__button${active ? " is-active" : ""}"
            type="button"
            data-language-switch="${escapeAttribute(option.code)}"
            aria-pressed="${active}"
          >
            ${escapeHtml(option.label)}
          </button>
        `;
      }).join("")}
    </div>
  `;
}
