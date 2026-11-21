import Button from "./Button";
import Terminal from "./Terminal";
import { profile } from "../data/profile";

const Hero = ({ onGoto, onFilter, onOpen }) => (
  <section id="hero" className="relative isolate overflow-hidden bg-primary text-white">
    <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />

    <div className="container mx-auto grid min-h-screen items-center gap-12 px-4 pb-20 pt-28 lg:grid-cols-2">
      <div className="animate-fade-in motion-reduce:animate-none">
        <p className="mb-4 font-mono text-sm tracking-wide text-accent">
          {profile.role.toLowerCase()}
        </p>
        <h1 className="mb-6 font-display text-5xl font-bold md:text-6xl">
          {profile.name}
        </h1>
        <p className="mb-4 max-w-xl text-xl font-light text-white/90 md:text-2xl">
          {profile.tagline}
        </p>
        <p className="mb-8 max-w-xl text-white/70">{profile.intro}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button as="a" href="#projects">
            See the projects
          </Button>
          <Button as="a" href="#contact" variant="ghost">
            Get in touch
          </Button>
        </div>
      </div>

      <div>
        <Terminal onGoto={onGoto} onFilter={onFilter} onOpen={onOpen} />
        <p className="mt-3 text-center font-mono text-xs text-white/50">
          Real terminal behaviour: Tab completes, Up recalls. Try{" "}
          <code className="text-accent">sudo hire me</code>.
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
