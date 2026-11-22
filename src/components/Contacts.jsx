import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import Button from "./Button";
import SectionHead from "./SectionHead";
import { profile } from "../data/profile";

const socials = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: profile.links.linkedin.replace("https://", ""),
    href: profile.links.linkedin,
    external: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: profile.links.github.replace("https://", ""),
    href: profile.links.github,
    external: true,
  },
];

const SOCIAL_TILES = ["bg-tile-amber", "bg-tile-sky", "bg-tile-pink"];

const inputClass =
  "w-full rounded-xl border-2 border-foreground bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const Contacts = () => {
  const [status, setStatus] = useState(null); // null | "copied" | "failed"
  const [form, setForm] = useState({ name: "", message: "" });
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), 2500);
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // No backend yet: this opens the visitor's mail app with everything filled in.
  // TODO: swap for Formspree / Resend / your own endpoint when you want real form delivery.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <SectionHead kicker="05 / Contact" title="Let's build yours.">
            Need a system for your business, hiring for a junior role, or want to talk
            code? Email is the fastest way to reach me.
          </SectionHead>

          <Reveal className="grid gap-10 brut rounded-3xl bg-card p-8 md:grid-cols-2 md:p-10">
            <div>
              <ul className="space-y-2">
                {socials.map(({ icon: Icon, label, value, href, external }, i) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span className={`brut-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${SOCIAL_TILES[i % SOCIAL_TILES.length]}`}>
                        <Icon className="h-6 w-6 text-foreground" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {label}
                        </span>
                        <span className="block truncate text-sm text-card-foreground">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 px-3">
                <Button variant="outline" onClick={copyEmail} className="w-full sm:w-auto">
                  {status === "copied" ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Copy className="h-5 w-5" aria-hidden="true" />
                  )}
                  Copy email
                </Button>
                <p role="status" aria-live="polite" className="mt-2 h-5 text-sm text-muted-foreground">
                  {status === "copied" && "Copied to clipboard."}
                  {status === "failed" && "Couldn't copy. Select the address above instead."}
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-bold text-card-foreground">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="name"
                  value={form.name}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-bold text-card-foreground">
                  What do you need?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={1500}
                  value={form.message}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-5 w-5" aria-hidden="true" />
                Write the email
              </Button>
              <p className="text-xs text-muted-foreground">
                Opens your email app with the message filled in. Nothing is stored.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contacts;