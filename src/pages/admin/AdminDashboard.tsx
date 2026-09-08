import { useEffect, useState, type ElementType } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "@tanstack/react-router";
import { fetchAdminDashboard, type AdminDashboard as DashboardData } from "../../services/api";
import { ThreeDot } from "react-loading-indicators";
import LoadingOverlay from "../../components/LoadingOverlay";
import {
  LayoutDashboard, Briefcase, Users,
  Star, Image, Settings, TrendingUp, Clock, GalleryHorizontal, LayoutList,
  Phone, Mail, MessageSquare, AlertCircle, RefreshCw,
} from "lucide-react";

const statCards = [
  { label: "Serviços", key: "services" as const, icon: Briefcase, gradient: "from-violet-500 to-purple-600" },
  { label: "Clientes", key: "clients" as const, icon: Star, gradient: "from-amber-500 to-orange-600" },
  { label: "Equipa", key: "team" as const, icon: Users, gradient: "from-sky-500 to-blue-600" },
  { label: "Galeria", key: "gallery" as const, icon: GalleryHorizontal, gradient: "from-pink-500 to-rose-600" },
  { label: "Experiência", key: "experience" as const, icon: Clock, gradient: "from-brand-navy to-brand-blue" },
];

const quickLinks = [
  { icon: Briefcase, title: "Serviços", desc: "Gerir serviços", path: "/admin/servicos" },
  { icon: Users, title: "Equipa", desc: "Gerir membros", path: "/admin/equipa" },
  { icon: Star, title: "Clientes", desc: "Gerir clientes", path: "/admin/clientes" },
  { icon: Image, title: "Galeria", desc: "Gerir galeria", path: "/admin/galeria" },
  { icon: LayoutList, title: "Secções", desc: "Mostrar/ocultar secções", path: "/admin/seccoes" },
  { icon: Settings, title: "Site Data", desc: "Actualizar empresa", path: "/admin/site-data" },
];

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAdminDashboard();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard — IS KENDA</title>
      </Helmet>

      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-navy">Dashboard</h1>
              <p className="text-sm text-slate-400 mt-0.5">Visão geral do site</p>
            </div>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-brand-blue hover:bg-white border border-slate-200 transition-colors disabled:opacity-50"
          >
            {loading ? <ThreeDot variant="bounce" color="#64748b" size="small" /> : <RefreshCw className="h-3.5 w-3.5" />}
            <span>Actualizar</span>
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading && !data ? (
          <LoadingOverlay text="A carregar dashboard…" />
        ) : data ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {statCards.map((card) => {
                const Icon = card.icon;
                const stat = data.stats[card.key];
                const value = typeof stat === "object" ? stat.years : stat;
                const suffix = typeof stat === "object" ? stat.suffix : undefined;

                return (
                  <div key={card.key} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">{card.label}</p>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
                          {suffix && <span className="text-sm font-medium text-slate-400">{suffix}</span>}
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {data.recentContacts.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-2.5">
                    <Phone className="h-4 w-4 text-brand-blue" />
                    <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Contactos Recentes</h2>
                  </div>
                  <span className="text-xs text-slate-400">Últimos {data.recentContacts.length}</span>
                </div>
                <div className="space-y-3">
                  {data.recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="p-2 rounded-lg bg-brand-navy/5 text-brand-navy shrink-0">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800 truncate">{contact.name}</p>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                            {new Date(contact.createdAt).toLocaleDateString("pt-PT")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{contact.phone}</span>
                          </span>
                          {contact.email && (
                            <span className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{contact.email}</span>
                            </span>
                          )}
                        </div>
                        <span className="inline-block mt-1 text-[10px] font-medium text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full">
                          {contact.serviceArea}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Gestão Rápida</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickLinks.map((item) => (
                  <QuickLink key={item.path} icon={item.icon} title={item.title} desc={item.desc} path={item.path} />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

function QuickLink({ icon: Icon, title, desc, path }: { icon: ElementType; title: string; desc: string; path: string; key?: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate({ to: path })}
      className="w-full flex items-center space-x-4 bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-slate-300 transition-all text-left group cursor-pointer"
    >
      <div className="p-2.5 rounded-xl bg-brand-navy/5 text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </button>
  );
}