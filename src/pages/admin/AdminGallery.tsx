import { useEffect, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { fetchGalleryItems, deleteGalleryItem, createGalleryItem, updateGalleryItem, type GalleryItemPayload } from "../../services/api";
import type { GalleryItem } from "../../types";
import DropZone from "../../components/DropZone";
import { Image, Plus, Pencil, Trash2, AlertCircle, RefreshCw, X, Save } from "lucide-react";

const gradients = [
  "from-violet-500 to-purple-600", "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600", "from-cyan-500 to-blue-600",
];

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<GalleryItem | null | "new">(null);

  async function load() {
    setLoading(true); setError(null);
    try { setItems(await fetchGalleryItems()); }
    catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <Helmet><title>Galeria — IS KENDA</title></Helmet>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-600"><Image className="h-5 w-5" /></div>
            <div><h1 className="text-2xl font-bold text-brand-navy">Galeria</h1><p className="text-sm text-slate-400 mt-0.5">Gerir itens da galeria</p></div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={load} disabled={loading} className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-brand-blue hover:bg-white border border-slate-200 disabled:opacity-50"><RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /></button>
            <button onClick={() => setEditing("new")} className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-orange hover:bg-amber-600"><Plus className="h-4 w-4" /><span>Novo</span></button>
          </div>
        </div>
        {error && <div className="flex items-center space-x-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6"><AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span></div>}
        {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"><div className="h-4 w-28 bg-slate-200 rounded mb-2" /><div className="h-3 w-16 bg-slate-100 rounded" /></div>)}</div>
        : items.length === 0 ? <div className="text-center py-16 bg-white rounded-2xl border border-slate-200"><Image className="h-10 w-10 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500">Nenhum item encontrado</p></div>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                {item.src && (item.src.startsWith("http") || item.src.startsWith("/storage")) ? (
                  <img src={item.src} alt={item.title} className="h-28 w-full object-cover" />
                ) : (
                  <div className={`h-28 bg-gradient-to-br ${item.gradient || "from-slate-200 to-slate-300"} flex items-center justify-center text-4xl`}>
                    {item.icon || <Image className="h-8 w-8 text-white/60" />}
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
                  <p className="text-xs text-slate-500 capitalize">{item.category}</p>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg bg-white shadow text-slate-400 hover:text-brand-blue"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={async () => { if (confirm("Eliminar?")) { await deleteGalleryItem(item.id); load(); }}} className="p-1.5 rounded-lg bg-white shadow text-slate-400 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      {editing && <GalleryModal item={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSaved={load} />}
    </>
  );
}

function GalleryModal({ item, onClose, onSaved }: { item: GalleryItem | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ title: "", category: "evento", gradient: gradients[0], icon: "", src: "" });
  const [srcFile, setSrcFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { if (item) setForm({ title: item.title, category: item.category, gradient: item.gradient, icon: item.icon, src: item.src }); }, [item]);
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim()) { setError("Título e categoria são obrigatórios."); return; }
    setSaving(true); setError(null);
    try {
      const payload: GalleryItemPayload = {
        title: form.title.trim(), category: form.category.trim(),
        gradient: form.gradient, icon: form.icon.trim(), src: form.src.trim(),
        src_file: srcFile || undefined,
      };
      if (item) await updateGalleryItem(item.id, payload); else await createGalleryItem(payload);
      onSaved(); onClose();
    } catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-brand-navy">{item ? "Editar Item" : "Novo Item"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>}
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Título *</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-slate-50/50" placeholder="Ex: Workshop de Contabilidade" autoFocus /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Categoria *</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-slate-50/50">
              <option value="evento">Evento</option>
              <option value="workshop">Workshop</option>
              <option value="espaco">Espaço</option>
              <option value="equipa">Equipa</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Ícone (emoji)</label><input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-slate-50/50" placeholder="Ex: 🏢" /></div>
          <DropZone label="Imagem" accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }} currentUrl={item?.src} file={srcFile} onFileSelect={setSrcFile} />
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Ou URL da imagem</label><input value={form.src} onChange={e => setForm({...form, src: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-slate-50/50" placeholder="https://…" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Gradiente</label><div className="flex flex-wrap gap-2">{gradients.map(g => <button key={g} type="button" onClick={() => setForm({...form, gradient: g})} className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g} border-2 ${form.gradient === g ? "border-brand-navy" : "border-transparent"}`} />)}</div></div>
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100">Cancelar</button>
            <button type="submit" disabled={saving} className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 disabled:opacity-50"><Save className="h-4 w-4" /><span>{saving ? "A salvar…" : "Salvar"}</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}
