const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
      title: "Backend & Tools",
      skills: ["Python", "Git", "REST APIs", "PostgreSQL", "SqlAlchemy"]
    },
    {
      title: "Design & UX",
      skills: ["Figma", "UI/UX Design", "Responsive Design", "Prototyping"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-center text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A diverse set of skills to bring your vision to life
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-xl mb-4 text-primary">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
