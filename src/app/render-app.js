import { renderHomePage } from "../pages/home/index.js";
import { renderFloatingActions } from "../widgets/floating-actions/ui/floating-actions.js";
import { renderSiteFooter } from "../widgets/footer/ui/site-footer.js";
import { renderSiteHeader } from "../widgets/header/ui/site-header.js";
import { renderIconSprite } from "../shared/ui/icons.js";

export function renderApp(root) {
  root.innerHTML = `
    ${renderIconSprite()}
    ${renderSiteHeader()}
    ${renderHomePage()}
    ${renderSiteFooter()}
    ${renderFloatingActions()}
  `;
}
