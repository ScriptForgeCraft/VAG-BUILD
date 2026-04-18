import { getStoredLanguage, persistLanguage } from "../../shared/lib/i18n.js";
import { createStore } from "../../shared/state/create-store.js";

export const appStore = createStore({
  language: getStoredLanguage(),
  mobileMenuOpen: false,
});

export function setLanguage(language) {
  persistLanguage(language);
  appStore.setState((state) => ({
    ...state,
    language,
  }));
}

export function setMobileMenuOpen(mobileMenuOpen) {
  appStore.setState((state) => ({
    ...state,
    mobileMenuOpen,
  }));
}
