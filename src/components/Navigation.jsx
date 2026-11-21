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

  const linkClass = (id) =>
    `font-medium transition-colors hover:text-accent ${
      active === id ? "text-accent" : "text-foreground"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav aria-label="Primary" className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            aria-label="Back to top"
            className="font-display text-2xl font-bold text-foreground transition-colors hover:text-accent"
          >
            {profile.initials}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={linkClass(s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rounded-md p-2 transition-colors hover:bg-accent/10 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <ul id="mobile-menu" className="border-t border-border py-2 md:hidden">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`block py-3 ${linkClass(s.id)}`}
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
