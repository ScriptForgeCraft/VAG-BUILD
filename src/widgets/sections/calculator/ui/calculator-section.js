import { renderCalculatorForm } from "../../../../features/calculator/ui/calculator-form.js";

export function renderCalculatorSection() {
  return `
    <section class="section calculator-section" id="calculator" aria-labelledby="calculator-title">
      <div class="container">
        ${renderCalculatorForm()}
      </div>
    </section>
  `;
}
