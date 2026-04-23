export function isActionableLink(value = "") {
  if (value === null || typeof value === "undefined") {
    return false;
  }

  const normalized = String(value).trim();
  return normalized !== "" && normalized !== "#";
}
