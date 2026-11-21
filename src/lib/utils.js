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