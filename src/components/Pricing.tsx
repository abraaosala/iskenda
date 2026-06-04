import { useState, useEffect } from "react";
import { DollarSign, ShieldAlert, FileSignature, Check } from "lucide-react";
import { COMPANY_INFO } from "../data";

export default function Pricing() {
  // Simulator State
  const [companyScale, setCompanyScale] = useState<"micro" | "pequena" | "media">("micro");
  const [selectedServices, setSelectedServices] = useState({
    contabilidade: true,
    fiscalidade: true,
    recursosHumanos: false,
    organizacaoAdm: false
  });

  const [estimatedMin, setEstimatedMin] = useState(70000);
  const [estimatedMax, setEstimatedMax] = useState(150000);

  // Recalculate price estimation dynamically based on selectors
  useEffect(() => {
    // Base Rates based on corporate scale
    let baseMin = 70000;
    let baseMax = 120000;

    if (companyScale === "pequena") {
      baseMin = 130000;
      baseMax = 250000;
    } else if (companyScale === "media") {
      baseMin = 280000;
      baseMax = 420000;
    }

    // Increments based on services selected
    let serviceMultiplierMin = 1.0;
    let serviceMultiplierMax = 1.0;

    const countSelected = Object.values(selectedServices).filter(Boolean).length;
    
    if (countSelected === 1) {
      serviceMultiplierMin = 0.8;
      serviceMultiplierMax = 0.95;
    } else if (countSelected === 3) {
      serviceMultiplierMin = 1.15;
      serviceMultiplierMax = 1.15;
    } else if (countSelected === 4) {
      serviceMultiplierMin = 1.3;
      serviceMultiplierMax = 1.25;
    }

    let rawMin = Math.round(baseMin * serviceMultiplierMin);
    let rawMax = Math.round(baseMax * serviceMultiplierMax);

    // Apply absolute bounds specified by user requirement (70,000 Kz to 500,000 Kz)
    if (rawMin < 70000) rawMin = 70000;
    if (rawMax > 500000) rawMax = 500000;
    if (rawMin > rawMax) rawMin = rawMax - 25000;

    setEstimatedMin(rawMin);
    setEstimatedMax(rawMax);
  }, [companyScale, selectedServices]);

  const toggleService = (key: keyof typeof selectedServices) => {
    // Ensure at least one service is selected
    const nextServices = { ...selectedServices, [key]: !selectedServices[key] };
    const selectedCount = Object.values(nextServices).filter(Boolean).length;
    if (selectedCount >= 1) {
      setSelectedServices(nextServices);
    }
  };

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
      .format(value)
      .replace("AOA", "")
      .trim() + " Kz";
  };

  return (
    <section id="honorarios" className="py-24 bg-white relative overflow-hidden text-left">
      {/* Decorative Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div id="pricing-badge" className="inline-flex items-center space-x-2 bg-brand-gold/10 px-4 py-1.5 rounded-full text-brand-gold text-xs font-bold uppercase tracking-wider">
            <span>Investimento Planeado</span>
          </div>
          <h2 id="pricing-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Transparência nos Nossos Honorários
          </h2>
          <p id="pricing-intro" className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Acreditamos que o rigor das suas contas deve estender-se à clareza comercial dos nossos honorários. Proporcionamos investimentos justos, proporcionais e com contratos formais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Informative Block */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div id="pricing-info-card" className="bg-slate-50/60 p-8 rounded-3xl border border-slate-202 border-slate-200 shadow-sm space-y-6 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full -mr-16 -mt-16 opacity-40 pointer-events-none" />
              
              <div className="z-10">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-brand-gold" />
                  <span>Termos e Valores de Referência</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed mb-6">
                  Os nossos honorários variam entre <strong>70.000 Kz e 500.000 Kz</strong>, de acordo com a dimensão da empresa e os módulos de serviços contratados. Todos os serviços são prestados mediante <strong>contrato formal de prestação de serviços</strong>.
                </p>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    Definição de honorários mensais:
                  </h4>
                  {[
                    { title: "Escala & Faturação Anual", desc: "A receita bruta anual e a estrutura legal societária da corporação." },
                    { title: "Volume de Documental Mensal", desc: "A quantidade de faturas, recibos e extratos bancários para classificação periódica." },
                    { title: "Quadro de Colaboradores", desc: "O número total de contratos de trabalho a processar junto do INSS." },
                    { title: "Necessidade de Organização Física", desc: "Se houver demanda de triagem de arquivos físicos no local do cliente." }
                  ].map((f, i) => (
                    <div key={i} className="flex space-x-3 items-start">
                      <div className="p-1 bg-white rounded-lg border border-slate-200 text-brand-royal flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">{f.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="pricing-contract-note" className="mt-8 p-4 bg-[#f8fafc] border border-slate-200 rounded-2xl flex items-start space-x-3 text-brand-royal z-10">
                <FileSignature className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs font-semibold leading-relaxed text-slate-650">
                  <strong>Segurança Jurídica:</strong> Todos os serviços iniciam única e exclusivamente após a celebração de contrato formal para zelar pela sua tranquilidade legal.
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Pricing Simulator */}
          <div className="lg:col-span-7">
            <div id="pricing-simulator-card" className="bg-gradient-to-br from-brand-dark to-brand-royal p-8 sm:p-10 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
              {/* background vector gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full filter blur-xl transform translate-x-10 -translate-y-10" />

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs text-brand-gold font-bold uppercase tracking-wider">Inovação Tecnológica</span>
                    <h3 className="text-xl font-bold mt-1">Simulador Prático de Honorários</h3>
                  </div>
                  <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full border border-white/10 text-slate-300 font-mono self-start sm:self-auto">
                    Kwanza Angolano (Kz)
                  </span>
                </div>

                {/* Step 1: Company size Selector */}
                <div className="space-y-4 mb-8">
                  <label className="text-xs font-bold text-slate-350 uppercase tracking-wider block">
                    1. Selecione a Dimensão da Sua Empresa:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "micro", label: "Microempresa", desc: "Até 5 colaboradores" },
                      { id: "pequena", label: "Pequena Empresa", desc: "6 a 20 colaboradores" },
                      { id: "media", label: "Média Empresa", desc: "Mais de 20 colaboradores" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        id={`pricing-scale-btn-${item.id}`}
                        onClick={() => setCompanyScale(item.id as any)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          companyScale === item.id
                            ? "bg-gradient-to-r from-brand-gold to-amber-500 text-brand-dark border-brand-gold font-bold shadow-md shadow-brand-gold/15"
                            : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                        }`}
                      >
                        <h4 className="text-xs sm:text-sm font-bold block leading-none">{item.label}</h4>
                        <p className={`text-[9px] mt-1 line-clamp-1 leading-tight ${
                          companyScale === item.id ? "text-brand-dark/80" : "text-slate-400"
                        }`}>
                          {item.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Desired Services */}
                <div className="space-y-4 mb-8">
                  <label className="text-xs font-bold text-slate-350 uppercase tracking-wider block">
                    2. Escolha os Módulos de Serviço de Interesse:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "contabilidade", label: "Contabilidade Mensal" },
                      { id: "fiscalidade", label: "Fiscalidade Tributária (AGT)" },
                      { id: "recursosHumanos", label: "Gestão de Recursos Humanos (IRT/INSS)" },
                      { id: "organizacaoAdm", label: "Organização Administrativa e Arquivos" }
                    ].map((item) => {
                      const isSelected = selectedServices[item.id as keyof typeof selectedServices];
                      return (
                        <button
                          key={item.id}
                          id={`pricing-service-toggle-${item.id}`}
                          onClick={() => toggleService(item.id as keyof typeof selectedServices)}
                          className={`flex items-center space-x-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white/10 border-brand-gold/50 text-white font-semibold"
                              : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isSelected ? "bg-brand-gold border-brand-gold text-brand-dark" : "border-white/20 bg-transparent text-transparent"
                          }`}>
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span className="text-xs tracking-wide">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Result Estimation Box */}
              <div id="pricing-result-panel" className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">Investimento Mensal Estimado</span>
                  <div className="text-2xl sm:text-3xl font-black mt-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-white">
                    {formatCurrency(estimatedMin)} – {formatCurrency(estimatedMax)}
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider">Sob aprovação contratual e auditoria prévia</p>
                </div>

                <button
                  id="pricing-simulation-cta"
                  onClick={handleContactScroll}
                  className="px-6 py-3.5 w-full sm:w-auto rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 text-brand-dark font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-brand-gold/30 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Solicitar Proposta
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
