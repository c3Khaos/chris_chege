import { useState } from "react";
import "./portfolio.css";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

import useScrollSpy from "./hooks/useScrollSpy";
import { sections } from "./data/profile";
import { scrollToId } from "./lib/utils";

// Module-level so the array identity is stable across renders.
const SPY_IDS = ["hero", ...sections.map((s) => s.id)];

export default function App() {
  // Lifted state: the terminal, the skill chips and the project cards all drive each other.
  const [activeSkill, setActiveSkill] = useState(null);
  const [openId, setOpenId] = useState(null);
  const active = useScrollSpy(SPY_IDS);

  // Picking a skill from the Skills section or the terminal jumps to the matching projects.
  const selectSkill = (skill) => {
    setActiveSkill(skill);
    if (skill) scrollToId("projects");
  };

  const openProject = (id) => {
    setActiveSkill(null);
    setOpenId(id);
    // Wait a tick so the card exists in the DOM if the filter was just cleared.
    setTimeout(() => scrollToId(`project-${id}`), 80);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-accent px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Navigation active={active === "hero" ? null : active} />

      <main id="main">
        <Hero onGoto={scrollToId} onFilter={selectSkill} onOpen={openProject} />
        <About />
        <Skills activeSkill={activeSkill} onSelect={selectSkill} />
        <Projects
          activeSkill={activeSkill}
          onSkillChange={setActiveSkill}
          openId={openId}
          onOpenChange={setOpenId}
        />
        <Resume />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}
