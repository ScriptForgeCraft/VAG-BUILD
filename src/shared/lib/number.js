export function formatNumber(value, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(value);
}
