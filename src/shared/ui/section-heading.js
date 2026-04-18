import { escapeHtml } from "../lib/html.js";
import { createI18nTextAttributes } from "../lib/i18n.js";

export function renderSectionHeading({ title, description, classes = "section-heading reveal" }) {
  const descriptionMarkup = description
    ? `<p ${createI18nTextAttributes(description)}>${escapeHtml(description.am)}</p>`
    : "";

  return `
    <div class="${classes}">
      <h2 ${createI18nTextAttributes(title)}>${escapeHtml(title.am)}</h2>
      ${descriptionMarkup}
    </div>
  `;
}
