import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile";

const Footer = () => (
  <footer className="border-t-2 border-foreground bg-foreground pb-28 pt-10 text-background">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm sm:flex-row">
      <p className="font-mono text-background/80">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a
        href="#hero"
        className="inline-flex items-center gap-1.5 font-semibold text-background/80 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tile-sky"
      >
        Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  </footer>
);

export default Footer;