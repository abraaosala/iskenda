import { CLIENTS } from "../data";
import { Landmark } from "lucide-react";

export default function Clients() {
  // Double list to allow seamless loop in infinite slider
  const doubleClients = [...CLIENTS, ...CLIENTS];

  return (
    <section id="clientes" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div id="clients-badge" className="inline-flex items-center space-x-2 bg-brand-royal/5 px-4 py-1.5 rounded-full text-brand-royal text-xs font-bold uppercase tracking-wider">
            <span>Confiança & Solidez</span>
          </div>
          <h2 id="clients-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Mais de 20 Clientes Ativos
          </h2>
          <p id="clients-subtitle" className="text-base text-slate-500">
            Apoiamos ativamente empresas de variados setores na organização, crescimento sustentado e conformidade tributária em Angola.
          </p>
        </div>

        {/* Continuous Automatic Marquee Slider */}
        <div className="relative w-full overflow-hidden py-4 bg-slate-50 border border-slate-205 rounded-3xl mb-16">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Sliding Track */}
          <div className="flex w-max animate-carousel-left space-x-8 items-center py-2">
            {doubleClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center space-x-3 bg-white px-6 py-3.5 rounded-2xl shadow-sm border border-slate-200 shrink-0 min-w-[200px]"
              >
                <div className={`w-8 h-8 rounded-lg ${client.colorClass} flex items-center justify-center font-black text-sm uppercase shadow-inner`}>
                  {client.logoLetter}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-705 tracking-wide">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed client overview grid */}
        <div className="relative">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-8 font-mono">
            Painel Geral de Empresas Registadas
          </h3>
          
          <div id="clients-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                id={`client-card-${client.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex flex-col items-center justify-center p-5 bg-slate-50/80 border border-slate-200 rounded-2xl hover:bg-brand-royal hover:border-brand-royal transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-royal/5"
              >
                <div className={`w-10 h-10 rounded-xl ${client.colorClass} flex items-center justify-center font-extrabold text-white text-base mb-3 shadow-md group-hover:bg-white group-hover:text-brand-royal transition-all duration-305`}>
                  {client.logoLetter}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-white transition-colors duration-300 text-center uppercase tracking-wide">
                  {client.name}
                </span>
                <span className="text-[9px] text-slate-405 group-hover:text-white/60 transition-colors duration-300 text-center font-mono mt-1">
                  ID: ISK-CL
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info showing security assurance */}
        <div id="clients-subinfo" className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
          <Landmark className="h-4 w-4 text-brand-gold" />
          <span>Contratos regulados de prestação de serviços com sigilo absoluto e conformidade regulatória.</span>
        </div>

      </div>
    </section>
  );
}
