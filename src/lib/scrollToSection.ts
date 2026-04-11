export function scrollToSectionById(sectionId: string, attempts = 16): void {
  if (typeof window === "undefined") return;

  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (attempts > 0) {
    window.setTimeout(() => scrollToSectionById(sectionId, attempts - 1), 80);
  }
}
