import Button from "./Button";
import Terminal from "./Terminal";
import { profile, proof } from "../data/profile";

// Proof tiles take a flat colour each, in order.
const PROOF_TILES = ["bg-tile-pink", "bg-tile-lime", "bg-tile-sky"];

const Hero = ({ onGoto, onFilter, onOpen }) => (
  <section id="hero" className="relative isolate overflow-hidden">
    <div className="container mx-auto flex min-h-screen flex-col justify-center px-4 pb-32 pt-12">
      <div className="mb-5 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <span>{profile.role}</span>
        <span>Nairobi, Kenya</span>
      </div>

      <h1 className="animate-fade-in font-display text-[14vw] font-extrabold leading-[0.85] tracking-tighter text-foreground motion-reduce:animate-none sm:text-[9vw] lg:text-[min(9vw,9rem)]">
        Christopher <span className="block text-accent sm:inline">Chege</span>
      </h1>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div>
          <p className="mb-4 max-w-xl font-display text-2xl font-bold leading-snug text-foreground md:text-3xl">
            {profile.tagline}
          </p>
          <p className="mb-8 max-w-xl text-lg text-muted-foreground">{profile.intro}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button as="a" href="#projects">
              See the projects
            </Button>
            <Button as="a" href="#contact" variant="ghost">
              Get in touch
            </Button>
          </div>

          <dl className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3">
            {proof.map(({ label, detail }, i) => (
              <div
                key={label}
                className={`brut-sm rounded-2xl p-3 ${PROOF_TILES[i % PROOF_TILES.length]}`}
              >
                <dt className="mb-1 font-mono text-xs font-bold uppercase tracking-wide">
                  {label}
                </dt>
                <dd className="text-sm font-medium leading-snug">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <Terminal onGoto={onGoto} onFilter={onFilter} onOpen={onOpen} />
          <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
            Real terminal behaviour: Tab completes, Up recalls. Try{" "}
            <code className="font-bold text-accent">sudo hire me</code>.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;