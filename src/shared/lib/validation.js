export const PHONE_INPUT_PATTERN = "[0-9+()\\-\\s]{7,20}";

const phoneValidationMessages = {
  am: "Մուտքագրեք վավեր հեռախոսահամար։",
  ru: "Введите корректный номер телефона.",
  en: "Enter a valid phone number.",
};

export function getPhoneDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

export function isPhoneNumberPlausible(value = "") {
  const digits = getPhoneDigits(value);
  return digits.length >= 7 && digits.length <= 15;
}

export function applyPhoneValidation(input, language = "am") {
  if (!(input instanceof HTMLInputElement)) {
    return false;
  }

  const value = input.value.trim();

  if (!value) {
    input.setCustomValidity("");
    return false;
  }

  const isValid = isPhoneNumberPlausible(value);
  input.setCustomValidity(isValid ? "" : phoneValidationMessages[language] || phoneValidationMessages.am);
  return isValid;
}
