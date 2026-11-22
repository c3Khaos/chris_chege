// Single source of truth. Components render this; they never hardcode content.
//
// Unfinished copy contains a "TODO:" marker. Everything before the marker renders
// as normal copy; the marker and what follows render as an amber-badged prompt.
// In dev, the console also tells you what's left (see the bottom of this file).
//
// Conventions:
//   - Absent optional fields are `null`, never "" (repo, live, image).
//   - A null repo/live simply hides that button. A wrong link is worse than no link.
//   - `private: true` (with a null repo) shows "Private repo: ask for a walkthrough".
//   - A project's `stack` strings must match a skill in `skillGroups` exactly.

export const profile = {
  name: "Christopher Chege",
  initials: "CC",
  role: "Full-stack developer",
  tagline: "I build full-stack web apps with React and Flask.",
  intro:
    "A real client in Nairobi uses the POS I built. Each project below comes with the decisions behind it, not just a screenshot. Or skip the scroll and talk to the terminal.",
  aboutIntro:
    "I'm Christopher, a full-stack developer working in React and Python (Flask). The short version of how I got here is below.",
  email: "d3v.chris@gmail.com",
  links: {
    github: "https://github.com/c3Khaos",
    linkedin: "https://linkedin.com/in/dev-chris-chege",
  },
  resume: { href: "/chris_Resume.pdf", filename: "Chege_Resume.pdf" },
};

// Proof strip under the hero buttons. Facts only, nothing aspirational.
export const proof = [
  { label: "Live", detail: "POS used by a real client in Nairobi" },
  { label: "Payments", detail: "Safaricom STK push and C2B" },
  { label: "Stack", detail: "React, Flask, SQLAlchemy" },
];

// Order here = order on the page = order of the nav.
export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

// Your story. Specific beats impressive.
export const story = [
  {
    id: "first",
    label: "First build",
    title: "The first thing I built",
    body: "The first thing I built was a point-of-sale system for Kenyan SMEs, starting in early 2025. TODO: Why that one? What did you see at the client's shop that made you build it?",
  },
  {
    id: "broke",
    label: "What broke",
    title: "The thing that broke",
    body: "My failure was integrating payments: connecting the POS to Safaricom (STK push and C2B) and Kopo Kopo merchants. During early testing I used ngrok to expose my callback URL from localhost. At one point I got duplicate payments, and I fixed it by giving every sale a unique random UUID. TODO: Why did the duplicate happen? (Did the same callback arrive twice? A retry? A double tap?) Say what you found, not what you guessed.",
  },
  {
    id: "learned",
    label: "What I learned",
    title: "What it changed",
    body: "Automating the process made things easier and left less room for mistakes. TODO: Make it concrete. What did people do by hand before (the book records?) that is now automatic, and which mistake can no longer happen?",
  },
];

// A skill is "proven" only if a project's `stack` contains the exact same string.
// Skills with zero matching projects render dashed (learning, not shipped).
export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "JavaScript", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Backend & data",
    skills: [
      "Python",
      "Flask-RESTful",
      "SQLAlchemy",
      "REST APIs",
      "Payment integrations",
      "PostgreSQL",
    ],
  },
  {
    title: "Tooling & design",
    skills: ["Git", "Figma"],
  },
];

export const knownSkills = skillGroups.flatMap((g) => g.skills);

// The React + Flask stack shared by the store and the POS.
const WEB_APP_STACK = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Python",
  "Flask-RESTful",
  "SQLAlchemy",
  "REST APIs",
  "Git",
];

// Case study fields: problem, decision, tradeoff, result.
// image: put a screenshot in /public/projects/ and set e.g. "/projects/pos.png".
// Order = order on the page. Lead with your strongest work.
export const projects = [
  {
    id: "pos",
    title: "POS for Kenyan SMEs",
    monogram: "POS",
    summary:
      "SaaS point of sale for Kenyan SMEs: sales, stock, profit tracking, and payment integrations with Safaricom (STK push and C2B) and Kopo Kopo merchants.",
    stack: [...WEB_APP_STACK, "Payment integrations"],
    repo: null,
    private: true, // code is private: card shows "Private repo: ask for a walkthrough"
    live: null,
    image: null,
    caseStudy: {
      problem:
        "Before the POS, the client kept their records in books. TODO: What was failing for them? (Lost pages? Wrong profit? Hours spent adding up at night?)",
      decision:
        "Every sale gets a unique random UUID, added after I got duplicate payments. TODO: How does the UUID stop a duplicate? (Is it the reference sent with the payment request, and does your callback check it?) And is profit computed on write or on read, and why?",
      tradeoff:
        "TODO: What did you give up? (Offline mode? Multiple shops? Refunds?) Name it plainly.",
      result:
        "In use by a real client in Nairobi, replacing their book records. Development started in early 2025. TODO: What number backs it? (Sales per day, products tracked, hours saved.)",
    },
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    monogram: "EC",
    summary:
      "Storefront with checkout and product management, backed by a Flask REST API.",
    stack: [...WEB_APP_STACK],
    repo: null,
    live: null,
    image: null,
    caseStudy: {
      problem:
        "TODO: Who was this store for, and what did they need that a template couldn't do?",
      decision:
        "React front end talking to a Flask REST API over JSON, with SQLAlchemy models underneath, so the UI and the data layer can change without breaking each other.",
      tradeoff:
        "TODO: What did you give up? (No real payments? No auth hardening? No tests?) Name it plainly.",
      result:
        "TODO: One number or one outcome: products, orders, load time, or what you'd do differently.",
    },
  },
  {
    id: "school-cli",
    title: "School Management CLI",
    monogram: "CLI",
    summary:
      "Command-line school manager: register students, record grades, persist everything with the SQLAlchemy ORM.",
    stack: ["Python", "SQLAlchemy", "Git"],
    repo: null,
    live: null,
    image: null,
    caseStudy: {
      problem:
        "Built as a school project. TODO: What did the assignment ask for, and what did you add yourself?",
      decision:
        "SQLAlchemy ORM for persistence, driven entirely from the command line: no web layer to hide behind.",
      tradeoff:
        "TODO: What did a CLI cost you compared to a web UI, and why was it still the right call?",
      result:
        "It lives on GitHub as a learning project and taught me more about Python, including its environments and variables. TODO: Name two concepts that actually stuck, in plain words.",
    },
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    monogram: "</>",
    summary:
      "This site. A terminal that navigates it, skills that filter the projects, and a case study behind every card.",
    stack: ["React", "JavaScript", "Tailwind CSS", "Responsive Design", "Git"],
    repo: null,
    live: null,
    image: null,
    caseStudy: {
      problem:
        "A portfolio that says 'passionate developer' and shows nothing proves nothing. The site itself should be the evidence.",
      decision:
        "A skill only counts as proven if a project uses it. Everything else is marked as not yet shipped.",
      tradeoff:
        "A terminal is a gimmick for visitors who don't type commands, so every command also has a clickable shortcut.",
      result:
        "TODO: Add your Lighthouse scores and one piece of real feedback from a real person.",
    },
  },
];

export const projectsUsing = (skill) =>
  projects.filter((p) => p.stack.includes(skill));

// ---------------------------------------------------------------------------
// Guards. These only talk to the console; they never break the page.
// ---------------------------------------------------------------------------

// A typo in a stack entry silently breaks proof counts and filters, so always warn.
const unknownTech = projects.flatMap((p) =>
  p.stack.filter((s) => !knownSkills.includes(s)).map((s) => `${p.id}: "${s}"`)
);
if (unknownTech.length) {
  console.warn("[profile] stack entries missing from skillGroups:", unknownTech);
}

// Dev-only reminders of what's still unfinished.
if (import.meta.env?.DEV) {
  const unfinished = [
    ...story.map((s) => s.body),
    ...projects.flatMap((p) => Object.values(p.caseStudy)),
  ].filter((text) => /\bTODO\b/.test(text)).length;
  const noRepo = projects.filter((p) => !p.repo && !p.private).map((p) => p.id);

  if (unfinished) console.info(`[profile] ${unfinished} TODO field(s) left to write.`);
  if (noRepo.length) console.info(`[profile] no repo link yet: ${noRepo.join(", ")}`);
}