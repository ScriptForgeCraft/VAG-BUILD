import { renderCalculatorForm } from "../../../../features/calculator/ui/calculator-form.js";

export function renderCalculatorSection() {
  return `
    <section class="section calculator-section" id="calculator">
      <div class="container">
        ${renderCalculatorForm()}
      </div>
    </section>
  `;
}
