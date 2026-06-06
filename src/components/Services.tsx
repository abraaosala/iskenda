import { useState } from "react";
import { Check, ClipboardList, HelpingHand } from "lucide-react";
import { SERVICES } from "../data";
import { SmartIcon } from "./SmartIcon";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleContactScroll = () => {
    const targetElement = document.querySelector("#contactos");
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="servicos" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-navy/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title and Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div id="services-badge" className="inline-flex items-center space-x-2 bg-brand-blue/10 px-4 py-1.5 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider">
            <span>Soluções Profissionais</span>
          </div>
          <h2 id="services-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Os Nossos Serviços de Consultoria Empresarial
          </h2>
          <p id="services-intro" className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Garantimos excelência, pontualidade e total conformidade com a regulamentação angolana. Conheça as quatro áreas fundamentais em que atuamos:
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div id="services-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((serv, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={serv.id}
                id={`service-card-${serv.id}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden ${
                  isHovered
                    ? "bg-brand-navy text-white border-brand-navy shadow-xl shadow-brand-navy/15 -translate-y-1"
                    : "bg-white text-slate-800 border-slate-205 shadow-sm"
                }`}
              >
                {/* Visual Top Pattern */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-opacity duration-300 pointer-events-none ${
                  isHovered ? "bg-white/5 opacity-100" : "bg-brand-navy/5 opacity-50"
                }`} />

                <div>
                  {/* Icon Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-3 rounded-2xl transition-colors duration-300 ${
                      isHovered ? "bg-white/20 text-brand-orange" : "bg-brand-blue/10 text-brand-blue"
                    }`}>
                      <SmartIcon name={serv.icon} size={28} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{serv.title}</h3>
                  </div>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                    isHovered ? "text-slate-200" : "text-slate-500"
                  }`}>
                    {serv.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-3">
                    {serv.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start space-x-3 text-xs sm:text-sm">
                        <div className={`p-0.5 rounded-full mt-1 flex-shrink-0 transition-colors duration-300 ${
                          isHovered ? "bg-brand-orange/20 text-brand-orange" : "bg-brand-blue/10 text-brand-blue"
                        }`}>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className={`transition-colors duration-300 ${
                          isHovered ? "text-slate-100" : "text-slate-700"
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer scroll trigger */}
                <div className="mt-8 pt-6 border-t border-slate-100/60 flex items-center justify-between">
                  {isHovered ? (
                    <button
                      id={`service-btn-${serv.id}`}
                      onClick={handleContactScroll}
                      className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white cursor-pointer"
                    >
                      <span>Solicitar Orçamento</span>
                      <ClipboardList className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                      Serviço Fiduciário Regulado
                    </span>
                  )}
                  <span className={`text-[10px] font-mono ${isHovered ? "text-white/40" : "text-slate-400"}`}>
                    Ref: ISK-0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Post-Services Support banner */}
        <div id="services-footer-banner" className="mt-16 p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between text-left gap-6 shadow-sm">
          <div className="flex items-start space-x-4 max-w-2xl">
            <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange flex-shrink-0 mt-1">
              <HelpingHand className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Necessita de uma solução integrada para a sua empresa?</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Combinamos serviços de contabilidade com gestão de pessoal e assessoria tributária em contratos de prestação de serviços customizados com honorários mensais altamente competitivos.
              </p>
            </div>
          </div>
          <button
            id="services-footer-cta"
            onClick={handleContactScroll}
            className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
          >
            Falar Com Um Consultor
          </button>
        </div>

      </div>
    </section>
  );
}
