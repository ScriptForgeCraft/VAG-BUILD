import { trustItems } from "../../../../entities/advantage/model/trust-items.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { renderIcon } from "../../../../shared/ui/icons.js";

const trustStripTitle = {
  am: "Առավելություններ",
  ru: "Преимущества",
  en: "Advantages",
};

export function renderTrustStripSection() {
  return `
    <section class="trust-strip" aria-labelledby="trust-strip-title">
      <div class="container">
        <h2 class="visually-hidden" id="trust-strip-title" ${createI18nTextAttributes(trustStripTitle)}>
          ${escapeHtml(trustStripTitle.am)}
        </h2>
        <ul class="trust-strip__grid">
          ${trustItems
            .map(
              (item) => `
                <li class="trust-item reveal">
                  <div class="trust-item__icon">${renderIcon(item.icon)}</div>
                  <div>
                    <p class="trust-item__title" ${createI18nTextAttributes(item.title)}>${escapeHtml(item.title.am)}</p>
                    <p ${createI18nTextAttributes(item.description)}>${escapeHtml(item.description.am)}</p>
                  </div>
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
    </section>
  `;
}
