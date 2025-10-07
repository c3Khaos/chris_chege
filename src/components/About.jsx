import { Code, Palette, Zap } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time"
    },
    {
      icon: Palette,
      title: "Design First",
      description: "Creating intuitive interfaces with attention to every detail"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Building fast, optimized experiences for all users"
    }
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-center text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            I'm a passionate developer and designer dedicated to creating exceptional digital experiences. 
            With a keen eye for design and a love for clean code, I bring ideas to life through modern 
            web technologies.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index} 
                  className="bg-card rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
