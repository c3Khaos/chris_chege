import { Download } from "lucide-react";
import Reveal from "./Reveal";
import Button from "./Button";
import { profile } from "../data/profile";

const Resume = () => (
  <section id="resume" className="bg-background py-20">
    <div className="container mx-auto px-4">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
          Resume
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          The short version of everything on this page.
        </p>
        <Button
          as="a"
          href={profile.resume.href}
          download={profile.resume.filename}
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          Download PDF
        </Button>
      </Reveal>
    </div>
  </section>
);

export default Resume;
