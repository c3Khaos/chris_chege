// Pure command logic for the hero terminal. No React in here, so it is easy to test.
import {
  profile,
  projects,
  sections,
  knownSkills,
  projectsUsing,
} from "../data/profile";

const out = (text) => ({ kind: "out", text });
const ok = (text) => ({ kind: "ok", text });
const err = (text) => ({ kind: "err", text });

export const COMMAND_NAMES = [
  "help",
  "whoami",
  "projects",
  "open",
  "skills",
  "filter",
  "goto",
  "contact",
  "clear",
  "sudo",
];

const findSkill = (query) => {
  const q = query.toLowerCase();
  return (
    knownSkills.find((s) => s.toLowerCase() === q) ??
    knownSkills.find((s) => s.toLowerCase().startsWith(q))
  );
};

const findProject = (query) => {
  const n = Number(query);
  if (Number.isInteger(n) && n >= 1 && n <= projects.length) return projects[n - 1];
  const q = query.toLowerCase();
  return projects.find(
    (p) => p.id === q || p.title.toLowerCase().includes(q)
  );
};

/**
 * Returns an array of output lines, or null to signal "clear the screen".
 * Side effects (scrolling, filtering) go through the handlers you pass in.
 */
export function runCommand(raw, { onGoto, onFilter, onOpen }) {
  const [name = "", ...rest] = raw.trim().split(/\s+/);
  const arg = rest.join(" ").trim();

  switch (name.toLowerCase()) {
    case "help":
      return [
        out("commands:"),
        out("  whoami            who I am"),
        out("  projects          list my projects"),
        out("  open <n|name>     open a project's case study"),
        out("  skills            list skills and what backs them"),
        out("  filter <skill>    filter projects ('filter clear' resets)"),
        out("  goto <section>    about | skills | projects | resume | contact"),
        out("  contact           how to reach me"),
        out("  clear             clear the screen"),
        out("tip: Tab completes, Up/Down recalls history."),
      ];

    case "whoami":
      return [
        out(profile.name),
        out(profile.role),
        out(`${projects.length} projects. React + Flask. One terminal that doubles as the nav.`),
        out("type 'projects' to see them."),
      ];

    case "projects":
      return [
        ...projects.map((p, i) => out(`${i + 1}  ${p.title}`)),
        out("type 'open <n>' for the case study."),
      ];

    case "open": {
      if (!arg) return [err("usage: open <number|name>")];
      const project = findProject(arg);
      if (!project) return [err(`no project matches '${arg}'. try 'projects'.`)];
      onOpen(project.id);
      return [ok(`opening ${project.title}...`)];
    }

    case "skills":
      return [
        ...knownSkills.map((s) => {
          const n = projectsUsing(s).length;
          return out(`${n ? "[x]" : "[ ]"} ${s}${n ? ` (${n})` : ""}`);
        }),
        out("[x] used in a project   [ ] learning, nothing shipped yet"),
      ];

    case "filter": {
      if (!arg) return [err("usage: filter <skill> | filter clear")];
      if (arg.toLowerCase() === "clear") {
        onFilter(null);
        return [ok("filter cleared.")];
      }
      const skill = findSkill(arg);
      if (!skill) return [err(`unknown skill '${arg}'. try 'skills'.`)];
      const n = projectsUsing(skill).length;
      if (!n) return [out(`no shipped project uses ${skill} yet. that's the honest answer.`)];
      onFilter(skill);
      return [ok(`showing ${n} project${n > 1 ? "s" : ""} using ${skill}.`)];
    }

    case "goto": {
      const target = arg.toLowerCase();
      const id =
        target === "top" || target === "home"
          ? "hero"
          : sections.find((s) => s.id === target)?.id;
      if (!id) {
        return [err(`unknown section '${arg}'. try: ${sections.map((s) => s.id).join(" | ")}`)];
      }
      onGoto(id);
      return [ok(`scrolling to ${id}...`)];
    }

    case "contact":
      return [
        out(`email     ${profile.email}`),
        out(`github    ${profile.links.github}`),
        out(`linkedin  ${profile.links.linkedin}`),
      ];

    case "clear":
      return null;

    case "sudo":
      if (arg.toLowerCase() === "hire me") {
        onGoto("contact");
        return [ok("[sudo] permission granted. good call."), ok("scrolling to contact...")];
      }
      return [err("guest is not in the sudoers file. This incident will be reported.")];

    default:
      return [err(`command not found: ${name}. type 'help'.`)];
  }
}
