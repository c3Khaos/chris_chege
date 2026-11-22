import { useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TodoText from "./TodoText";
import { profile, story } from "../data/profile";

// One flat tile colour per story step.
const STORY_TILES = ["bg-tile-sky", "bg-tile-pink", "bg-tile-lime"];

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
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <SectionHead kicker="01 / About" title="Learned it the hard way.">
            {profile.aboutIntro}
          </SectionHead>

          <Reveal className="grid gap-6 md:grid-cols-[15rem_1fr]">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="My story"
              onKeyDown={onKeyDown}
              className="flex gap-3 md:flex-col"
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
                  className={`brut-chip flex-1 rounded-2xl px-4 py-3 text-left text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:flex-none ${
                    i === index ? "bg-foreground text-background" : "bg-card text-card-foreground"
                  }`}
                  style={i === index ? { transform: "translate(2px, 2px)", boxShadow: "none" } : undefined}
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
              className={`brut rounded-3xl p-8 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-10 ${STORY_TILES[index % STORY_TILES.length]}`}
            >
              <h3 className="mb-4 font-display text-3xl font-extrabold tracking-tight">
                {current.title}
              </h3>
              <p className="text-lg leading-relaxed">
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