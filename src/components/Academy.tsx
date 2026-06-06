import { useState } from "react";
import { BookOpen, Award, CheckCircle2, Milestone, GraduationCap, ChevronRight, Clock } from "lucide-react";
import { ACADEMIA_COURSES, ACADEMIA_OFFERS } from "../data";
import { SmartIcon } from "./SmartIcon";

export default function Academy() {
  const [activeCourseId, setActiveCourseId] = useState(ACADEMIA_COURSES[0].id);

  const activeCourse = ACADEMIA_COURSES.find((c) => c.id === activeCourseId) || ACADEMIA_COURSES[0];

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
    <section id="academia" className="py-24 bg-brand-dark text-white relative overflow-hidden text-left">
      {/* Visual background lights */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-azure/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div id="academia-badge" className="inline-flex items-center space-x-2 bg-brand-gold/10 px-4 py-1.5 rounded-full text-brand-gold text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="h-4 w-4" />
            <span>Capacitação Avançada</span>
          </div>
          <h2 id="academia-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Formação e Estágio Profissional em Angola
          </h2>
          <p id="academia-intro" className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            A <strong>IS KENDA ACADEMIA</strong> é uma instituição dedicada à capacitação profissional e desenvolvimento de competências práticas para o mercado de trabalho angolano.
          </p>
        </div>

        {/* Section 1: Split Mission, Vision & Offerings as Bento blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          
          {/* Mission & Vision cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div id="academia-mission" className="bg-white/[0.04] border border-white/10 p-6 rounded-3xl relative">
              <div className="p-2.5 bg-brand-gold/25 rounded-xl text-brand-gold inline-block mb-4">
                <Milestone className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Visão</h3>
              <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                "Ser uma referência nacional em consultoria empresarial e formação profissional prática."
              </p>
            </div>

            <div id="academia-vision" className="bg-white/[0.04] border border-white/10 p-6 rounded-3xl relative flex-1 flex flex-col justify-end">
              <div className="p-2.5 bg-brand-azure/25 rounded-xl text-brand-azure inline-block mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Missão</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Capacitar profissionais e estudantes através de uma formação prática e orientada para as exigências reais do mercado de trabalho."
              </p>
            </div>
          </div>

          {/* Core Offerings List Bento card */}
          <div className="lg:col-span-8 bg-white/[0.03] border border-white/10 p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-brand-gold rounded-full" />
                <span>O Que Oferecemos aos Nossos Formandos</span>
              </h3>

              <div id="academia-offers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACADEMIA_OFFERS.map((offer, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="p-2.5 bg-brand-azure/25 rounded-xl text-brand-gold inline-block mb-3">
                      <SmartIcon name={offer.icon} size={20} />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-2">{offer.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{offer.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              <span>FORMAÇÕES INTENSIVAS</span>
              <span className="text-brand-gold font-bold">PADRÃO IS KENDA</span>
            </div>
          </div>

        </div>

        {/* Section 2: Interactive Course Curriculum Browser */}
        <div id="academia-curriculum-panel" className="relative bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8">
            
            {/* Quick selectors list */}
            <div className="w-full lg:w-1/3 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-4 font-mono">
                  Áreas de Formação & Cursos
                </h3>
                
                <div className="space-y-2">
                  {ACADEMIA_COURSES.map((course) => (
                    <button
                      key={course.id}
                      id={`course-tab-${course.id}`}
                      onClick={() => setActiveCourseId(course.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all group cursor-pointer ${
                        activeCourseId === course.id
                          ? "bg-brand-royal border-l-4 border-brand-gold text-white font-bold"
                          : "bg-white/[0.04] text-slate-350 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-xs sm:text-sm tracking-wide leading-tight">{course.title}</span>
                      <ChevronRight className={`h-4 w-4 text-slate-400 group-hover:text-white transition-transform ${
                        activeCourseId === course.id ? "rotate-90 text-brand-gold" : ""
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 hidden lg:block">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Para cursos customizados ou formação corporativa in-company, agende uma reunião com os nossos diretores.
                </p>
              </div>
            </div>

            {/* Curriculum details pane */}
            <div className="w-full lg:w-2/3 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white">{activeCourse.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal mt-1">{activeCourse.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-brand-gold/10 text-brand-gold px-3.5 py-1.5 rounded-full border border-brand-gold/20 flex-shrink-0 text-xs font-bold whitespace-nowrap self-start sm:self-auto">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{activeCourse.duration}</span>
                  </div>
                </div>

                {/* Modules list */}
                <div className="mt-6">
                  <h5 className="text-xs font-bold text-slate-350 uppercase tracking-wider mb-4">
                    Conteúdo Programático do Curso:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCourse.modules.map((module, mIdx) => (
                      <div key={mIdx} className="flex items-start space-x-3 text-xs leading-relaxed">
                        <div className="p-1 bg-brand-gold/10 rounded-full text-brand-gold flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 inline-block" />
                        </div>
                        <span className="text-slate-300 mt-0.5">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply/Enroll CTA for Academy */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-slate-400 font-medium max-w-sm text-left">
                  *As vagas são limitadas. Estágios práticos garantidos aos 2 melhores formandos de cada turma.
                </p>
                <button
                  id={`course-apply-btn-${activeCourse.id}`}
                  onClick={handleContactScroll}
                  className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-orange-dark text-brand-dark font-extrabold text-xs uppercase tracking-wider transform hover:scale-[1.02] shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  Inscrever-me Agora
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
