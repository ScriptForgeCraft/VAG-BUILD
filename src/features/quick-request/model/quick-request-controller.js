import { appStore } from "../../../app/model/app-store.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { openWhatsAppMessage } from "../../../shared/lib/whatsapp.js";
import { applyPhoneValidation } from "../../../shared/lib/validation.js";
import { buildQuickRequestLines } from "../lib/quick-request-message.js";

function getQuickRequestFormData(form) {
  const formData = new FormData(form);

  return {
    quickName: String(formData.get("quickName") || "").trim(),
    quickPhone: String(formData.get("quickPhone") || "").trim(),
  };
}

export function initQuickRequestController() {
  const quickForm = document.getElementById("quick-form");

  if (!quickForm) {
    return () => {};
  }

  const handleInput = (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement) || !field.name) {
      return;
    }

    if (field.name === "quickPhone") {
      applyPhoneValidation(field, appStore.getState().language);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { language } = appStore.getState();
    const phoneField = quickForm.querySelector('input[name="quickPhone"]');

    if (phoneField instanceof HTMLInputElement) {
      applyPhoneValidation(phoneField, language);
    }

    if (!quickForm.reportValidity()) {
      return;
    }

    openWhatsAppMessage({
      phone: siteConfig.phone.raw,
      lines: buildQuickRequestLines({
        language,
        form: getQuickRequestFormData(quickForm),
      }),
    });
  };

  quickForm.addEventListener("input", handleInput);
  quickForm.addEventListener("submit", handleSubmit);

  return () => {
    quickForm.removeEventListener("input", handleInput);
    quickForm.removeEventListener("submit", handleSubmit);
  };
}
