// Single source of truth. Components render this; they never hardcode content.
// Search this file for "TODO" to find everything that still needs your own words.
// Anything that starts with "TODO" renders with a visible amber badge on the site,
// so you cannot ship it by accident.

export const profile = {
  name: "Christopher Chege",
  initials: "CC",
  role: "Full-stack developer",
  tagline: "I build full-stack web apps with React and Flask.",
  intro:
    "Four projects below, each with the decisions behind it, not just a screenshot. Or skip the scroll and talk to the terminal.",
  aboutIntro:
    "I'm Christopher, a full-stack developer working in React and Python (Flask). The short version of how I got here is below, in three parts.",
  email: "d3v.chris@gmail.com",
  links: {
    github: "https://github.com/c3Khaos",
    linkedin: "https://linkedin.com/in/dev-chris-chege",
  },
  resume: { href: "/chris_Resume.pdf", filename: "Chege_Resume.pdf" },
};

// Order here = order on the page = order of the nav.
export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

// Your story. Specific beats impressive. Replace every TODO.
export const story = [
  {
    id: "first",
    label: "First build",
    title: "The first thing I built",
    body: "TODO: What was it, when, and why that thing? Name the tool and the year. Two sentences, no adjectives.",
  },
  {
    id: "broke",
    label: "What broke",
    title: "The thing that broke",
    body: "TODO: One real failure: a bug that ate a day, a deploy that died, a design you had to throw away. What was it?",
  },
  {
    id: "learned",
    label: "What I learned",
    title: "What it changed",
    body: "TODO: How does that failure change the way you work now? Be specific enough that only you could have written it.",
  },
];

// A skill is only "proven" if a project's `stack` contains the exact same string.
// Skills with zero matching projects render as dashed (learning, not shipped).
export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "JavaScript", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Backend & data",
    skills: ["Python", "Flask-RESTful", "SQLAlchemy", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Tooling & design",
    skills: ["Git", "Figma"],
  },
];

export const knownSkills = skillGroups.flatMap((g) => g.skills);

// Case study fields: problem, decision, tradeoff, result.
// `image`: drop a screenshot in /public/projects/ and set e.g. "/projects/pos.png".
// `live`: leave "" until there is a deployed URL; the button simply won't render.
export const projects = [
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    monogram: "EC",
    summary:
      "Storefront with checkout and product management, backed by a Flask REST API.",
    stack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Python",
      "Flask-RESTful",
      "SQLAlchemy",
      "REST APIs",
      "Git",
    ],
    repo: "https://github.com/c3Khaos", // TODO: link the actual repo
    live: "",
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
    id: "pos",
    title: "Point of Sale (POS) System",
    monogram: "POS",
    summary:
      "Point of sale for a retail shop: record sales, track stock, and see daily profit on a dashboard.",
    stack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Python",
      "Flask-RESTful",
      "SQLAlchemy",
      "REST APIs",
      "Git",
    ],
    repo: "https://github.com/c3Khaos", // TODO: link the actual repo
    live: "",
    image: null,
    caseStudy: {
      problem:
        "Retail shops often track sales, stock and profit in separate places. This puts them behind one login and one dashboard.",
      decision:
        "TODO: The decision that shaped this project. (How did you model stock vs sales? Is profit computed on write or on read, and why?)",
      tradeoff:
        "TODO: What did you give up? (Offline mode? Multiple shops? Refunds?) Name it plainly.",
      result:
        "TODO: One number or one outcome. Did a real shop use it? What broke when they did?",
    },
  },
  {
    id: "school-cli",
    title: "School Management CLI",
    monogram: "CLI",
    summary:
      "Command-line school manager: register students, record grades, persist everything with the SQLAlchemy ORM.",
    stack: ["Python", "SQLAlchemy", "Git"],
    repo: "https://github.com/c3Khaos", // TODO: link the actual repo
    live: "",
    image: null,
    caseStudy: {
      problem:
        "TODO: What was the actual problem? (Who needed to manage students, and what did they use before?)",
      decision:
        "SQLAlchemy ORM for persistence, driven entirely from the command line: no web layer to hide behind.",
      tradeoff:
        "TODO: What did a CLI cost you compared to a web UI, and why was it still the right call?",
      result:
        "TODO: What does it handle today, and what is the first thing you'd fix?",
    },
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    monogram: "</>",
    summary:
      "This site. A terminal that navigates it, skills that filter the projects, and a case study behind every card.",
    stack: ["React", "JavaScript", "Tailwind CSS", "Responsive Design", "Git"],
    repo: "https://github.com/c3Khaos", // TODO: link the actual repo
    live: "",
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
