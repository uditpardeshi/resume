export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Strip all control characters and trim. Safe for PDF text fields. */
export function cleanText(s: string | undefined | null): string {
  if (!s) return "";
  // eslint-disable-next-line no-control-regex
  return String(s)
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
}
