import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSiteData } from "./contexts/SiteDataContext";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Values from "./components/Values";
import Services from "./components/Services";
import Academy from "./components/Academy";
import Pricing from "./components/Pricing";
import Clients from "./components/Clients";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [currentSection, setCurrentSection] = useState("inicio");
  const { sections } = useSiteData();

  const visible = (key: string) => sections[key] !== false;

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently on screen
      const sections = [
        "inicio",
        "quem-somos",
        "equipa",
        "valores",
        "servicos",
        "academia",
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
    <>
      <Helmet>
        <title>IS KENDA — Consultoria & Academia</title>
      </Helmet>
      <div id="full-page-container" className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-slate-50 selection:bg-brand-orange selection:text-brand-dark">
      {/* Topbar — contactos e redes sociais */}
      <Topbar />

      {/* Dynamic Header Navbar sticky */}
      <Navbar currentSection={currentSection} />

      {/* Main Blocks */}
      <main className="flex-grow">
        {/* Custom Hero Presentation */}
        {visible("inicio") && <Hero />}

        {/* Quem Somos - Corporate presentation, history */}
        {visible("quem-somos") && <About />}

        {/* Equipa - Team members, expertise cards */}
        {visible("equipa") && <Team />}

        {/* Valores corporativos - Ethics, Integrity, Excellence */}
        {visible("valores") && <Values />}

        {/* Services Section - Contabilidade, Fiscalidade, RH, Adm */}
        {visible("servicos") && <Services />}

        {/* Academy Section - Formação e Estágio Profissional */}
        {visible("academia") && <Academy />}

        {/* Pricing Estimator Simulator & Terms */}
        {visible("honorarios") && <Pricing />}

        {/* Real Clients - Auto Loop Marquee, structured Grid */}
        {visible("clientes") && <Clients />}

        {/* Galeria - Visual portfolio, events, spaces */}
        {visible("galeria") && <Gallery />}

        {/* Contacts section - Offline variables, Map, Submit form */}
        {visible("contactos") && <Contact />}
      </main>

      {/* Corporate detailed footer */}
      <Footer />
      </div>
    </>
  );
}
