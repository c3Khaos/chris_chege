import { Download } from "lucide-react";
import Reveal from "./Reveal";
import Button from "./Button";
import { profile } from "../data/profile";

const Resume = () => (
  <section id="resume" className="py-20">
    <div className="container mx-auto px-4">
      <Reveal className="brut mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-3xl bg-tile-amber p-8 md:flex-row md:items-center md:p-12">
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest">
            04 / Resume
          </p>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            The short version.
          </h2>
          <p className="mt-4 max-w-md text-lg">Everything on this page, on one page.</p>
        </div>
        <Button as="a" href={profile.resume.href} download={profile.resume.filename} variant="ghost">
          <Download className="h-5 w-5" aria-hidden="true" />
          Download PDF
        </Button>
      </Reveal>
    </div>
  </section>
);

export default Resume;