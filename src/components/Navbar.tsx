import { useState, useEffect, MouseEvent } from "react";
import { Menu, X, Landmark, PhoneCall } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useSiteData } from "../contexts/SiteDataContext";

interface NavbarProps {
  currentSection: string;
}

export default function Navbar({ currentSection }: NavbarProps) {
  const { company } = useSiteData();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
      const offsetTop = (targetElement as HTMLElement).offsetTop - 116;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-9 left-0 w-full z-50 transition-all duration-300 ${
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
            onDoubleClick={(e) => {
              e.preventDefault();
              navigate({ to: "/login" });
            }}
            className="flex items-center space-x-3 group select-none"
          >
            {!isScrolled && company.logoScroll ? (
              <img src={company.logoScroll} alt={company.name} className="h-10 w-auto" />
            ) : isScrolled && company.logo ? (
              <img src={company.logo} alt={company.name} className="h-10 w-auto" />
            ) : !isScrolled && company.logo ? (
              <img src={company.logo} alt={company.name} className="h-10 w-auto" />
            ) : (
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled ? "bg-brand-navy/10 text-brand-navy" : "bg-white/10 text-brand-orange"
              }`}>
                <Landmark className="h-6 w-6" />
              </div>
            )}
            <div className="flex flex-col">
              <span className={`font-extrabold text-xl tracking-tight leading-none ${
                isScrolled ? "text-brand-navy" : "text-white"
              }`}>
                {/* {company.name} */}
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          id="mobile-navigation-overlay"
          className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-md lg:hidden animate-slide-down"
        >
          <div className="flex flex-col items-center justify-center h-full px-6 pb-16">
            <button
              id="mobile-overlay-close"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-brand-navy rounded-xl hover:bg-slate-100 transition-all"
              aria-label="Fechar Menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <nav className="flex flex-col items-center space-y-1 w-full max-w-sm">
              {navLinks.map((link) => {
                const active = currentSection === link.href.substring(1);
                return (
                  <a
                    id={`mobile-nav-link-${link.href.substring(1)}`}
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`w-full text-center px-6 py-4 rounded-2xl text-lg font-medium transition-all ${
                      active
                        ? "bg-brand-navy/10 text-brand-navy font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-brand-navy"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-10 w-full max-w-sm">
              <a
                id="mobile-overlay-cta"
                href="#contactos"
                onClick={(e) => handleLinkClick(e, "#contactos")}
                className="flex justify-center items-center space-x-2 w-full py-4 rounded-2xl bg-brand-navy text-white font-bold text-base uppercase tracking-wider shadow-lg"
              >
                <PhoneCall className="h-5 w-5" />
                <span>Contactar IS KENDA</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
