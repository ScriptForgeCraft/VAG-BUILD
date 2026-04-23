import { siteConfig } from "../../../shared/config/site-config.js";
import { createI18nAriaLabelAttributes } from "../../../shared/lib/i18n.js";
import { renderIcon } from "../../../shared/ui/icons.js";

export function renderFloatingActions() {
  return `
    <div class="floating-actions">
      <a
        href="https://wa.me/${siteConfig.phone.raw}"
        target="_blank"
        rel="noopener noreferrer"
        ${createI18nAriaLabelAttributes({
          am: "Բացել WhatsApp-ը",
          ru: "Открыть WhatsApp",
          en: "Open WhatsApp",
        })}
        aria-label="Բացել WhatsApp-ը"
      >
        ${renderIcon("message-circle")}
      </a>
      <a
        href="tel:+${siteConfig.phone.raw}"
        ${createI18nAriaLabelAttributes({
          am: "Զանգահարել",
          ru: "Позвонить",
          en: "Call",
        })}
        aria-label="Զանգահարել"
      >
        ${renderIcon("phone")}
      </a>
    </div>
  `;
}
