import { useEffect, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { fetchTeamMembers, deleteTeamMember, createTeamMember, updateTeamMember, type TeamMemberPayload } from "../../services/api";
import type { TeamMember } from "../../types";
import DropZone from "../../components/DropZone";
import IconPicker from "../../components/IconPicker";
import { ThreeDot } from "react-loading-indicators";
import LoadingOverlay from "../../components/LoadingOverlay";
import SavingOverlay from "../../components/SavingOverlay";
import { Users, Plus, Pencil, Trash2, AlertCircle, RefreshCw, X, Save } from "lucide-react";

const gradients = [
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
];

export default function AdminTeam() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<TeamMember | null | "new">(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchTeamMembers());
    } catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <Helmet><title>Equipa — IS KENDA</title></Helmet>
      <div className="max-w-5xl">
        <Header icon={Users} color="sky" title="Equipa" desc="Gerir membros da equipa" onRefresh={load} loading={loading} onNew={() => setEditing("new")} />
        {error && <ErrorBox message={error} />}

        {loading ? <LoadingOverlay text="A carregar equipa…" /> : items.length === 0 ? (
          <EmptyState icon={Users} text="Nenhum membro encontrado" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow flex items-start justify-between">
                <div className="flex items-center space-x-4 min-w-0">
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient || "from-brand-navy to-brand-blue"} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {item.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 shrink-0 ml-3">
                  <button onClick={() => setEditing(item)} className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors"><Pencil className="h-4 w-4" /></button>
                  <button onClick={async () => { if (confirm("Eliminar?")) { await deleteTeamMember(item.id); load(); }}} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {editing && <TeamModal member={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSaved={load} />}
    </>
  );
}

function TeamModal({ member, onClose, onSaved }: { member: TeamMember | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: "", role: "", description: "", initials: "", gradient: gradients[0], icon: "" });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (member) setForm({ name: member.name, role: member.role, description: member.description, initials: member.initials, gradient: member.gradient, icon: member.icon });
  }, [member]);

  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) { setError("Nome e cargo são obrigatórios."); return; }
    setSaving(true); setError(null);
    try {
      const payload: TeamMemberPayload = {
        name: form.name.trim(), role: form.role.trim(), description: form.description.trim(),
        initials: form.initials.trim() || form.name.split(" ").map((s: string) => s[0]).join("").substring(0, 2).toUpperCase(),
        gradient: form.gradient, icon: form.icon.trim(),
        photo: photoFile || undefined,
      };
      if (member) await updateTeamMember(member.id, payload); else await createTeamMember(payload);
      onSaved(); onClose();
    } catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setSaving(false); }
  }

  return (
    <>
      <SavingOverlay show={saving} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-brand-navy">{member ? "Editar Membro" : "Novo Membro"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nome *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Ex: João Silva" />
            <Field label="Cargo *" value={form.role} onChange={(v) => setForm({ ...form, role: v })} placeholder="Ex: CEO & Fundador" />
            <Field label="Iniciais" value={form.initials} onChange={(v) => setForm({ ...form, initials: v })} placeholder="JS" />
            <IconPicker value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} />
            <DropZone label="Foto" currentUrl={member?.photo} file={photoFile} onFileSelect={setPhotoFile} />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gradiente</label>
              <div className="flex flex-wrap gap-2">
                {gradients.map((g) => (
                  <button key={g} type="button" onClick={() => setForm({ ...form, gradient: g })} className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g} border-2 ${form.gradient === g ? "border-brand-navy" : "border-transparent"}`} />
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50 resize-none" placeholder="Breve descrição do membro…" />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100">Cancelar</button>
            <button type="submit" disabled={saving} className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 disabled:opacity-50"><Save className="h-4 w-4" /><span>{saving ? "A salvar…" : "Salvar"}</span></button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50" placeholder={placeholder} />
    </div>
  );
}

function Header({ icon: Icon, color, title, desc, onRefresh, loading, onNew }: { icon: any; color: string; title: string; desc: string; onRefresh: () => void; loading: boolean; onNew: () => void }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className={`p-2.5 rounded-xl bg-${color}-500/10 text-${color}-600`}><Icon className="h-5 w-5" /></div>
        <div><h1 className="text-2xl font-bold text-brand-navy">{title}</h1><p className="text-sm text-slate-400 mt-0.5">{desc}</p></div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onRefresh} disabled={loading} className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-brand-blue hover:bg-white border border-slate-200 transition-colors disabled:opacity-50">            {loading ? <ThreeDot variant="bounce" color="#64748b" size="small" /> : <RefreshCw className="h-3.5 w-3.5" />}</button>
        <button onClick={onNew} className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 transition-colors"><Plus className="h-4 w-4" /><span>Novo</span></button>
      </div>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return <div className="flex items-center space-x-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6"><AlertCircle className="h-4 w-4 shrink-0" /><span>{message}</span></div>;
}

function EmptyState({ icon: Icon, text }: { icon: any; text: string }) {
  return <div className="text-center py-16 bg-white rounded-2xl border border-slate-200"><Icon className="h-10 w-10 text-slate-300 mx-auto mb-3" /><p className="text-sm text-slate-500">{text}</p></div>;
}
