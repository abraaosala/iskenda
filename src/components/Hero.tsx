import { ArrowRight, BookOpen, Briefcase, Landmark } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";

export default function Hero() {
  const { company } = useSiteData();
  const handleScrollTo = (sectionId: string) => {
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy text-white pt-20"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={company.heroImage || "/src/assets/images/hero_workspace_1780489385386.png"}
          alt="IS KENDA Escritório"
          className="w-full h-full object-cover object-center opacity-20 transform scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Deep premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-blue/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/20" />
      </div>

      {/* Decorative Golden Ambient Light */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-orange/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-brand-orange/10 rounded-full filter blur-3xl animate-pulse" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Messaging Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tag/Badge */}
            <div id="hero-badge" className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
              {company.logoScroll ? (
                <img src={company.logoScroll} alt="" className="h-4 w-auto" />
              ) : (
                <Landmark className="h-4 w-4" />
              )}
              <span>ISKENDA Cabinda</span>
            </div>

            {/* Main Display Typography */}
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Apoio Empresarial & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-white to-brand-orange-dark">Capacitação</span> Prática
            </h1>

            {/* Slogan */}
            <p id="hero-subtitle" className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed border-l-4 border-brand-orange pl-4">
              "{company.slogan}"
            </p>

            {/* Call To Actions */}
            <div id="hero-ctas" className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-cta-consulting"
                onClick={() => handleScrollTo("#servicos")}
                className="flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 text-brand-dark font-bold text-base shadow-lg shadow-brand-orange/25 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-brand-orange/40 active:translate-y-0 cursor-pointer"
              >
                <Briefcase className="h-5 w-5" />
                <span>Consultoria Empresarial</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                id="hero-cta-academy"
                onClick={() => handleScrollTo("#academia")}
                className="flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold text-base transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                <BookOpen className="h-5 w-5" />
                <span>Academia Profissional</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div id="hero-fast-stats" className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-3xl font-extrabold text-brand-orange">{company.yearsExperience}+ Anos</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">De Experiência no Mercado</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">{company.activeClientsCount}+ Clientes</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Cooperando Ativamente</p>
              </div>
            </div>

          </div>

          {/* Visual Presentation Card Box */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 hidden md:block">
            <div id="hero-glamour-card" className="relative mx-auto max-w-sm bg-gradient-to-tr from-brand-navy/40 to-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
              
              <div className="flex justify-between items-start mb-6">
                {company.logoScroll ? (
                  <div className="p-3 bg-brand-orange/20 rounded-2xl">
                    <img src={company.logoScroll} alt="" className="h-8 w-auto" />
                  </div>
                ) : (
                  <div className="p-3 bg-brand-orange/20 rounded-2xl text-brand-orange">
                    <Landmark className="h-8 w-8" />
                  </div>
                )}
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  Garantia de Qualidade
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">Porquê a IS KENDA?</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Combinamos a capacidade técnica de grandes consultoras com o tratamento ágil, próximo e personalizado que a sua empresa merece.
              </p>

              <div className="space-y-3.5">
                {[
                  "Segurança fiscal nas submissões da AGT",
                  "Processamento de salários sem falhas",
                  "Estágio prático para formandos",
                  "Estrutura contratual fidedigna e transparente"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-xs font-semibold text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-brand-orange" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Angle Highlights decorative */}
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-brand-orange rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-brand-orange rounded-bl-lg" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
