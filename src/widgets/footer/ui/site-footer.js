import { navigationLinks } from "../../../entities/navigation/model/navigation-links.js";
import { escapeAttribute, escapeHtml } from "../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../shared/lib/i18n.js";
import { isActionableLink } from "../../../shared/lib/link.js";
import { renderSocialLinks } from "../../../shared/ui/social-links.js";

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

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__grid">
          <div class="site-footer__brand">
            <a href="#top" class="logo logo--dark" aria-label="VAG">
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

          <nav class="site-footer__nav" aria-labelledby="footer-navigation-title">
            <p
              class="site-footer__title"
              id="footer-navigation-title"
              ${createI18nTextAttributes({
                am: "Բաժիններ",
                ru: "Разделы",
                en: "Links",
              })}
            >
              Բաժիններ
            </p>
            <ul class="site-footer__links">
              ${renderLinks(navigationLinks)}
            </ul>
          </nav>

          ${
            actionableLegalLinks.length
              ? `
                <nav class="site-footer__nav" aria-labelledby="footer-legal-title">
                  <p
                    class="site-footer__title"
                    id="footer-legal-title"
                    ${createI18nTextAttributes({
                      am: "Իրավական",
                      ru: "Правовая информация",
                      en: "Legal",
                    })}
                  >
                    Իրավական
                  </p>
                  <ul class="site-footer__links">
                    ${renderLinks(actionableLegalLinks)}
                  </ul>
                </nav>
              `
              : ""
          }
        </div>

        <div class="site-footer__bottom">
          <p>
            © <span data-current-year>2026</span> VAG.
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
          ${renderSocialLinks({ className: "site-footer__socials" })}
        </div>
      </div>
    </footer>
  `;
}
