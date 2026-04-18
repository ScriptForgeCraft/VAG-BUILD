import { whyUsItems } from "../../../../entities/advantage/model/why-us-items.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nAltAttributes, createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { renderIcon } from "../../../../shared/ui/icons.js";

export function renderWhyUsSection() {
  return `
    <section class="section why-us">
      <div class="container why-us__grid">
        <div class="why-us__content">
          <h2
            class="reveal"
            ${createI18nTextAttributes({
              am: "Ինչու՞ ընտրել մեզ",
              ru: "Почему выбирают нас",
              en: "Why Choose Us",
            })}
          >
            Ինչու՞ ընտրել մեզ
          </h2>
          <div class="why-us__list">
            ${whyUsItems
              .map(
                (item) => `
                  <article class="why-us__item reveal">
                    <div class="why-us__item-icon">${renderIcon("check-circle")}</div>
                    <div>
                      <h3 ${createI18nTextAttributes(item.title)}>${escapeHtml(item.title.am)}</h3>
                      <p ${createI18nTextAttributes(item.description)}>${escapeHtml(item.description.am)}</p>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="why-us__visual reveal">
          <div class="why-us__image">
            <img
              src="https://picsum.photos/seed/team/1000/1000"
              ${createI18nAltAttributes({
                am: "VAG-ի վարպետների թիմը",
                ru: "Команда мастеров VAG",
                en: "VAG renovation team",
              })}
              alt="VAG-ի վարպետների թիմը"
              loading="lazy"
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="why-us__badge">
            <strong>100%</strong>
            <span
              ${createI18nTextAttributes({
                am: "Բավարարված հաճախորդներ",
                ru: "Довольные клиенты",
                en: "Satisfaction Rate",
              })}
            >
              Բավարարված հաճախորդներ
            </span>
          </div>
        </div>
      </div>
    </section>
  `;
}
