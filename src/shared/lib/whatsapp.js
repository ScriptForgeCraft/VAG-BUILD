export function openWhatsAppMessage({ phone, lines }) {
  const message = encodeURIComponent(lines.filter(Boolean).join("\n"));
  const nextWindow = window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");

  if (nextWindow) {
    nextWindow.opener = null;
  }
}
