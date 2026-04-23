import { siteConfig } from "../config/site-config.js";
import { escapeAttribute } from "../lib/html.js";
import { isActionableLink } from "../lib/link.js";
import { renderIcon } from "./icons.js";

const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    icon: "instagram",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: "facebook",
  },
];

export function renderSocialLinks({ className }) {
  const linksMarkup = SOCIAL_LINKS.map((item) => {
    const href = siteConfig.socialLinks[item.key];

    if (!isActionableLink(href)) {
      return "";
    }

    return `
      <a href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
        ${renderIcon(item.icon)}
      </a>
    `;
  })
    .filter(Boolean)
    .join("");

  if (!linksMarkup) {
    return "";
  }

  return `<div class="${escapeAttribute(className)}">${linksMarkup}</div>`;
}
