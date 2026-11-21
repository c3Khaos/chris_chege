import Reveal from "./Reveal";
import Chip from "./Chip";
import { skillGroups, projectsUsing } from "../data/profile";

const Skills = ({ activeSkill, onSelect }) => (
  <section id="skills" className="bg-background py-24">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-6 text-center font-display text-4xl font-bold text-foreground md:text-5xl">
            Skills
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
            A skill only counts if a project uses it. Click one to see which.
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <h3 className="mb-4 text-xl font-semibold text-primary">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
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
                          className="inline-block rounded-md border border-dashed border-border px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          {skill}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Dashed means I'm learning it and haven't shipped it yet. The number is how
          many projects use it.
        </p>
      </div>
    </div>
  </section>
);

export default Skills;
