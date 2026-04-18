import { trustItems } from "../../../../entities/advantage/model/trust-items.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { renderIcon } from "../../../../shared/ui/icons.js";

export function renderTrustStripSection() {
  return `
    <section class="trust-strip">
      <div class="container trust-strip__grid">
        ${trustItems
          .map(
            (item) => `
              <article class="trust-item reveal">
                <div class="trust-item__icon">${renderIcon(item.icon)}</div>
                <div>
                  <h2 ${createI18nTextAttributes(item.title)}>${escapeHtml(item.title.am)}</h2>
                  <p ${createI18nTextAttributes(item.description)}>${escapeHtml(item.description.am)}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}
