import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Contacts = () => {
  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "d3v.chris@gmail.com",
      href: "mailto:d3v.chris@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/dev-chris-chege",
      href: "https://linkedin.com/in/dev-chris-chege"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/c3Khaos",
      href: "https://github.com/c3Khaos"
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-center text-foreground">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you. Let's create something amazing together.
          </p>
          
          <div className="bg-card rounded-lg shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground">{link.label}</p>
                      <p className="text-sm text-card-foreground">{link.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.location.href = 'mailto:hello@christopherchege.com'}
                className="min-w-[200px] px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Send Me an Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
