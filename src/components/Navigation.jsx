import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, sections } from "../data/profile";

const Navigation = ({ active }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scroll progress bar. rAF-throttled and passive so it never blocks scrolling.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Desktop link: dim by default, bright + accent underline when its section is in view.
  const desktopLink = (id) =>
    `relative inline-block py-1 font-medium transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-accent after:transition-opacity motion-reduce:transition-none ${
      active === id ? "text-white after:opacity-100" : "text-white/70 after:opacity-0"
    }`;

  // Mobile link: full-width 48px tap target with an accent bar on the active row.
  const mobileLink = (id) =>
    `flex min-h-12 items-center border-l-2 px-3 text-base font-medium transition-colors motion-reduce:transition-none ${
      active === id
        ? "border-accent bg-white/5 text-white"
        : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 text-white backdrop-blur-md transition-colors motion-reduce:transition-none ${
        menuOpen ? "bg-primary shadow-xl" : "bg-primary/95"
      }`}
    >
      <nav aria-label="Primary" className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            aria-label="Back to top"
            className="rounded font-display text-2xl font-bold text-white transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {profile.initials}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={desktopLink(s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <ul id="mobile-menu" className="border-t border-white/10 py-2 md:hidden">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === s.id ? "true" : undefined}
                  className={mobileLink(s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div
        aria-hidden="true"
        className="h-0.5 origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
};

export default Navigation;
