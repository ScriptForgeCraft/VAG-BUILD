import { processSteps } from "../../../../entities/process/model/process-steps.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";

export function renderProcessSection() {
  return `
    <section class="section process" aria-labelledby="process-title">
      <div class="container">
        <h2
          id="process-title"
          class="section-title section-title--center reveal"
          ${createI18nTextAttributes({
            am: "Ինչպես ենք մենք աշխատում",
            ru: "Как мы работаем",
            en: "How We Work",
          })}
        >
          Ինչպես ենք մենք աշխատում
        </h2>
        <div class="process__grid">
          ${processSteps
            .map(
              (item) => `
                <article class="process-card reveal">
                  <span class="process-card__number">${item.number}</span>
                  <h3 ${createI18nTextAttributes(item.title)}>${escapeHtml(item.title.am)}</h3>
                  <p ${createI18nTextAttributes(item.description)}>${escapeHtml(item.description.am)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
