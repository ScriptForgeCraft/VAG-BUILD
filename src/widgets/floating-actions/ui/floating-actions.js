import { siteConfig } from "../../../shared/config/site-config.js";
import { renderIcon } from "../../../shared/ui/icons.js";

export function renderFloatingActions() {
  return `
    <div class="floating-actions">
      <a href="https://wa.me/${siteConfig.phone.raw}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        ${renderIcon("message-circle")}
      </a>
      <a href="tel:+${siteConfig.phone.raw}" aria-label="Call">
        ${renderIcon("phone")}
      </a>
    </div>
  `;
}
