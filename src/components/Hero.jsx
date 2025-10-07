import { ArrowDown } from "lucide-react";
import heroBg from "../assets/hero-bg.jpeg";

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/80" />
      </div>
      
      <div className="container relative z-10 px-4 py-32 mx-auto text-center">
        <div className="animate-fade-in">
          <p className="text-accent text-lg font-medium mb-4 tracking-wide uppercase">
            Welcome to my portfolio
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
            Christopher Chege
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            Creative Developer & Designer crafting beautiful digital experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection("projects")}
              className="min-w-[200px] px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="min-w-[200px] px-8 py-3 bg-white/10 text-white border border-white/30 font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
