import { escapeAttribute, escapeHtml } from "../lib/html.js";
import { createI18nTextAttributes } from "../lib/i18n.js";

export function renderSectionHeading({ title, description, classes = "section-heading reveal", id = "" }) {
  const descriptionMarkup = description
    ? `<p ${createI18nTextAttributes(description)}>${escapeHtml(description.am)}</p>`
    : "";
  const headingIdAttribute = id ? ` id="${escapeAttribute(id)}"` : "";

  return `
    <div class="${classes}">
      <h2${headingIdAttribute} ${createI18nTextAttributes(title)}>${escapeHtml(title.am)}</h2>
      ${descriptionMarkup}
    </div>
  `;
}
