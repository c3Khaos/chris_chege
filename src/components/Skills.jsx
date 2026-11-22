import Reveal from "./Reveal";
import Chip from "./Chip";
import SectionHead from "./SectionHead";
import { skillGroups, projectsUsing } from "../data/profile";

const Skills = ({ activeSkill, onSelect }) => (
  <section id="skills" className="py-24">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHead kicker="02 / Skills" title="Skills that shipped.">
          A skill only counts if a project uses it. Click one to see which.
        </SectionHead>

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="brut h-full rounded-3xl bg-card p-6">
                <h3 className="mb-5 font-mono text-sm font-bold uppercase tracking-widest text-accent">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => {
                    const count = projectsUsing(skill).length;
                    const active = activeSkill === skill;
                    return (
                      <li key={skill}>
                        {count > 0 ? (
                          <Chip
                            active={active}
                            count={count}
                            onClick={() => onSelect(active ? null : skill)}
                          >
                            {skill}
                          </Chip>
                        ) : (
                          <span
                            title="No shipped project yet"
                            className="inline-block rounded-full border-2 border-dashed border-foreground/40 px-3.5 py-1.5 text-sm text-muted-foreground"
                          >
                            {skill}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs text-muted-foreground">
          Dashed = learning it, not shipped yet. The number = how many projects use it.
        </p>
      </div>
    </div>
  </section>
);

export default Skills;