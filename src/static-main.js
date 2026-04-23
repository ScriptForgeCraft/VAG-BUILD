import { initCalculatorController } from "./features/calculator/model/calculator-controller.js";
import { initMobileMenuController } from "./features/navigation/model/mobile-menu-controller.js";
import { initQuickRequestController } from "./features/quick-request/model/quick-request-controller.js";
import { initRevealController } from "./features/reveal/model/reveal-controller.js";

function syncCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}

document.documentElement.classList.remove("no-js");
syncCurrentYear();

initMobileMenuController();
initCalculatorController();
initQuickRequestController();
initRevealController();
