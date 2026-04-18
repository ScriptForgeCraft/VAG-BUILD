import { navigationLinks } from "../../../entities/navigation/model/navigation-links.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { escapeHtml } from "../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../shared/lib/i18n.js";
import { renderIcon } from "../../../shared/ui/icons.js";
import { renderLanguageSwitcher } from "../../../shared/ui/language-switcher.js";

function renderNavigation(className, extraAttributes = "") {
  return navigationLinks
    .map(
      (link) => `
        <a href="${link.href}" class="${className}" ${extraAttributes}>
          <span ${createI18nTextAttributes(link.label)}>${escapeHtml(link.label.am)}</span>
        </a>
      `
    )
    .join("");
}

export function renderSiteHeader() {
  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        <a href="#top" class="logo" aria-label="${siteConfig.brandName}">
          V<span>AG</span>
        </a>

        <nav class="site-nav" aria-label="Primary">
          ${renderNavigation("site-nav__link")}
        </nav>

        <div class="site-header__actions">
          ${renderLanguageSwitcher()}
          <a class="site-header__phone" href="tel:+${siteConfig.phone.raw}">${siteConfig.phone.display}</a>
        </div>

        <button
          class="mobile-menu-toggle js-only"
          type="button"
          data-mobile-toggle
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          ${renderIcon("menu", "icon icon--menu")}
          ${renderIcon("close", "icon icon--close")}
        </button>
      </div>

      <div class="mobile-menu" id="mobile-menu" hidden>
        <div class="container mobile-menu__inner">
          <nav class="mobile-menu__nav" aria-label="Mobile">
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
              ${renderLanguageSwitcher({ mobile: true })}
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
