import { testimonials } from "../../../../entities/testimonial/model/testimonials.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";

export function renderTestimonialsSection() {
  return `
    <section class="section testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <h2
          id="testimonials-title"
          class="section-title section-title--center reveal"
          ${createI18nTextAttributes({
            am: "Հաճախորդների կարծիքները",
            ru: "Отзывы клиентов",
            en: "Client Reviews",
          })}
        >
          Հաճախորդների կարծիքները
        </h2>
        <div class="testimonials__grid">
          ${testimonials
            .map(
              (item) => `
                <article class="testimonial-card reveal">
                  <span class="testimonial-card__quote-mark" aria-hidden="true">“</span>
                  <div class="testimonial-card__stars" aria-hidden="true">★★★★★</div>
                  <blockquote class="testimonial-card__blockquote">
                    <p ${createI18nTextAttributes(item.quote)}>${escapeHtml(item.quote.am)}</p>
                  </blockquote>
                  <footer class="testimonial-card__author">
                    <div class="testimonial-card__avatar">${item.avatar}</div>
                    <div>
                      <strong ${createI18nTextAttributes(item.author)}>${escapeHtml(item.author.am)}</strong>
                      <span ${createI18nTextAttributes(item.meta)}>${escapeHtml(item.meta.am)}</span>
                    </div>
                  </footer>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
