import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nAltAttributes, createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { renderButton } from "../../../../shared/ui/button.js";
import { renderIcon } from "../../../../shared/ui/icons.js";

const heroStats = [
  {
    value: "10+",
    label: {
      am: "Տարվա փորձ",
      ru: "Лет опыта",
      en: "Years Experience",
    },
  },
  {
    value: "500+",
    label: {
      am: "Ավարտված նախագծեր",
      ru: "Завершенных проектов",
      en: "Projects Done",
    },
  },
  {
    value: "100%",
    label: {
      am: "Որակի երաշխիք",
      ru: "Гарантия качества",
      en: "Guarantee",
    },
  },
];

export function renderHeroSection() {
  return `
    <section class="hero section">
      <div class="container hero__grid">
        <div class="hero__content reveal">
          <div class="hero__eyebrow">
            <span
              ${createI18nTextAttributes({
                am: "Երաշխիք աշխատանքի համար",
                ru: "Гарантия на работы",
                en: "Work Warranty",
              })}
            >
              Երաշխիք աշխատանքի համար
            </span>
            <span aria-hidden="true">•</span>
            <span>ARMENIA</span>
          </div>

          <h1
            class="hero__title"
            ${createI18nTextAttributes({
              am: "Պրոֆեսիոնալ վերանորոգում Հայաստանում",
              ru: "Профессиональный ремонт в Армении",
              en: "Professional Renovation in Armenia",
            })}
          >
            Պրոֆեսիոնալ վերանորոգում Հայաստանում
          </h1>

          <p
            class="hero__subtitle"
            ${createI18nTextAttributes({
              am: "Բարձրակարգ ծառայություններ Երևանում և ողջ Հայաստանում: Մենք ստեղծում ենք հարմարավետություն և որակ, որին կարող եք վստահել:",
              ru: "Высококлассные услуги в Ереване и по всей Армении. Создаем уют и качество, которому можно доверять.",
              en: "Premium services in Yerevan and across Armenia. We create comfort and quality you can trust.",
            })}
          >
            Բարձրակարգ ծառայություններ Երևանում և ողջ Հայաստանում: Մենք ստեղծում ենք հարմարավետություն և որակ, որին կարող եք վստահել:
          </p>

          <div class="hero__actions">
            ${renderButton({
              href: "#calculator",
              label: {
                am: "Ստանալ հաշվարկ",
                ru: "Получить расчет",
                en: "Get Estimate",
              },
              variant: "primary",
              icon: "arrow-right",
            })}
            ${renderButton({
              href: "#contacts",
              label: {
                am: "Կապնվել հիմա",
                ru: "Связаться сейчас",
                en: "Contact Now",
              },
              variant: "secondary",
            })}
          </div>

          <div class="hero__stats">
            ${heroStats
              .map(
                (item) => `
                  <div class="hero__stat">
                    <strong>${item.value}</strong>
                    <span ${createI18nTextAttributes(item.label)}>${escapeHtml(item.label.am)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="hero__visual reveal">
          <div class="hero__image-frame">
            <img
              src="https://picsum.photos/seed/renovation/1200/1200"
              ${createI18nAltAttributes({
                am: "Պրեմիում վերանորոգման ինտերիեր Հայաստանում",
                ru: "Премиальный интерьер после ремонта в Армении",
                en: "Premium renovated interior in Armenia",
              })}
              alt="Պրեմիում վերանորոգման ինտերիեր Հայաստանում"
              referrerpolicy="no-referrer"
            />
          </div>

          <div class="hero__badge">
            <div class="hero__badge-icon">
              ${renderIcon("check-circle")}
            </div>
            <div>
              <p
                class="hero__badge-label"
                ${createI18nTextAttributes({
                  am: "Որակի ստուգում",
                  ru: "Контроль качества",
                  en: "Quality Check",
                })}
              >
                Որակի ստուգում
              </p>
              <p
                class="hero__badge-value"
                ${createI18nTextAttributes({
                  am: "Պրեմիում ստանդարտ",
                  ru: "Премиальный стандарт",
                  en: "Premium Standard",
                })}
              >
                Պրեմիում ստանդարտ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
