import { navigationLinks } from "../../../entities/navigation/model/navigation-links.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { escapeHtml } from "../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../shared/lib/i18n.js";
import { renderIcon } from "../../../shared/ui/icons.js";

const legalLinks = [
  {
    href: "#",
    label: {
      am: "Գաղտնիության քաղաքականություն",
      ru: "Политика конфиденциальности",
      en: "Privacy Policy",
    },
  },
  {
    href: "#",
    label: {
      am: "Ծառայությունների պայմաններ",
      ru: "Условия обслуживания",
      en: "Terms of Service",
    },
  },
  {
    href: "#",
    label: {
      am: "Cookie քաղաքականություն",
      ru: "Политика Cookie",
      en: "Cookie Policy",
    },
  },
];

function renderLinks(links) {
  return links
    .map(
      (link) => `
        <li>
          <a href="${link.href}" ${createI18nTextAttributes(link.label)}>${escapeHtml(link.label.am)}</a>
        </li>
      `
    )
    .join("");
}

export function renderSiteFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__grid">
          <div class="site-footer__brand">
            <a href="#top" class="logo logo--dark" aria-label="${siteConfig.brandName}">
              V<span>AG</span>
            </a>
            <p
              ${createI18nTextAttributes({
                am: "Պրոֆեսիոնալ վերանորոգում և շինարարական ծառայություններ Հայաստանում: Որակ, թափանցիկություն և հուսալիություն յուրաքանչյուր նախագծում:",
                ru: "Профессиональный ремонт и строительные услуги в Армении. Качество, прозрачность и надежность в каждом проекте.",
                en: "Professional renovation and construction services in Armenia. Quality, transparency, and reliability in every project.",
              })}
            >
              Պրոֆեսիոնալ վերանորոգում և շինարարական ծառայություններ Հայաստանում: Որակ, թափանցիկություն և հուսալիություն յուրաքանչյուր նախագծում:
            </p>
          </div>

          <div>
            <h3
              ${createI18nTextAttributes({
                am: "Բաժիններ",
                ru: "Разделы",
                en: "Links",
              })}
            >
              Բաժիններ
            </h3>
            <ul class="site-footer__links">
              ${renderLinks(navigationLinks)}
            </ul>
          </div>

          <div>
            <h3
              ${createI18nTextAttributes({
                am: "Իրավական",
                ru: "Правовая информация",
                en: "Legal",
              })}
            >
              Իրավական
            </h3>
            <ul class="site-footer__links">
              ${renderLinks(legalLinks)}
            </ul>
          </div>
        </div>

        <div class="site-footer__bottom">
          <p>
            © <span data-current-year>2026</span> Script Forge.
            <span
              ${createI18nTextAttributes({
                am: "Բոլոր իրավունքները պաշտպանված են",
                ru: "Все права защищены",
                en: "All rights reserved",
              })}
            >
              Բոլոր իրավունքները պաշտպանված են
            </span>
          </p>
          <div class="site-footer__socials">
            <a href="${siteConfig.socialLinks.instagram}" aria-label="Instagram">${renderIcon("instagram")}</a>
            <a href="${siteConfig.socialLinks.facebook}" aria-label="Facebook">${renderIcon("facebook")}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
