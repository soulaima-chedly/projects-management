export function isNumeric(str: string) {
  return /^\d+$/.test(str);
}

export function formatLabel(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
