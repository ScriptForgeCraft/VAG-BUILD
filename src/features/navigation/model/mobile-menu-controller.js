import { appStore, setMobileMenuOpen } from "../../../app/model/app-store.js";

export function initMobileMenuController() {
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const mobileLinks = document.querySelectorAll("[data-mobile-link]");
  const header = document.querySelector(".site-header");

  if (!mobileMenu || !mobileToggle) {
    return () => {};
  }

  const syncMenu = ({ mobileMenuOpen }) => {
    mobileMenu.hidden = !mobileMenuOpen;
    mobileToggle.classList.toggle("is-open", mobileMenuOpen);
    mobileToggle.setAttribute("aria-expanded", String(mobileMenuOpen));
    document.body.classList.toggle("menu-open", mobileMenuOpen);
  };

  const unsubscribe = appStore.subscribe(syncMenu);
  syncMenu(appStore.getState());

  const handleToggle = () => {
    setMobileMenuOpen(!appStore.getState().mobileMenuOpen);
  };

  const handleLinkClick = () => setMobileMenuOpen(false);
  const handleResize = () => {
    if (window.innerWidth > 900) {
      setMobileMenuOpen(false);
    }
  };
  const handleScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  mobileToggle.addEventListener("click", handleToggle);
  mobileLinks.forEach((link) => link.addEventListener("click", handleLinkClick));
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => {
    unsubscribe();
    mobileToggle.removeEventListener("click", handleToggle);
    mobileLinks.forEach((link) => link.removeEventListener("click", handleLinkClick));
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("scroll", handleScroll);
  };
}
