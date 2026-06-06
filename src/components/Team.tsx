import { useState } from "react";
import { Briefcase } from "lucide-react";
import { TEAM_MEMBERS } from "../data";
import { SmartIcon } from "./SmartIcon";

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="equipa" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand-navy/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-brand-orange/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-blue/10 px-4 py-1.5 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider">
            <span>Capital Humano</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            A Nossa Equipa
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Profissionais experientes e dedicados, comprometidos com a excelência e o sucesso da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={member.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`rounded-3xl border transition-all duration-300 flex flex-col text-left relative overflow-hidden ${
                  isHovered
                    ? "bg-brand-navy text-white border-brand-navy shadow-xl shadow-brand-navy/15 -translate-y-1"
                    : "bg-white text-slate-800 border-slate-200 shadow-sm"
                }`}
              >
                <div className={`h-40 bg-gradient-to-br ${member.gradient} flex items-center justify-center transition-all duration-500 ${
                  isHovered ? "scale-105" : ""
                }`}>
                  <SmartIcon name={member.icon} size={52} className="text-white/30" />
                </div>

                <div className="p-7 pt-5 flex flex-col flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${member.colorClass.split(" ")[0]}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isHovered ? "text-brand-orange" : "text-brand-blue"
                    }`}>
                      {member.role}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight mb-2 transition-colors duration-300 ${
                    isHovered ? "text-white" : "text-slate-900"
                  }`}>
                    {member.name}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed flex-1 transition-colors duration-300 ${
                    isHovered ? "text-slate-200" : "text-slate-500"
                  }`}>
                    {member.description}
                  </p>

                  <div className={`mt-5 pt-4 border-t transition-colors duration-300 flex items-center justify-between ${
                    isHovered ? "border-white/10" : "border-slate-100"
                  }`}>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isHovered ? "text-white/40" : "text-slate-400"
                    }`}>
                      IS KENDA
                    </span>
                    <span className={`text-[10px] font-mono transition-colors duration-300 ${
                      isHovered ? "text-white/40" : "text-slate-400"
                    }`}>
                      {member.initials}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs text-slate-400 font-mono">
            Equipa multidisciplinar com mais de 15 anos de experiência combinada no mercado angolano.
          </p>
        </div>
      </div>
    </section>
  );
}
