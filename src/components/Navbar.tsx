import { useState, useEffect, MouseEvent } from "react";
import { Menu, X, Landmark, PhoneCall } from "lucide-react";
import { COMPANY_INFO } from "../data";

interface NavbarProps {
  currentSection: string;
}

export default function Navbar({ currentSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Quem Somos", href: "#quem-somos" },
    { label: "Equipa", href: "#equipa" },
    { label: "Valores", href: "#valores" },
    { label: "Serviços", href: "#servicos" },
    { label: "Honorários", href: "#honorarios" },
    { label: "Clientes", href: "#clientes" },
    { label: "Galeria", href: "#galeria" },
    { label: "Contactos", href: "#contactos" },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-850"
          : "bg-gradient-to-b from-brand-dark/90 to-brand-dark/10 text-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <a
            id="nav-logo"
            href="#inicio"
            onClick={(e) => handleLinkClick(e, "#inicio")}
            className="flex items-center space-x-3 group"
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              isScrolled ? "bg-brand-navy/10 text-brand-navy" : "bg-white/10 text-brand-orange"
            }`}>
              <Landmark className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className={`font-extrabold text-xl tracking-tight leading-none ${
                isScrolled ? "text-brand-navy" : "text-white"
              }`}>
                {COMPANY_INFO.name}
              </span>
              <span className={`text-[9px] font-semibold tracking-wider uppercase mt-1 ${
                isScrolled ? "text-brand-blue" : "text-brand-orange"
              }`}>
                Consultoria & Academia
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = currentSection === link.href.substring(1);
              return (
                <a
                  id={`nav-link-${link.href.substring(1)}`}
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 ${
                    active
                      ? isScrolled
                        ? "text-brand-blue bg-brand-navy/5 font-semibold"
                        : "text-brand-orange font-semibold"
                      : isScrolled
                      ? "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Desktop Contact CTA */}
          <div className="hidden lg:flex items-center">
            <a
              id="desktop-nav-cta"
              href="#contactos"
              onClick={(e) => handleLinkClick(e, "#contactos")}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${
                isScrolled
                  ? "bg-brand-navy text-white hover:bg-brand-blue hover:shadow-md"
                  : "bg-brand-orange text-brand-dark hover:bg-white hover:text-brand-navy"
              }`}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Ligar Agora</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl focus:outline-none transition-colors ${
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Abrir Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-navigation-panel"
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 border-t border-slate-100 bg-white"
            : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
          {navLinks.map((link) => {
            const active = currentSection === link.href.substring(1);
            return (
              <a
                id={`mobile-nav-link-${link.href.substring(1)}`}
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  active
                    ? "bg-brand-navy/10 text-brand-navy font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-navy"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-4 px-2">
            <a
              id="mobile-nav-cta"
              href="#contactos"
              onClick={(e) => handleLinkClick(e, "#contactos")}
              className="flex justify-center items-center space-x-2 w-full py-3.5 rounded-xl bg-brand-navy text-white font-bold text-center uppercase tracking-wider text-sm shadow-md"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Contactar IS KENDA</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
