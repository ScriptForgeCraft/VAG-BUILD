import { appStore } from "../../../app/model/app-store.js";
import { siteConfig } from "../../../shared/config/site-config.js";
import { openWhatsAppMessage } from "../../../shared/lib/whatsapp.js";
import { buildQuickRequestLines } from "../lib/quick-request-message.js";
import { quickRequestStore, updateQuickRequestField } from "./quick-request-store.js";

export function initQuickRequestController() {
  const quickForm = document.getElementById("quick-form");
  const sendButton = document.querySelector("[data-quick-send]");

  if (!quickForm || !sendButton) {
    return () => {};
  }

  const handleInput = (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement) || !field.name) {
      return;
    }

    updateQuickRequestField(field.name, field.value.trim());
  };

  const handleSend = () => {
    const { language } = appStore.getState();

    openWhatsAppMessage({
      phone: siteConfig.phone.raw,
      lines: buildQuickRequestLines({
        language,
        form: quickRequestStore.getState(),
      }),
    });
  };

  quickForm.addEventListener("input", handleInput);
  sendButton.addEventListener("click", handleSend);

  return () => {
    quickForm.removeEventListener("input", handleInput);
    sendButton.removeEventListener("click", handleSend);
  };
}
