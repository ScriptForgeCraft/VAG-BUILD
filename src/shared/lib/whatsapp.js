export function openWhatsAppMessage({ phone, lines }) {
  const message = encodeURIComponent(lines.filter(Boolean).join("\n"));
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener");
}
