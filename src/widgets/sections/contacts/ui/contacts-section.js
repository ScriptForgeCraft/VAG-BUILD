import { siteConfig } from "../../../../shared/config/site-config.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { PHONE_INPUT_PATTERN } from "../../../../shared/lib/validation.js";
import { renderButton } from "../../../../shared/ui/button.js";
import { renderInputField } from "../../../../shared/ui/form-controls.js";
import { renderIcon } from "../../../../shared/ui/icons.js";
import { renderSocialLinks } from "../../../../shared/ui/social-links.js";

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
    <section class="section contacts" id="contacts" aria-labelledby="contacts-title">
      <div class="container">
        <div class="contacts-card">
          <div class="contacts-card__info">
            <h2
              id="contacts-title"
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

            <dl class="contacts-card__grid">
              <div class="contact-item">
                <div class="contact-item__icon">${renderIcon("phone")}</div>
                <div>
                  <dt
                    class="contact-item__label"
                    ${createI18nTextAttributes({
                      am: "Հեռախոս",
                      ru: "Телефон",
                      en: "Phone",
                    })}
                  >
                    Հեռախոս
                  </dt>
                  <dd class="contact-item__value">
                    <a href="tel:+${siteConfig.phone.raw}">${siteConfig.phone.display}</a>
                  </dd>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-item__icon">${renderIcon("mail")}</div>
                <div>
                  <dt
                    class="contact-item__label"
                    ${createI18nTextAttributes({
                      am: "Էլ. փոստ",
                      ru: "Email",
                      en: "Email",
                    })}
                  >
                    Էլ. փոստ
                  </dt>
                  <dd class="contact-item__value">
                    <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>
                  </dd>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-item__icon">${renderIcon("map-pin")}</div>
                <div>
                  <dt
                    class="contact-item__label"
                    ${createI18nTextAttributes({
                      am: "Գրասենյակ",
                      ru: "Офис",
                      en: "Office",
                    })}
                  >
                    Գրասենյակ
                  </dt>
                  <dd class="contact-item__value">
                    <address class="contact-item__address" ${createI18nTextAttributes(siteConfig.location)}>
                      ${escapeHtml(siteConfig.location.am)}
                    </address>
                  </dd>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-item__icon">${renderIcon("clock")}</div>
                <div>
                  <dt
                    class="contact-item__label"
                    ${createI18nTextAttributes({
                      am: "Աշխատանքային ժամեր",
                      ru: "Рабочие часы",
                      en: "Working Hours",
                    })}
                  >
                    Աշխատանքային ժամեր
                  </dt>
                  <dd class="contact-item__value">
                    <time datetime="Mo-Su 09:00-20:00" ${createI18nTextAttributes(siteConfig.workHours)}>
                      ${escapeHtml(siteConfig.workHours.am)}
                    </time>
                  </dd>
                </div>
              </div>
            </dl>

            ${renderSocialLinks({ className: "contacts-card__socials" })}
          </div>

          <div class="contacts-card__form-wrap">
            <form class="quick-form" id="quick-form" action="#contacts">
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
                autocomplete: "name",
              })}
              ${renderInputField({
                id: "quick-phone",
                name: "quickPhone",
                fieldName: "quickPhone",
                type: "tel",
                label: quickRequestFields.quickPhone.label,
                placeholder: quickRequestFields.quickPhone.placeholder,
                autocomplete: "tel",
                inputMode: "tel",
                required: true,
                minLength: 7,
                maxLength: 20,
                pattern: PHONE_INPUT_PATTERN,
              })}
              ${renderButton({
                type: "submit",
                label: {
                  am: "Ուղարկել հաղորդագրություն",
                  ru: "Отправить сообщение",
                  en: "Send Message",
                },
                variant: "primary",
                icon: "send",
                classes: "quick-form__button js-only",
              })}
              <p
                class="calculator-hint no-js-only"
                ${createI18nTextAttributes({
                  am: "Արագ հարցման համար օգտագործեք հեռախոսը կամ WhatsApp-ը. այս ձևը պահանջում է JavaScript։",
                  ru: "Для быстрой заявки используйте телефон или WhatsApp: эта форма работает через JavaScript.",
                  en: "For a quick request, use the phone or WhatsApp links: this form requires JavaScript.",
                })}
              >
                Արագ հարցման համար օգտագործեք հեռախոսը կամ WhatsApp-ը. այս ձևը պահանջում է JavaScript։
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}
