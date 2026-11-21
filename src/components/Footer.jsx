import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile";

const Footer = () => (
  <footer className="bg-primary py-8 text-white">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm sm:flex-row">
      <p className="text-white/80">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a
        href="#hero"
        className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  </footer>
);

export default Footer;
