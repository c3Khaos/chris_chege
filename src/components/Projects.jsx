import { ChevronDown, ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import Chip from "./Chip";
import SectionHead from "./SectionHead";
import TodoText from "./TodoText";
import { projects, knownSkills, projectsUsing } from "../data/profile";
import { IS_PROD, publicText } from "../lib/utils";

const FIELDS = [
  ["problem", "Problem"],
  ["decision", "Decision"],
  ["tradeoff", "Tradeoff"],
  ["result", "Result"],
];

// Only offer filters that actually match something.
const filterSkills = knownSkills.filter((s) => projectsUsing(s).length > 0);

const TILES = ["bg-tile-amber", "bg-tile-pink", "bg-tile-sky", "bg-tile-lime"];
const tileFor = (id) => TILES[Math.max(0, projects.findIndex((p) => p.id === id)) % TILES.length];

// The coloured tile on top of every card. With a screenshot it sits in a browser frame;
// without one, the monogram carries the tile on its own (no fake "screenshot goes here" box in prod).
const Tile = ({ project }) => {
  const n = String(projects.findIndex((p) => p.id === project.id) + 1).padStart(2, "0");
  return (
    <div className={`relative border-b-2 border-foreground p-5 ${tileFor(project.id)}`}>
      <span className="absolute left-5 top-4 font-mono text-xs font-bold">{n}</span>
      {project.image ? (
        <div className="brut-sm mt-5 overflow-hidden rounded-xl bg-card">
          <div className="flex gap-1.5 border-b-2 border-foreground px-3 py-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-foreground" />
            <span className="h-2.5 w-2.5 rounded-full border border-foreground" />
            <span className="h-2.5 w-2.5 rounded-full border border-foreground" />
          </div>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            width={800}
            height={450}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="flex aspect-video flex-col items-center justify-center">
          <span className="font-display text-7xl font-extrabold tracking-tighter md:text-8xl">
            {project.monogram}
          </span>
          {!IS_PROD && (
            <span className="mt-2 font-mono text-xs font-bold">screenshot goes here</span>
          )}
        </div>
      )}
    </div>
  );
};

// Live site: only rows that have real copy. Dev: every row, so gaps stay visible.
const caseFields = (data) =>
  FIELDS.filter(([key]) => !IS_PROD || publicText(data[key]));

const CaseStudy = ({ id, data, open }) => (
  <div
    id={`${id}-case`}
    aria-hidden={!open}
    className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
    }`}
  >
    <div className="overflow-hidden">
      <dl className="mt-4 space-y-3 border-t-2 border-foreground/15 pt-4 text-sm">
        {caseFields(data).map(([key, label]) => (
          <div key={key}>
            <dt className="mb-0.5 font-mono text-xs font-bold uppercase tracking-widest text-accent">
              {label}
            </dt>
            <dd className="text-card-foreground">
              <TodoText text={data[key]} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

const ProjectCard = ({ project, activeSkill, onSkillChange, open, onToggle }) => (
  <article
    id={`project-${project.id}`}
    className="brut flex h-full flex-col overflow-hidden rounded-3xl bg-card"
  >
    <Tile project={project} />

    <div className="flex flex-1 flex-col p-6">
      <h3 className="mb-2 font-display text-2xl font-extrabold tracking-tight text-card-foreground">{project.title}</h3>
      <p className="mb-4 text-muted-foreground">{project.summary}</p>

      <ul className="mb-4 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
        {project.stack.map((tech) => (
          <li key={tech}>
            <Chip
              size="sm"
              active={activeSkill === tech}
              onClick={() => onSkillChange(activeSkill === tech ? null : tech)}
            >
              {tech}
            </Chip>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="inline-flex items-center gap-1.5 font-bold text-accent hover:underline"
          >
            <GithubIcon className="h-4 w-4" /> Code
          </a>
        )}
        {!project.repo && project.private && (
          <a
            href="#contact"
            aria-label={`${project.title} source is private. Ask for a code walkthrough.`}
            className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground hover:text-accent hover:underline"
          >
            <Lock className="h-4 w-4" aria-hidden="true" /> Private repo: ask for a walkthrough
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="inline-flex items-center gap-1.5 font-bold text-accent hover:underline"
          >
            <ExternalLink className="h-4 w-4" /> Live demo
          </a>
        )}
        {caseFields(project.caseStudy).length > 0 && (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${project.id}-case`}
          className="ml-auto inline-flex items-center gap-1 rounded font-bold text-card-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Case study
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        )}
      </div>

      <CaseStudy id={project.id} data={project.caseStudy} open={open} />
    </div>
  </article>
);

const Projects = ({ activeSkill, onSkillChange, openId, onOpenChange }) => {
  const visible = activeSkill ? projectsUsing(activeSkill) : projects;

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHead kicker="03 / Projects" title="Work, and the decisions behind it.">
            Every card opens into the problem, the decision and the tradeoff. Filter by
            skill to see what actually backs a claim.
          </SectionHead>

          <div
            role="group"
            aria-label="Filter projects by skill"
            className="mb-4 flex flex-wrap gap-3"
          >
            <Chip active={!activeSkill} onClick={() => onSkillChange(null)}>
              All
            </Chip>
            {filterSkills.map((skill) => (
              <Chip
                key={skill}
                active={activeSkill === skill}
                count={projectsUsing(skill).length}
                onClick={() => onSkillChange(activeSkill === skill ? null : skill)}
              >
                {skill}
              </Chip>
            ))}
          </div>

          <p
            aria-live="polite"
            className="mb-8 mt-6 font-mono text-xs text-muted-foreground"
          >
            Showing {visible.length} of {projects.length}
            {activeSkill && (
              <>
                {" "}
                using <strong className="text-foreground">{activeSkill}</strong>
              </>
            )}
          </p>

          <ul className="grid gap-10 md:grid-cols-2">
            {visible.map((project, i) => (
              <Reveal as="li" key={project.id} delay={i * 80}>
                <ProjectCard
                  project={project}
                  activeSkill={activeSkill}
                  onSkillChange={onSkillChange}
                  open={openId === project.id}
                  onToggle={() =>
                    onOpenChange(openId === project.id ? null : project.id)
                  }
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;