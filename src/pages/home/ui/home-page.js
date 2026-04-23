import { renderCalculatorSection } from "../../../widgets/sections/calculator/ui/calculator-section.js";
import { renderContactsSection } from "../../../widgets/sections/contacts/ui/contacts-section.js";
import { renderFaqSection } from "../../../widgets/sections/faq/ui/faq-section.js";
import { renderHeroSection } from "../../../widgets/sections/hero/ui/hero-section.js";
import { renderProcessSection } from "../../../widgets/sections/process/ui/process-section.js";
import { renderServicesSection } from "../../../widgets/sections/services/ui/services-section.js";
import { renderTrustStripSection } from "../../../widgets/sections/trust-strip/ui/trust-strip-section.js";
import { renderWhyUsSection } from "../../../widgets/sections/why-us/ui/why-us-section.js";

export function renderHomePage() {
  return `
    <main id="content">
      ${renderHeroSection()}
      ${renderTrustStripSection()}
      ${renderServicesSection()}
      ${renderCalculatorSection()}
      ${renderProcessSection()}
      ${renderWhyUsSection()}
      ${renderFaqSection()}
      ${renderContactsSection()}
    </main>
  `;
}
