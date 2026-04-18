import { escapeAttribute, escapeHtml } from "../lib/html.js";
import { createI18nTextAttributes } from "../lib/i18n.js";
import { renderIcon } from "./icons.js";

export function renderButton({ href, type = "button", label, variant = "primary", icon, classes = "", attributes = "" }) {
  const className = `button button--${variant}${classes ? ` ${classes}` : ""}`;
  const labelMarkup = label
    ? `<span ${createI18nTextAttributes(label)}>${escapeHtml(label.am)}</span>`
    : "";
  const iconMarkup = icon ? renderIcon(icon) : "";

  if (href) {
    return `<a href="${escapeAttribute(href)}" class="${escapeAttribute(className)}" ${attributes}>${labelMarkup}${iconMarkup}</a>`;
  }

  return `<button class="${escapeAttribute(className)}" type="${escapeAttribute(type)}" ${attributes}>${labelMarkup}${iconMarkup}</button>`;
}
