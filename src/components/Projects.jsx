import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A scalable e-commerce web application with a seamless shopping experience, secure transactions, and real-time product management.",
    tech: ["React", "HTML", "CSS", "JavaScript","tailwindcss","Python", "Flask-RESTful", "SQLAlchemy"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
  },
  {
    title: "Point of Sale (POS) System",
    description:
      "A complete POS solution for retail businesses featuring sales tracking, product inventory, and daily profit analysis through a user-friendly dashboard.",
    tech: ["React", "HTML","Tailwindcss","CSS", "JavaScript","Python", "Flask-RESTful", "SQLAlchemy"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
  },
  {
    title: "School Management CLI",
    description:
      "A command-line based school management system for handling student registration, grading, and data persistence using SQLAlchemy ORM.",
    tech: ["Python", "Flask-RESTful", "SQLAlchemy"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
  }
];


  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-center text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A selection of my recent work showcasing various skills and technologies
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      <Github className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
