import { services } from "../../../../entities/service/model/services.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { renderIcon } from "../../../../shared/ui/icons.js";
import { renderSectionHeading } from "../../../../shared/ui/section-heading.js";

const servicesDescription = {
  am: "Մենք առաջարկում ենք լուծումների լայն շրջանակ՝ փոքր վերանորոգումից մինչև ամբողջական նախագծեր",
  ru: "Мы предлагаем широкий спектр решений: от мелкого ремонта до крупных проектов",
  en: "We offer a wide range of solutions from minor repairs to major projects",
};

const orderLabel = {
  am: "Պատվիրել",
  ru: "Заказать",
  en: "Order Now",
};

export function renderServicesSection() {
  return `
    <section class="section services" id="services">
      <div class="container">
        ${renderSectionHeading({
          title: {
            am: "Մեր ծառայությունները",
            ru: "Наши услуги",
            en: "Our Services",
          },
          description: servicesDescription,
        })}

        <div class="services__grid">
          ${services
            .map(
              (service) => `
                <article class="service-card reveal">
                  <div class="service-card__icon">${renderIcon(service.icon)}</div>
                  <h3 ${createI18nTextAttributes(service.title)}>${escapeHtml(service.title.am)}</h3>
                  <p ${createI18nTextAttributes(service.description)}>${escapeHtml(service.description.am)}</p>
                  <ul class="service-card__list">
                    ${service.highlights
                      .map(
                        (item) => `
                          <li>
                            ${renderIcon("check")}
                            <span ${createI18nTextAttributes(item)}>${escapeHtml(item.am)}</span>
                          </li>
                        `
                      )
                      .join("")}
                  </ul>
                  <a href="#calculator" class="service-card__link">
                    <span ${createI18nTextAttributes(orderLabel)}>${escapeHtml(orderLabel.am)}</span>
                    ${renderIcon("arrow-up-right")}
                  </a>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
