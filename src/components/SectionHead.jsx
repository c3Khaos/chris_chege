import Reveal from "./Reveal";

// Every section opens the same way: a mono kicker, a headline that makes a claim,
// and one line underneath. Left aligned, big, and tight.
const SectionHead = ({ kicker, title, children }) => (
  <Reveal className="mb-12 max-w-3xl">
    <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-accent">
      {kicker}
    </p>
    <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
      {title}
    </h2>
    {children && (
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{children}</p>
    )}
  </Reveal>
);

export default SectionHead;