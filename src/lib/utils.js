export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  return true;
};

// Copy that contains a "TODO" marker (or is empty) is unfinished.
// Case-sensitive on purpose, so ordinary words like "to-do" never trigger it.
export const isTodo = (text) => !text || /\bTODO\b/.test(text);

// True only in a production build (`npm run build`), never in `npm run dev`.
export const IS_PROD = Boolean(import.meta.env?.PROD);

// The part of a field that is real copy: everything before a TODO marker.
// Visitors on the live site only ever see this.
export const publicText = (text) => {
  if (!text) return "";
  const at = text.search(/\bTODO\b/);
  return (at >= 0 ? text.slice(0, at) : text).trim();
};