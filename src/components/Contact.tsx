import { useState, FormEvent, ChangeEvent } from "react";
import { Phone, Mail, Clock, Send, Landmark, CheckCircle, AlertCircle } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext";
import { submitContact } from "../services/api";

export default function Contact() {
  const { company } = useSiteData();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    servico: "consultoria",
    mensagem: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContact({
        name: formData.nome,
        phone: formData.telefone,
        email: formData.email || undefined,
        service_area: formData.servico,
        message: formData.mensagem || undefined,
      });
      setIsSubmitted(true);
      setFormData({ nome: "", email: "", telefone: "", servico: "consultoria", mensagem: "" });
    } catch {
      setSubmitError("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contactos" className="py-24 bg-[#f8fafc] relative overflow-hidden text-left">
      {/* Decorative vector overlays */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-navy/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div id="contact-badge" className="inline-flex items-center space-x-2 bg-brand-blue/10 px-4 py-1.5 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider">
            <span>Fale Connosco</span>
          </div>
          <h2 id="contact-title" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Pronto Para Começar? Contacte-nos Hoje
          </h2>
          <p id="contact-intro" className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Agende uma reunião diagnóstica gratuita ou tire dúvidas sobre as turmas da nossa academia. A nossa equipa responderá em tempo recorde.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Contact Methods / General Details */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div id="contact-info-panel" className="bg-white p-8 rounded-3xl border border-slate-200 space-y-8 flex-1">
              <div>
                <h3 className="text-lg font-bold text-slate-950 flex items-center space-x-2.5">
                  <Landmark className="h-5.5 w-5.5 text-brand-blue" />
                  <span>Canais Oficiais</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">
                  Use os dados de contacto abaixo ou faça-nos uma visita de segunda a sexta-feira.
                </p>
              </div>

              {/* Items */}
              <div className="space-y-6">
                {[
                  {
                    icon: <Phone className="h-5 w-5 text-brand-blue" />,
                    title: "Telefone de Contacto",
                    desc: company.phone,
                    link: `tel:${company.phone.replace(/\s+/g, "")}`
                  },
                  {
                    icon: <Mail className="h-5 w-5 text-brand-blue" />,
                    title: "Endereço Eletrónico",
                    desc: company.email,
                    link: `mailto:${company.email}`
                  },
                  {
                    icon: <Clock className="h-5 w-5 text-brand-orange" />,
                    title: "Horário de Atendimento",
                    desc: company.workingHours,
                    link: null
                  }
                ].map((item, index) => (
                  <div key={index} className="flex space-x-4 items-start text-left">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex-shrink-0 text-slate-800">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{item.title}</h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-base font-bold text-slate-800 hover:text-brand-blue transition-colors mt-1 block"
                        >
                          {item.desc}
                        </a>
                      ) : (
                        <span className="text-base font-bold text-slate-800 mt-1 block">
                          {item.desc}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded Google Map Placeholder */}
            <div id="contact-map-card" className="h-64 rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
              <iframe
                id="contact-map"
                title="Google Maps IS KENDA Luanda Angola"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126174.19500057041!2d13.177696614407421!3d-8.835471617260533!2m3!1f0!2f0!3f0!3m2!1i1024|2i768|4f13.1!3m3!1m2!1s0x1a4a4f00aa221dd7%3A0x6b6bf09d84bf4b!2sLuanda%2C%20Angola!5e0!3m2!1spt!2spt!4v1700000000000!5m2!1spt!2spt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Column 2: Lead Gen Form */}
          <div className="lg:col-span-7">
            <div id="contact-form-card" className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden h-full">
              {/* Abstract decorative graphic */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full filter blur-xl transform translate-x-10 -translate-y-10 pointer-events-none" />

              {isSubmitted ? (
                <div id="contact-success-alert" className="flex flex-col items-center justify-center h-full space-y-6 text-center py-12">
                  <div className="p-4 bg-brand-orange/15 rounded-full text-brand-orange animate-bounce">
                    <CheckCircle className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Mensagem Enviada!</h3>
                  <p className="text-sm text-slate-350 max-w-md leading-relaxed">
                    Muito obrigado por entrar em contacto com a <strong>IS KENDA</strong>. Recebemos as suas informações e responderemos por telefone ou e-mail dentro de 24 horas úteis.
                  </p>
                  <button
                    id="contact-reset-btn"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form id="contact-actual-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs text-brand-orange font-bold uppercase tracking-wider">Apoio Personalizado</span>
                    <h3 className="text-xl font-bold mt-1">Formulário de Pedido de Contacto</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="nome" className="text-xs font-bold text-slate-350 uppercase tracking-wider block text-left">
                        Nome Completo *
                      </label>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: João Manuel"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange text-white text-sm transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="telefone" className="text-xs font-bold text-slate-350 uppercase tracking-wider block text-left">
                        Telefone de Contacto *
                      </label>
                      <input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="Ex: +244 912 345 678"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange text-white text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-350 uppercase tracking-wider block text-left">
                        Endereço de E-mail
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ex: joao@empresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange text-white text-sm transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="servico" className="text-xs font-bold text-slate-350 uppercase tracking-wider block text-left">
                        Área de Interesse *
                      </label>
                      <select
                        id="servico"
                        name="servico"
                        value={formData.servico}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange transition-colors"
                      >
                        <option value="consultoria">Consultoria Empresarial Completa</option>
                        <option value="contabilidade">Somente Apoio Contábil</option>
                        <option value="fiscalidade">Assessoria Tributária / AGT</option>
                        <option value="recursos_humanos">Processamento de Salários / GRH</option>
                        <option value="academia">Formação Profissional (Academia)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mensagem" className="text-xs font-bold text-slate-350 uppercase tracking-wider block text-left">
                      Mensagem / Detalhes Adicionais
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={4}
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Descreva brevemente as necessidades da sua empresa..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange text-white text-sm transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[10px] text-slate-450 text-left">
                      * Ao submeter este formulário, concorda com a recolha segura das suas informações sob a nossa política de confidencialidade de Angola.
                    </span>
                    {submitError && (
                      <p className="text-[11px] text-red-400 flex items-center space-x-1.5">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{submitError}</span>
                      </p>
                    )}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 w-full sm:w-auto rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 text-brand-dark font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-brand-orange/30 hover:scale-[1.02] flex items-center justify-center space-x-2.5 transition-all cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? "A Enviar…" : "Contactar"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
