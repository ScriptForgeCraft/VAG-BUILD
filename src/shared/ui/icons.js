import { escapeAttribute } from "../lib/html.js";

export function renderIcon(name, className = "icon") {
  return `<svg class="${escapeAttribute(className)}"><use href="#icon-${escapeAttribute(name)}"></use></svg>`;
}

export function renderIconSprite() {
  return `
    <svg aria-hidden="true" class="icon-sprite">
      <symbol id="icon-menu" viewBox="0 0 24 24">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </symbol>
      <symbol id="icon-close" viewBox="0 0 24 24">
        <path d="M6 6l12 12M18 6L6 18" />
      </symbol>
      <symbol id="icon-phone" viewBox="0 0 24 24">
        <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 3.18 2 2 0 0 1 4.1 1h2A2 2 0 0 1 8 2.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.45-1.11a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92Z" />
      </symbol>
      <symbol id="icon-globe" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </symbol>
      <symbol id="icon-arrow-right" viewBox="0 0 24 24">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </symbol>
      <symbol id="icon-arrow-left" viewBox="0 0 24 24">
        <path d="M19 12H5M11 5l-7 7 7 7" />
      </symbol>
      <symbol id="icon-arrow-up-right" viewBox="0 0 24 24">
        <path d="M7 17 17 7M8 7h9v9" />
      </symbol>
      <symbol id="icon-map-pin" viewBox="0 0 24 24">
        <path d="M12 21s7-5.33 7-11a7 7 0 0 0-14 0c0 5.67 7 11 7 11Z" />
        <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </symbol>
      <symbol id="icon-shield" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </symbol>
      <symbol id="icon-clock" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </symbol>
      <symbol id="icon-users" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </symbol>
      <symbol id="icon-check-circle" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </symbol>
      <symbol id="icon-check" viewBox="0 0 24 24">
        <path d="m5 12 5 5L20 7" />
      </symbol>
      <symbol id="icon-calculator" viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M8 6h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h8" />
      </symbol>
      <symbol id="icon-send" viewBox="0 0 24 24">
        <path d="M22 2 11 13" />
        <path d="m22 2-7 20-4-9-9-4Z" />
      </symbol>
      <symbol id="icon-mail" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </symbol>
      <symbol id="icon-message-circle" viewBox="0 0 24 24">
        <path d="M7 10h10M7 14h6" />
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3V11.5A8.5 8.5 0 0 1 11.5 3H12a9 9 0 0 1 9 8.5Z" />
      </symbol>
      <symbol id="icon-instagram" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </symbol>
      <symbol id="icon-facebook" viewBox="0 0 24 24">
        <path d="M15 8h3V3h-3a5 5 0 0 0-5 5v3H7v5h3v5h5v-5h3l1-5h-4V8a1 1 0 0 1 1-1Z" />
      </symbol>
      <symbol id="icon-home" viewBox="0 0 24 24">
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </symbol>
      <symbol id="icon-building" viewBox="0 0 24 24">
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M9 21v-4h6v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" />
      </symbol>
      <symbol id="icon-bolt" viewBox="0 0 24 24">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </symbol>
      <symbol id="icon-tools" viewBox="0 0 24 24">
        <path d="m14.7 6.3 3 3M5 19l7.5-7.5M14 4l6 6M3 21l6-6" />
        <path d="M8 8 5 5l2-2 3 3M16 16l3 3-2 2-3-3" />
      </symbol>
    </svg>
  `;
}
