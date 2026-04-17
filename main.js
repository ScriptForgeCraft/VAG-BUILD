const root = document.documentElement;
root.classList.remove("no-js");

const state = {
  language: localStorage.getItem("vag-language") || root.dataset.defaultLanguage || "am",
  step: 1,
  form: {
    objectType: "",
    area: 50,
    workType: "",
    condition: "",
    urgency: "standard",
    demolition: "no",
    materials: "yes",
    name: "",
    phone: "",
    comment: "",
    quickName: "",
    quickPhone: "",
  },
};

const languageButtons = document.querySelectorAll("[data-language-switch]");
const mobileMenu = document.getElementById("mobile-menu");
const mobileToggle = document.querySelector("[data-mobile-toggle]");
const currentYear = document.querySelector("[data-current-year]");
const areaRange = document.getElementById("area-range");
const areaValue = document.querySelector("[data-area-value]");
const estimateValue = document.querySelector("[data-estimate-value]");
const conditionSelect = document.getElementById("condition-select");
const calculatorPanels = document.querySelectorAll(".calculator-panel");
const stepIndicators = document.querySelectorAll("[data-step-indicator]");
const backButton = document.querySelector("[data-calculator-back]");
const nextButton = document.querySelector("[data-calculator-next]");
const sendButton = document.querySelector("[data-calculator-send]");
const calculatorForm = document.getElementById("calculator-form");
const quickForm = document.getElementById("quick-form");
const header = document.querySelector(".site-header");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function applyLanguage(language) {
  state.language = language;
  localStorage.setItem("vag-language", language);
  root.lang = language === "am" ? "hy" : language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translated = element.dataset[language];
    if (translated) {
      element.textContent = translated;
    }
  });

  document.querySelectorAll("[data-placeholder-am]").forEach((element) => {
    const key = `placeholder${capitalize(language)}`;
    const translated = element.dataset[key];
    if (translated) {
      element.setAttribute("placeholder", translated);
    }
  });

  document.querySelectorAll("[data-text-am]").forEach((element) => {
    const key = `text${capitalize(language)}`;
    const translated = element.dataset[key];
    if (translated) {
      element.textContent = translated;
    }
  });

  document.querySelectorAll("[data-alt-am]").forEach((element) => {
    const key = `alt${capitalize(language)}`;
    const translated = element.dataset[key];
    if (translated) {
      element.setAttribute("alt", translated);
    }
  });

  const title = document.querySelector("title");
  if (title) {
    const key = `title${capitalize(language)}`;
    const translated = title.dataset[key];
    if (translated) {
      title.textContent = translated;
    }
  }

  document.querySelectorAll("meta[data-content-am]").forEach((element) => {
    const key = `content${capitalize(language)}`;
    const translated = element.dataset[key];
    if (translated) {
      element.setAttribute("content", translated);
    }
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.languageSwitch === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function toggleMobileMenu(forceState) {
  if (!mobileMenu || !mobileToggle) {
    return;
  }

  const shouldOpen = typeof forceState === "boolean" ? forceState : mobileMenu.hidden;
  mobileMenu.hidden = !shouldOpen;
  mobileToggle.classList.toggle("is-open", shouldOpen);
  mobileToggle.setAttribute("aria-expanded", String(shouldOpen));
  document.body.classList.toggle("menu-open", shouldOpen);
}

function updateChoiceButtons() {
  document.querySelectorAll("[data-choice]").forEach((button) => {
    const field = button.dataset.field;
    const value = button.dataset.value;
    const active = field && state.form[field] === value;
    button.classList.toggle("is-selected", Boolean(active));
  });
}

function calculateEstimate() {
  const objectFactor = {
    apartment: 1,
    house: 1.18,
    office: 1.12,
    shop: 1.2,
    other: 1.08,
  };

  const workFactor = {
    cosmetic: 1.5,
    capital: 2.5,
    turnkey: 3.5,
    systems: 2.2,
    minor: 1.25,
  };

  const conditionFactor = {
    "": 1,
    new: 1,
    secondary: 1.12,
    partial: 1.06,
    "after-demo": 1.18,
  };

  const urgencyFactor = {
    standard: 1,
    urgent: 1.12,
    "very-urgent": 1.24,
  };

  const demolitionFactor = {
    yes: 1.1,
    no: 1,
  };

  const materialsFactor = {
    yes: 1.05,
    no: 1,
  };

  const estimate =
    5000 *
    state.form.area *
    (objectFactor[state.form.objectType] || 1) *
    (workFactor[state.form.workType] || 1) *
    (conditionFactor[state.form.condition] || 1) *
    (urgencyFactor[state.form.urgency] || 1) *
    (demolitionFactor[state.form.demolition] || 1) *
    (materialsFactor[state.form.materials] || 1);

  const rounded = Math.round(estimate / 1000) * 1000;
  if (estimateValue) {
    estimateValue.textContent = new Intl.NumberFormat("en-US").format(rounded);
  }
}

function updateCalculatorStep() {
  calculatorPanels.forEach((panel) => {
    const active = Number(panel.dataset.step) === state.step;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });

  stepIndicators.forEach((item) => {
    const stepNumber = Number(item.dataset.stepIndicator);
    item.classList.toggle("is-active", stepNumber === state.step);
    item.classList.toggle("is-complete", stepNumber < state.step);
  });

  if (backButton) {
    backButton.classList.toggle("is-hidden", state.step === 1);
  }

  if (nextButton) {
    nextButton.classList.toggle("is-hidden", state.step === 4);
  }

  if (sendButton) {
    sendButton.classList.toggle("is-hidden", state.step !== 4);
  }
}

function getFieldLabel(fieldName) {
  return document.querySelector(`[data-field-label="${fieldName}"]`)?.textContent?.trim() || fieldName;
}

function getChoiceLabel(fieldName, value) {
  if (!value) {
    return "-";
  }

  if (fieldName === "condition" && conditionSelect) {
    return conditionSelect.options[conditionSelect.selectedIndex]?.textContent?.trim() || value;
  }

  const button = document.querySelector(`[data-choice][data-field="${fieldName}"][data-value="${value}"]`);
  return button?.textContent?.trim() || value;
}

function openWhatsApp(lines) {
  const phone = root.dataset.whatsapp || "";
  const message = encodeURIComponent(lines.filter(Boolean).join("\n"));
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener");
}

function sendCalculatorRequest() {
  const estimateLabel = document.querySelector(".estimate-box__label")?.textContent?.trim() || "Estimate";
  const lines = [
    document.querySelector("[data-calculator-send]")?.textContent?.trim(),
    `${getFieldLabel("objectType")}: ${getChoiceLabel("objectType", state.form.objectType)}`,
    `${getFieldLabel("area")}: ${state.form.area} m²`,
    `${getFieldLabel("workType")}: ${getChoiceLabel("workType", state.form.workType)}`,
    `${getFieldLabel("condition")}: ${getChoiceLabel("condition", state.form.condition)}`,
    `${getFieldLabel("urgency")}: ${getChoiceLabel("urgency", state.form.urgency)}`,
    `${getFieldLabel("demolition")}: ${getChoiceLabel("demolition", state.form.demolition)}`,
    `${getFieldLabel("materials")}: ${getChoiceLabel("materials", state.form.materials)}`,
    `${getFieldLabel("name")}: ${state.form.name || "-"}`,
    `${getFieldLabel("phone")}: ${state.form.phone || "-"}`,
    `${getFieldLabel("comment")}: ${state.form.comment || "-"}`,
    `${estimateLabel}: ${estimateValue?.textContent || "-"} AMD`,
  ];

  openWhatsApp(lines);
}

function sendQuickRequest() {
  const lines = [
    quickForm?.querySelector("h3")?.textContent?.trim(),
    `${getFieldLabel("quickName")}: ${state.form.quickName || "-"}`,
    `${getFieldLabel("quickPhone")}: ${state.form.quickPhone || "-"}`,
  ];

  openWhatsApp(lines);
}

function setupRevealObserver() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.languageSwitch || "am");
    toggleMobileMenu(false);
  });
});

document.querySelectorAll("[data-mobile-link]").forEach((link) => {
  link.addEventListener("click", () => toggleMobileMenu(false));
});

mobileToggle?.addEventListener("click", () => toggleMobileMenu());

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    toggleMobileMenu(false);
  }
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

document.querySelectorAll("[data-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    const { field, value } = button.dataset;
    if (!field || !value) {
      return;
    }

    state.form[field] = value;
    updateChoiceButtons();
    calculateEstimate();
  });
});

areaRange?.addEventListener("input", () => {
  state.form.area = Number(areaRange.value);
  if (areaValue) {
    areaValue.textContent = String(state.form.area);
  }
  calculateEstimate();
});

conditionSelect?.addEventListener("change", () => {
  state.form.condition = conditionSelect.value;
  calculateEstimate();
});

if (calculatorForm) {
  calculatorForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      state.form[field.name] = field.value.trim();
    });
  });
}

if (quickForm) {
  quickForm.querySelectorAll("input").forEach((field) => {
    field.addEventListener("input", () => {
      state.form[field.name] = field.value.trim();
    });
  });
}

backButton?.addEventListener("click", () => {
  state.step = Math.max(1, state.step - 1);
  updateCalculatorStep();
});

nextButton?.addEventListener("click", () => {
  state.step = Math.min(4, state.step + 1);
  updateCalculatorStep();
});

sendButton?.addEventListener("click", sendCalculatorRequest);
document.querySelector("[data-quick-send]")?.addEventListener("click", sendQuickRequest);

applyLanguage(state.language);
updateChoiceButtons();
calculateEstimate();
updateCalculatorStep();
setupRevealObserver();
