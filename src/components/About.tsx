import { FileCheck2, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import { COMPANY_INFO } from "../data";

export default function About() {
  return (
    <section id="quem-somos" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-slate-200/50 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Core content and paragraphs styled as a large Bento Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-60 pointer-events-none" />
            
            <div className="z-10">
              <div id="about-brand-tag" className="inline-flex items-center space-x-2 bg-brand-royal/5 px-4.5 py-2 rounded-full text-brand-royal text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span>IS KENDA Consultoria</span>
              </div>

              <h2 id="about-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Apoio estratégico e conformidade completa para o seu negócio crescer em Angola.
              </h2>

              <div id="about-paragraphs" className="space-y-4 text-sm sm:text-base text-slate-605 leading-relaxed">
                <p>
                  A <strong>IS KENDA CONSULTORIA</strong> é uma empresa angolana especializada em Consultoria Empresarial, oferecendo soluções de ponta e sob medida nas áreas de <strong>Contabilidade, Fiscalidade Tributária, Gestão de Recursos Humanos (GRH)</strong> e <strong>Organização Administrativa</strong>.
                </p>
                <p>
                  Com mais de <strong>{COMPANY_INFO.yearsExperience} anos de experiência sólida</strong> no mercado nacional, temos como missão precípua apoiar empresas e empreendedores na estruturação, sustentabilidade financeira e conformidade legal das suas operações comerciais.
                </p>
                <p>
                  Trabalhamos de forma transparente mediante a celebração de <strong>contratos formais de prestação de serviços</strong>, garantindo proteção jurídica ampla, estabilidade contratual de longo prazo e compromisso total com o sucesso tangível dos nossos parceiros.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between z-10">
              <p className="font-bold text-sm text-brand-royal">
                Atualmente contamos com mais de {COMPANY_INFO.activeClientsCount} clientes ativos.
              </p>
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
                Luanda • Angola
              </span>
            </div>
          </div>

          {/* Column 2: Visual Cards & Corporate Trust Indicators as a complementary Bento Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full filter blur-xl pointer-events-none" />
            
            <div>
              <h3 className="text-lg font-extrabold text-brand-royal mb-6 flex items-center space-x-2.5">
                <span className="w-1.5 h-6 bg-brand-gold rounded-full" />
                <span>Os Nossos Pilares Corporativos</span>
              </h3>

              <div className="space-y-5">
                {[
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-brand-royal" />,
                    title: "Conformidade Total",
                    description: "Seguimos à risca as regras vigentes do PGC e AGT, blindando a sua organização contra coimas e sanções."
                  },
                  {
                    icon: <FileCheck2 className="h-5 w-5 text-brand-azure" />,
                    title: "Contratos Transparentes",
                    description: "Todos os escopos, prazos e honorários são formalizados para zelar pela sua tranquilidade jurídica."
                  },
                  {
                    icon: <HeartHandshake className="h-5 w-5 text-brand-gold" />,
                    title: "Relações Próximas",
                    description: "Atendimento humano, ágil e customizado, estando disponíveis no dia a dia para esclarecer dúvidas."
                  },
                  {
                    icon: <Award className="h-5 w-5 text-indigo-600" />,
                    title: "Resultados de Excelência",
                    description: "Transformamos números em inteligência analítica que se traduz diretamente em eficiência."
                  }
                ].map((pilar, index) => (
                  <div key={index} className="flex space-x-4 items-start text-left">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 flex-shrink-0">
                      {pilar.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{pilar.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">{pilar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-105/65">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Garantia e Rigor Fiduciário
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
