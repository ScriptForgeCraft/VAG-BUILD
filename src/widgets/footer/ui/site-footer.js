import { navigationLinks } from "../../../entities/navigation/model/navigation-links.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { escapeAttribute, escapeHtml } from "../../../shared/lib/html.js";
import { isActionableLink } from "../../../shared/lib/link.js";
import { createI18nTextAttributes } from "../../../shared/lib/i18n.js";
import { renderIcon } from "../../../shared/ui/icons.js";

const legalLinks = [];

function renderLinks(links) {
  return links
    .map(
      (link) => `
        <li>
          <a href="${escapeAttribute(link.href)}" ${createI18nTextAttributes(link.label)}>${escapeHtml(link.label.am)}</a>
        </li>
      `
    )
    .join("");
}

export function renderSiteFooter() {
  const actionableLegalLinks = legalLinks.filter((link) => isActionableLink(link.href));
  const socialLinks = [
    isActionableLink(siteConfig.socialLinks.instagram)
      ? `<a href="${escapeAttribute(siteConfig.socialLinks.instagram)}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${renderIcon("instagram")}</a>`
      : "",
    isActionableLink(siteConfig.socialLinks.facebook)
      ? `<a href="${escapeAttribute(siteConfig.socialLinks.facebook)}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${renderIcon("facebook")}</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

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

          ${
            actionableLegalLinks.length
              ? `
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
                    ${renderLinks(actionableLegalLinks)}
                  </ul>
                </div>
              `
              : ""
          }
        </div>

        <div class="site-footer__bottom">
          <p>
            © <span data-current-year>2026</span> ${siteConfig.brandName}.
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
          ${socialLinks ? `<div class="site-footer__socials">${socialLinks}</div>` : ""}
        </div>
      </div>
    </footer>
  `;
}
