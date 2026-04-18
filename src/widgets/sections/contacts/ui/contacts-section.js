import { siteConfig } from "../../../../shared/config/site-config.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { renderButton } from "../../../../shared/ui/button.js";
import { renderInputField } from "../../../../shared/ui/form-controls.js";
import { renderIcon } from "../../../../shared/ui/icons.js";

const quickRequestFields = {
  quickName: {
    label: {
      am: "Անուն",
      ru: "Имя",
      en: "Name",
    },
    placeholder: {
      am: "Անուն",
      ru: "Имя",
      en: "Name",
    },
  },
  quickPhone: {
    label: {
      am: "Հեռախոս",
      ru: "Телефон",
      en: "Phone",
    },
    placeholder: {
      am: "+374 ...",
      ru: "+374 ...",
      en: "+374 ...",
    },
  },
};

export function renderContactsSection() {
  return `
    <section class="section contacts" id="contacts">
      <div class="container">
        <div class="contacts-card">
          <div class="contacts-card__info">
            <h2
              ${createI18nTextAttributes({
                am: "Կապ մեզ հետ",
                ru: "Контакты",
                en: "Contacts",
              })}
            >
              Կապ մեզ հետ
            </h2>
            <p
              ${createI18nTextAttributes({
                am: "Պատրաստ ենք պատասխանել ձեր բոլոր հարցերին",
                ru: "Мы всегда на связи и готовы помочь",
                en: "We are always here to help",
              })}
            >
              Պատրաստ ենք պատասխանել ձեր բոլոր հարցերին
            </p>

            <div class="contacts-card__grid">
              <article class="contact-item">
                <div class="contact-item__icon">${renderIcon("phone")}</div>
                <div>
                  <span
                    class="contact-item__label"
                    ${createI18nTextAttributes({
                      am: "Հեռախոս",
                      ru: "Телефон",
                      en: "Phone",
                    })}
                  >
                    Հեռախոս
                  </span>
                  <a href="tel:+${siteConfig.phone.raw}">${siteConfig.phone.display}</a>
                </div>
              </article>

              <article class="contact-item">
                <div class="contact-item__icon">${renderIcon("mail")}</div>
                <div>
                  <span class="contact-item__label">Email</span>
                  <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>
                </div>
              </article>

              <article class="contact-item">
                <div class="contact-item__icon">${renderIcon("map-pin")}</div>
                <div>
                  <span
                    class="contact-item__label"
                    ${createI18nTextAttributes({
                      am: "Գրասենյակ",
                      ru: "Офис",
                      en: "Office",
                    })}
                  >
                    Գրասենյակ
                  </span>
                  <span ${createI18nTextAttributes(siteConfig.location)}>${escapeHtml(siteConfig.location.am)}</span>
                </div>
              </article>

              <article class="contact-item">
                <div class="contact-item__icon">${renderIcon("clock")}</div>
                <div>
                  <span
                    class="contact-item__label"
                    ${createI18nTextAttributes({
                      am: "Աշխատանքային ժամեր",
                      ru: "Рабочие часы",
                      en: "Working Hours",
                    })}
                  >
                    Աշխատանքային ժամեր
                  </span>
                  <span ${createI18nTextAttributes(siteConfig.workHours)}>${escapeHtml(siteConfig.workHours.am)}</span>
                </div>
              </article>
            </div>

            <div class="contacts-card__socials">
              <a href="${siteConfig.socialLinks.instagram}" aria-label="Instagram">${renderIcon("instagram")}</a>
              <a href="${siteConfig.socialLinks.facebook}" aria-label="Facebook">${renderIcon("facebook")}</a>
            </div>
          </div>

          <div class="contacts-card__form-wrap">
            <form class="quick-form" id="quick-form" novalidate>
              <h3
                ${createI18nTextAttributes({
                  am: "Արագ հաղորդագրություն",
                  ru: "Быстрое сообщение",
                  en: "Quick Message",
                })}
              >
                Արագ հաղորդագրություն
              </h3>
              ${renderInputField({
                id: "quick-name",
                name: "quickName",
                fieldName: "quickName",
                label: quickRequestFields.quickName.label,
                placeholder: quickRequestFields.quickName.placeholder,
              })}
              ${renderInputField({
                id: "quick-phone",
                name: "quickPhone",
                fieldName: "quickPhone",
                type: "tel",
                label: quickRequestFields.quickPhone.label,
                placeholder: quickRequestFields.quickPhone.placeholder,
              })}
              ${renderButton({
                type: "button",
                label: {
                  am: "Ուղարկել հաղորդագրություն",
                  ru: "Отправить сообщение",
                  en: "Send Message",
                },
                variant: "primary",
                icon: "send",
                classes: "quick-form__button",
                attributes: "data-quick-send",
              })}
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}
