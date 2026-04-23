function encodeSvg(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

function createPlaceholderImage({
  width = 1200,
  height = 900,
  accent = "#c89b6d",
  primary = "#1b1b1b",
  secondary = "#f4efe8",
  label = "VAG",
} = {}) {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${secondary}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="#313131" />
        </linearGradient>
      </defs>

      <rect width="${width}" height="${height}" rx="48" fill="url(#bg)" />
      <circle cx="${width - 180}" cy="170" r="140" fill="${accent}" opacity="0.18" />
      <circle cx="160" cy="${height - 180}" r="120" fill="${accent}" opacity="0.12" />
      <rect x="90" y="90" width="${width - 180}" height="${height - 180}" rx="40" fill="url(#panel)" />
      <rect x="150" y="160" width="${width - 300}" height="18" rx="9" fill="#ffffff" opacity="0.08" />
      <rect x="150" y="210" width="${width - 430}" height="18" rx="9" fill="#ffffff" opacity="0.08" />
      <rect x="150" y="${height - 260}" width="${width - 300}" height="22" rx="11" fill="#ffffff" opacity="0.08" />
      <rect x="150" y="${height - 210}" width="${width - 520}" height="22" rx="11" fill="#ffffff" opacity="0.08" />
      <path d="M${width - 360} ${height - 250} L${width - 150} ${height - 460}" stroke="${accent}" stroke-width="26" stroke-linecap="round" opacity="0.85" />
      <path d="M${width - 250} ${height - 250} L${width - 150} ${height - 350}" stroke="#ffffff" stroke-width="20" stroke-linecap="round" opacity="0.9" />
      <text x="150" y="${height / 2 + 30}" fill="#ffffff" font-size="148" font-family="Inter, Arial, sans-serif" font-weight="800" letter-spacing="8">${label}</text>
    </svg>
  `);
}

export function createHeroPlaceholderImage() {
  return createPlaceholderImage({
    width: 1200,
    height: 1200,
    accent: "#b98554",
    primary: "#1a1a1a",
    secondary: "#f3ede4",
    label: "VAG",
  });
}

export function createTeamPlaceholderImage() {
  return createPlaceholderImage({
    width: 1000,
    height: 1000,
    accent: "#7b8d74",
    primary: "#1e2420",
    secondary: "#eef1ec",
    label: "TEAM",
  });
}

export function createProjectPlaceholderImage({
  accent = "#f27d26",
  primary = "#202020",
  secondary = "#f5f6f8",
  label = "PROJECT",
} = {}) {
  return createPlaceholderImage({
    width: 800,
    height: 600,
    accent,
    primary,
    secondary,
    label,
  });
}
