import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FileText, FolderGit2, Home, Mail, User, Wrench } from "lucide-react";
import { sections } from "../data/profile";
import { prefersReducedMotion } from "../lib/utils";

const ICONS = {
  hero: Home,
  about: User,
  skills: Wrench,
  projects: FolderGit2,
  resume: FileText,
  contact: Mail,
};

// Module-level so identities are stable across renders.
const ITEMS = [{ id: "hero", label: "Home" }, ...sections];

const isField = (el) => !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const Navigation = ({ active }) => {
  const current = active ?? "hero";
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const listRef = useRef(null);
  const blobRef = useRef(null);
  const itemRefs = useRef({});
  const iconRefs = useRef({});

  // Scroll progress. rAF-throttled and passive so it never blocks scrolling.
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

  // Slide away while a form field has focus, so the dock never sits on the keyboard.
  useEffect(() => {
    const onIn = (e) => isField(e.target) && setHidden(true);
    const onOut = (e) => !isField(e.relatedTarget) && setHidden(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  // The glowing blob tracks the active item. The active item's label animates its
  // width open, so we re-measure every frame for a moment instead of once. The blob's
  // own CSS transition then chases the target, which is what gives it the springy feel.
  useLayoutEffect(() => {
    const sync = () => {
      const el = itemRefs.current[current];
      const blob = blobRef.current;
      if (!el || !blob) return;
      blob.style.width = `${el.offsetWidth}px`;
      blob.style.transform = `translateX(${el.offsetLeft}px)`;
    };
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      sync();
      if (now - start < 700) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sync);
    };
  }, [current]);

  // macOS-style magnification: icons grow and lift near the mouse. Mouse only.
  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    ITEMS.forEach(({ id }) => {
      const el = itemRefs.current[id];
      const icon = iconRefs.current[id];
      if (!el || !icon) return;
      const r = el.getBoundingClientRect();
      const d = e.clientX - (r.left + r.width / 2);
      const s = 1 + 0.5 * Math.exp(-(d * d) / (2 * 52 * 52));
      icon.style.transform = `translateY(${-(s - 1) * 16}px) scale(${s})`;
    });
  };
  const resetIcons = () =>
    ITEMS.forEach(({ id }) => {
      const icon = iconRefs.current[id];
      if (icon) icon.style.transform = "";
    });

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-2"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.875rem)" }}
    >
      <nav
        aria-label="Primary"
        className={`dock dock-in pointer-events-auto relative rounded-full border border-white/15 bg-primary/80 p-1.5 shadow-[0_18px_50px_-12px_rgb(0_0_0/0.65)] backdrop-blur-xl transition-transform duration-500 motion-reduce:transition-none ${
          hidden ? "translate-y-[160%]" : "translate-y-0"
        }`}
        style={{ transitionTimingFunction: SPRING }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetIcons}
      >
        <ul ref={listRef} className="relative flex items-center">
          {/* sliding glow */}
          <span
            ref={blobRef}
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 rounded-full bg-accent shadow-lg shadow-accent/50 transition-[transform,width] duration-500 motion-reduce:transition-none"
            style={{ transitionTimingFunction: SPRING }}
          />

          {ITEMS.map(({ id, label }) => {
            const Icon = ICONS[id];
            const isActive = current === id;
            return (
              <li key={id}>
                <a
                  ref={(el) => (itemRefs.current[id] = el)}
                  href={`#${id}`}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative z-10 flex h-11 items-center rounded-full px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:px-3.5 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  <span
                    ref={(el) => (iconRefs.current[id] = el)}
                    className="flex transition-transform duration-150 ease-out will-change-transform motion-reduce:transition-none"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span
                    className={`overflow-hidden whitespace-nowrap text-xs font-semibold transition-[max-width,opacity,margin] duration-300 motion-reduce:transition-none sm:text-sm ${
                      isActive ? "ml-1.5 max-w-20 opacity-100 sm:ml-2 sm:max-w-24" : "ml-0 max-w-0 opacity-0"
                    }`}
                  >
                    {label}
                  </span>

                  {!isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-full left-1/2 mb-4 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    >
                      {label}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* scroll progress, tucked into the bottom edge of the pill */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 bottom-[3px] h-[2px] overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full origin-left rounded-full bg-white/70"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navigation;