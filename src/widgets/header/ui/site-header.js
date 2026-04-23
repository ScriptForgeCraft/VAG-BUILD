import { navigationLinks } from "../../../entities/navigation/model/navigation-links.js";
import { DEFAULT_LANGUAGE } from "../../../shared/constants/languages.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { escapeAttribute, escapeHtml } from "../../../shared/lib/html.js";
import {
  createI18nAriaLabelAttributes,
  createI18nTextAttributes,
  getTranslation,
} from "../../../shared/lib/i18n.js";
import { renderIcon } from "../../../shared/ui/icons.js";
import { renderLanguageSwitcher } from "../../../shared/ui/language-switcher.js";

function renderNavigation(className, extraAttributes = "") {
  return navigationLinks
    .map(
      (link) => `
        <a href="${escapeAttribute(link.href)}" class="${escapeAttribute(className)}" ${extraAttributes}>
          <span ${createI18nTextAttributes(link.label)}>${escapeHtml(link.label.am)}</span>
        </a>
      `
    )
    .join("");
}

export function renderSiteHeader(currentLanguage = DEFAULT_LANGUAGE) {
  const mobileMenuOpenLabel = getTranslation(
    {
      am: "Բացել մենյուն",
      ru: "Открыть меню",
      en: "Open menu",
    },
    currentLanguage
  );
  const mobileMenuCloseLabel = getTranslation(
    {
      am: "Փակել մենյուն",
      ru: "Закрыть меню",
      en: "Close menu",
    },
    currentLanguage
  );

  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        <a href="#top" class="logo" aria-label="${siteConfig.brandName}">
          V<span>AG</span>
        </a>

        <nav
          class="site-nav"
          ${createI18nAriaLabelAttributes({
            am: "Հիմնական նավիգացիա",
            ru: "Основная навигация",
            en: "Primary navigation",
          })}
          aria-label="Հիմնական նավիգացիա"
        >
          ${renderNavigation("site-nav__link")}
        </nav>

        <div class="site-header__actions">
          ${renderLanguageSwitcher({ currentLanguage })}
          <a class="site-header__phone" href="tel:+${siteConfig.phone.raw}">${siteConfig.phone.display}</a>
        </div>

        <button
          class="mobile-menu-toggle js-only"
          type="button"
          data-mobile-toggle
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-label="${escapeAttribute(mobileMenuOpenLabel)}"
          data-menu-open-label="${escapeAttribute(mobileMenuOpenLabel)}"
          data-menu-close-label="${escapeAttribute(mobileMenuCloseLabel)}"
        >
          ${renderIcon("menu", "icon icon--menu")}
          ${renderIcon("close", "icon icon--close")}
        </button>
      </div>

      <div class="mobile-menu" id="mobile-menu" hidden>
        <div class="container mobile-menu__inner">
          <nav
            class="mobile-menu__nav"
            ${createI18nAriaLabelAttributes({
              am: "Բջջային նավիգացիա",
              ru: "Мобильная навигация",
              en: "Mobile navigation",
            })}
            aria-label="Բջջային նավիգացիա"
          >
            ${renderNavigation("mobile-menu__link", 'data-mobile-link')}
          </nav>

          <div class="mobile-menu__meta">
            <div class="mobile-menu__languages">
              <p class="mobile-menu__label">
                ${renderIcon("globe")}
                <span
                  ${createI18nTextAttributes({
                    am: "Լեզու",
                    ru: "Язык",
                    en: "Language",
                  })}
                >
                  Լեզու
                </span>
              </p>
              ${renderLanguageSwitcher({ mobile: true, currentLanguage })}
            </div>

            <a class="mobile-menu__phone" href="tel:+${siteConfig.phone.raw}">
              ${renderIcon("phone")}
              <span>${siteConfig.phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}
