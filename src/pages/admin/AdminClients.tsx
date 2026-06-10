import { useEffect, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { fetchClients, deleteClient, createClient, updateClient, type ClientPayload } from "../../services/api";
import type { Client } from "../../types";
import DropZone from "../../components/DropZone";
import { ThreeDot } from "react-loading-indicators";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Star, Plus, Pencil, Trash2, AlertCircle, RefreshCw, X, Save } from "lucide-react";

const colors = [
  "from-violet-500 to-purple-600", "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600", "from-cyan-500 to-blue-600",
  "from-lime-500 to-green-600", "from-red-500 to-rose-600",
];

export default function AdminClients() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Client | null | "new">(null);

  async function load() {
    setLoading(true); setError(null);
    try { setItems(await fetchClients()); }
    catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <Helmet><title>Clientes — IS KENDA</title></Helmet>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600"><Star className="h-5 w-5" /></div>
            <div><h1 className="text-2xl font-bold text-brand-navy">Clientes</h1><p className="text-sm text-slate-400 mt-0.5">Gerir logotipos de clientes</p></div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={load} disabled={loading} className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-brand-blue hover:bg-white border border-slate-200 disabled:opacity-50">            {loading ? <ThreeDot variant="bounce" color="#64748b" size="small" /> : <RefreshCw className="h-3.5 w-3.5" />}</button>
            <button onClick={() => setEditing("new")} className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-orange hover:bg-amber-600"><Plus className="h-4 w-4" /><span>Novo</span></button>
          </div>
        </div>
        {error && <div className="flex items-center space-x-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6"><AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span></div>}
        {loading ? <LoadingOverlay text="A carregar clientes…" />
        : items.length === 0 ? <div className="text-center py-16 bg-white rounded-2xl border border-slate-200"><Star className="h-10 w-10 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500">Nenhum cliente encontrado</p></div>
        : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.name} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow text-center relative group">
                {item.logo ? (
                  <img src={item.logo} alt={item.name} className="w-14 h-14 rounded-xl object-contain mx-auto mb-2" />
                ) : (
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.colorClass} flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>{item.logoLetter}</div>
                )}
                <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg bg-white shadow text-slate-400 hover:text-brand-blue"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={async () => { if (confirm("Eliminar?")) { await deleteClient(item.id); load(); }}} className="p-1.5 rounded-lg bg-white shadow text-slate-400 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      {editing && <ClientModal client={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSaved={load} />}
    </>
  );
}

function ClientModal({ client, onClose, onSaved }: { client: Client | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: "", logoLetter: "", colorClass: colors[0] });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { if (client) setForm({ name: client.name, logoLetter: client.logoLetter, colorClass: client.colorClass }); }, [client]);
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setError("Nome é obrigatório."); return; }
    setSaving(true); setError(null);
    try {
      const payload: ClientPayload = {
        name: form.name.trim(), logo_letter: form.logoLetter.trim() || form.name.trim()[0].toUpperCase(),
        color_class: form.colorClass, logo: logoFile || undefined,
      };
      if (client) await updateClient(client.id, payload); else await createClient(payload);
      onSaved(); onClose();
    } catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-brand-navy">{client ? "Editar Cliente" : "Novo Cliente"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>}
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Nome *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-slate-50/50" placeholder="Ex: Empresa XYZ" autoFocus /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Letra do logotipo</label><input value={form.logoLetter} onChange={e => setForm({...form, logoLetter: e.target.value})} maxLength={2} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-slate-50/50" placeholder="X" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Cor</label><div className="flex flex-wrap gap-2">{colors.map(c => <button key={c} type="button" onClick={() => setForm({...form, colorClass: c})} className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c} border-2 ${form.colorClass === c ? "border-brand-navy" : "border-transparent"}`} />)}</div></div>
          <DropZone label="Logotipo" currentUrl={client?.logo} file={logoFile} onFileSelect={setLogoFile} />
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100">Cancelar</button>
            <button type="submit" disabled={saving} className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 disabled:opacity-50"><Save className="h-4 w-4" />{saving ? <ThreeDot variant="bounce" color="#ffffff" size="small" /> : <span>Salvar</span>}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
