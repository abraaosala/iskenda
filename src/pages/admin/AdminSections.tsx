import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  fetchSiteSections,
  updateSiteSections,
  type SiteSectionPayload,
} from "../../services/api";
import type { SiteSection } from "../../types";
import { ThreeDot } from "react-loading-indicators";
import LoadingOverlay from "../../components/LoadingOverlay";
import SavingOverlay from "../../components/SavingOverlay";
import { VisibilitySwitch } from "../../components/VisibilitySwitch";
import {
  LayoutList, AlertCircle, RefreshCw, Save, Eye, EyeOff,
} from "lucide-react";

export default function AdminSections() {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [draft, setDraft] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSiteSections();
      setSections(result);
      setDraft(Object.fromEntries(result.map((s) => [s.key, s.isVisible])));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar secções");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const visibleCount = useMemo(
    () => sections.filter((s) => draft[s.key] !== false).length,
    [sections, draft]
  );

  const hasChanges = useMemo(
    () => sections.some((s) => draft[s.key] !== s.isVisible),
    [sections, draft]
  );

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const payload: SiteSectionPayload[] = sections.map((s) => ({
        key: s.key,
        is_visible: draft[s.key] !== false,
      }));
      const updated = await updateSiteSections(payload);
      setSections(updated);
      setDraft(Object.fromEntries(updated.map((s) => [s.key, s.isVisible])));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Secções — IS KENDA</title>
      </Helmet>

      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue">
              <LayoutList className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-navy">Secções do Site</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Escolha que secções mostrar na página principal
              </p>
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
        {success && (
          <div className="flex items-center space-x-2.5 text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-6">
            <Save className="h-4 w-4 shrink-0" />
            <span>Visibilidade actualizada com sucesso.</span>
          </div>
        )}

        {loading ? (
          <LoadingOverlay text="A carregar secções…" />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-600">
                {visibleCount === sections.length
                  ? "Todas as secções estão visíveis"
                  : `${visibleCount} de ${sections.length} secções visíveis`}
              </p>
              <span className="text-xs text-slate-400">Guardar para aplicar</span>
            </div>

            <ul className="divide-y divide-slate-100">
              {sections.map((section) => {
                const isVisible = draft[section.key] !== false;
                return (
                  <li key={section.key} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      <span
                        className={`flex items-center justify-center p-2 rounded-lg shrink-0 ${
                          isVisible ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{section.label}</p>
                        <p className="text-xs text-slate-400 capitalize truncate">{section.key}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0 ml-4">
                      <button
                        onClick={() => setDraft({ ...draft, [section.key]: !isVisible })}
                        className="text-xs font-medium text-slate-500 hover:text-brand-blue transition-colors"
                      >
                        {isVisible ? "Ocultar" : "Mostrar"}
                      </button>
                      <VisibilitySwitch
                        visible={isVisible}
                        onChange={(v) => setDraft({ ...draft, [section.key]: v })}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100">
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 disabled:opacity-50 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? "A guardar…" : "Guardar alterações"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <SavingOverlay show={saving} />
    </>
  );
}