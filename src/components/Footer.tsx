import { MouseEvent } from "react";
import { Facebook, Instagram, Linkedin, MessageSquareCode, Landmark, ArrowUp } from "lucide-react";
import { COMPANY_INFO } from "../data";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="footer" className="bg-brand-dark text-slate-400 py-16 border-t border-white/5 relative overflow-hidden text-left">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-royal/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Block 1: About company branding */}
          <div className="lg:col-span-5 space-y-6">
            <a
              id="footer-logo"
              href="#inicio"
              onClick={handleScrollToTop}
              className="flex items-center space-x-3 group"
            >
              <div className="p-2.5 bg-white/5 text-brand-gold rounded-xl border border-white/10 group-hover:bg-brand-gold/20 transition-all">
                <Landmark className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight leading-none">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[9px] font-bold tracking-wider uppercase mt-1 text-brand-gold">
                  Consultoria & Academia
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              "{COMPANY_INFO.slogan}"
            </p>

            {/* Social media icons with hover triggers */}
            <div className="flex items-center space-x-3.5">
              {[
                { icon: <Facebook className="h-4.5 w-4.5" />, href: "https://facebook.com/iskenda", label: "Facebook" },
                { icon: <Instagram className="h-4.5 w-4.5" />, href: "https://instagram.com/iskenda", label: "Instagram" },
                { icon: <Linkedin className="h-4.5 w-4.5" />, href: "https://linkedin.com/company/iskenda", label: "LinkedIn" },
                { icon: <MessageSquareCode className="h-4.5 w-4.5" />, href: `https://wa.me/244938198551`, label: "WhatsApp" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-brand-gold hover:text-brand-dark rounded-xl border border-white/5 transition-all text-slate-205"
                  aria-label={social.label}
                  referrerPolicy="no-referrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Block 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-brand-gold pl-2">
              Menu de Navegação
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Quem Somos", href: "#quem-somos" },
                { label: "Os Nossos Valores", href: "#valores" },
                { label: "Serviços Corporativos", href: "#servicos" },
                { label: "Honorários Mensais", href: "#honorarios" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-brand-gold transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 3: Secondary business lines */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-brand-gold pl-2">
              IS KENDA Academia
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Formação e Estágio Profissional", href: "#academia" },
                { label: "Curso de Contabilidade Prática", href: "#academia" },
                { label: "Curso de Fiscalidade Aplicada (AGT)", href: "#academia" },
                { label: "Curso de Gestão Prática de RH", href: "#academia" },
                { label: "Central de Contactos e Apoio", href: "#contactos" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-brand-gold transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright section */}
          <div className="text-left">
            <p className="text-[11px] text-slate-500 font-medium">
              {COMPANY_INFO.copyright}
            </p>
            <p className="text-[9px] text-slate-600 mt-0.5 font-mono">
              Registada na República de Angola | Luanda
            </p>
          </div>

          {/* Scroll to top floating style button */}
          <button
            id="footer-back-to-top"
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 bg-white/5 hover:bg-brand-gold hover:text-brand-dark px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white uppercase tracking-wider shadow-md transition-all cursor-pointer"
            aria-label="Voltar ao início"
          >
            <span>Subir ao Início</span>
            <ArrowUp className="h-4 w-4" />
          </button>

        </div>

      </div>
    </footer>
  );
}
