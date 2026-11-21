import { useRef, useState } from "react";
import Reveal from "./Reveal";
import TodoText from "./TodoText";
import { profile, story } from "../data/profile";

const About = () => {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef([]);
  const current = story[index];

  // Roving tabindex + arrow keys, the standard keyboard pattern for tabs.
  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next;
    if (step) next = (index + step + story.length) % story.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = story.length - 1;
    else return;
    e.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="about" className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-6 text-center font-display text-4xl font-bold text-foreground md:text-5xl">
              About
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
              {profile.aboutIntro}
            </p>
          </Reveal>

          <Reveal className="grid gap-6 md:grid-cols-[14rem_1fr]">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="My story"
              onKeyDown={onKeyDown}
              className="flex gap-2 md:flex-col"
            >
              {story.map((step, i) => (
                <button
                  key={step.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`story-tab-${i}`}
                  aria-selected={i === index}
                  aria-controls="story-panel"
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={`flex-1 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none md:flex-none ${
                    i === index
                      ? "bg-accent text-white shadow-lg"
                      : "bg-card text-card-foreground hover:text-accent"
                  }`}
                >
                  <span className="mr-2 font-mono opacity-70">0{i + 1}</span>
                  {step.label}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id="story-panel"
              aria-labelledby={`story-tab-${index}`}
              tabIndex={0}
              className="rounded-lg bg-card p-8 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <h3 className="mb-4 font-display text-2xl font-semibold text-card-foreground">
                {current.title}
              </h3>
              <p className="text-lg leading-relaxed text-card-foreground">
                <TodoText text={current.body} />
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
