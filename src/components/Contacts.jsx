import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import Button from "./Button";
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

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

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
    <section id="contact" className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-6 text-center font-display text-4xl font-bold text-foreground md:text-5xl">
              Let's talk
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
              Hiring for a junior role, need a freelance build, or want to talk code?
              Email is the fastest way to reach me.
            </p>
          </Reveal>

          <Reveal className="grid gap-10 rounded-lg bg-card p-8 shadow-xl md:grid-cols-2">
            <div>
              <ul className="space-y-2">
                {socials.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-secondary"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent/20">
                        <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-muted-foreground">
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
                <label htmlFor="contact-name" className="mb-1 block text-sm font-semibold text-card-foreground">
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
                <label htmlFor="contact-message" className="mb-1 block text-sm font-semibold text-card-foreground">
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
