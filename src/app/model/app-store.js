import { getStoredLanguage } from "../../shared/lib/i18n.js";
import { createStore } from "../../shared/state/create-store.js";

export const appStore = createStore({
  language: getStoredLanguage(),
  mobileMenuOpen: false,
});

export function setMobileMenuOpen(mobileMenuOpen) {
  appStore.setState((state) => ({
    ...state,
    mobileMenuOpen,
  }));
}
