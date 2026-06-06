import { VALUES } from "../data";
import { SmartIcon } from "./SmartIcon";

export default function Values() {
  return (
    <section id="valores" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative vector points */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div id="values-tag" className="inline-flex items-center space-x-2 bg-brand-orange/10 px-4 py-1.5 rounded-full text-brand-orange text-xs font-extrabold uppercase tracking-wider">
            <span>Ética & Integridade</span>
          </div>
          <h2 id="values-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
            Os Valores Que Norteiam o Nosso Trabalho
          </h2>
          <p id="values-description" className="text-sm sm:text-base text-slate-500">
            Acreditamos que o sucesso duradouro apoia-se em princípios inalienáveis. Por isso, fundamentamos todas as nossas condutas de consultoria e formação profissional em sete pilares norteadores.
          </p>
        </div>

        {/* Corporate Values Bento / Grid list */}
        <div id="values-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {VALUES.map((value, index) => {
            // Give specific cards subtle custom structures to make it design-focused
            const isLargeSpan = index === 0 || index === 6; // make Ethical & Commitment stand out beautifully
            return (
              <div
                key={value.title}
                id={`value-card-${value.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`group p-6 rounded-3xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between ${
                  isLargeSpan ? "md:col-span-2 lg:col-span-1 xl:col-span-2 bg-gradient-to-br from-slate-50/90 to-slate-100/50" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-white rounded-xl text-brand-blue border border-slate-200/60 shadow-xs group-hover:bg-brand-navy group-hover:text-white transition-all duration-350">
                      <SmartIcon name={value.icon} size={22} />
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold tracking-widest font-mono">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 mb-2 group-hover:text-brand-blue transition-colors font-sans">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-normal">
                    {value.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/40 flex justify-between items-center text-[10px] font-mono text-slate-400 font-semibold tracking-wider">
                  <span>ELEMENTO {index + 1}</span>
                  <span className="text-[10px] text-brand-blue/60 group-hover:text-brand-blue font-bold tracking-wide flex items-center space-x-1 uppercase transition-colors">
                    <span>Inabalável</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
