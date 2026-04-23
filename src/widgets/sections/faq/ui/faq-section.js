import { faqs } from "../../../../entities/faq/model/faqs.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";

export function renderFaqSection() {
  return `
    <section class="section faq" id="faq" aria-labelledby="faq-title">
      <div class="container faq__container">
        <h2
          id="faq-title"
          class="section-title section-title--center reveal"
          ${createI18nTextAttributes({
            am: "Հաճախ տրվող հարցեր",
            ru: "Частые вопросы",
            en: "FAQ",
          })}
        >
          Հաճախ տրվող հարցեր
        </h2>

        ${faqs
          .map(
            (item) => `
              <details class="faq-item reveal" ${item.open ? "open" : ""}>
                <summary>
                  <span ${createI18nTextAttributes(item.question)}>${escapeHtml(item.question.am)}</span>
                </summary>
                <div class="faq-item__content">
                  <p ${createI18nTextAttributes(item.answer)}>${escapeHtml(item.answer.am)}</p>
                </div>
              </details>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}
