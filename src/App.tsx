import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Values from "./components/Values";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Clients from "./components/Clients";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [currentSection, setCurrentSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently on screen
      const sections = [
        "inicio",
        "quem-somos",
        "equipa",
        "valores",
        "servicos",
        "honorarios",
        "clientes",
        "galeria",
        "contactos"
      ];

      const scrollPosition = window.scrollY + 200; // Offset for navbar height and visual triggers

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Execute initially to check position on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="full-page-container" className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-slate-50 selection:bg-brand-orange selection:text-brand-dark">
      {/* Dynamic Header Navbar sticky */}
      <Navbar currentSection={currentSection} />

      {/* Main Blocks */}
      <main className="flex-grow">
        {/* Custom Hero Presentation */}
        <Hero />

        {/* Quem Somos - Corporate presentation, history */}
        <About />

        {/* Equipa - Team members, expertise cards */}
        <Team />

        {/* Valores corporativos - Ethics, Integrity, Excellence */}
        <Values />

        {/* Services Section - Contabilidade, Fiscalidade, RH, Adm */}
        <Services />

        {/* Pricing Estimator Simulator & Terms */}
        <Pricing />

        {/* Real Clients - Auto Loop Marquee, structured Grid */}
        <Clients />

        {/* Galeria - Visual portfolio, events, spaces */}
        <Gallery />

        {/* Contacts section - Offline variables, Map, Submit form */}
        <Contact />
      </main>

      {/* Corporate detailed footer */}
      <Footer />
    </div>
  );
}
