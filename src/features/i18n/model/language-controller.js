import { appStore, setLanguage, setMobileMenuOpen } from "../../../app/model/app-store.js";
import { siteMeta } from "../../../shared/config/site-meta.js";
import { applyLanguage, getTranslation } from "../../../shared/lib/i18n.js";

function syncMetadata(language) {
  document.title = getTranslation(siteMeta.title, language);

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", getTranslation(siteMeta.description, language));
  }
}

export function initLanguageController() {
  const buttons = document.querySelectorAll("[data-language-switch]");

  const handleSwitch = (event) => {
    const button = event.currentTarget;
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    setLanguage(button.dataset.languageSwitch || "am");
    setMobileMenuOpen(false);
  };

  buttons.forEach((button) => button.addEventListener("click", handleSwitch));

  const unsubscribe = appStore.subscribe(({ language }) => {
    applyLanguage(language);
    syncMetadata(language);
  });

  const { language } = appStore.getState();
  applyLanguage(language);
  syncMetadata(language);

  return () => {
    unsubscribe();
    buttons.forEach((button) => button.removeEventListener("click", handleSwitch));
  };
}
