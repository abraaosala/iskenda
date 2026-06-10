import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { fetchServices, deleteService } from "../../services/api";
import type { Service } from "../../types";
import { ThreeDot } from "react-loading-indicators";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Briefcase, Plus, Pencil, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import ServiceModal from "../../components/ServiceModal";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Service | null | "new">(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchServices();
      setServices(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar serviços");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Tem a certeza que pretende eliminar este serviço?")) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao eliminar");
    }
  }

  const modalService = editing === "new" ? null : editing;

  return (
    <>
      <Helmet>
        <title>Serviços — IS KENDA</title>
      </Helmet>

      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-navy">Serviços</h1>
              <p className="text-sm text-slate-400 mt-0.5">Gerir serviços de consultoria</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-brand-blue hover:bg-white border border-slate-200 transition-colors disabled:opacity-50"
            >
              {loading ? <ThreeDot variant="bounce" color="#64748b" size="small" /> : <RefreshCw className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => setEditing("new")}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Serviço</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <LoadingOverlay text="A carregar serviços…" />
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Nenhum serviço encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-lg">{service.icon}</span>
                      <h3 className="text-base font-semibold text-slate-900 truncate">{service.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{service.description}</p>
                    {service.features.length > 0 && (
                      <div className="flex items-center space-x-1.5 mt-2">
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {service.features.length} funcionalidades
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 ml-4 shrink-0">
                    <button
                      onClick={() => setEditing(service)}
                      className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <ServiceModal
          service={modalService}
          onClose={() => setEditing(null)}
          onSaved={load}
        />
      )}
    </>
  );
}