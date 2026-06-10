import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import {
  fetchCompanyInfo, updateCompanyInfo,
  type CompanyInfoData,
} from "../../services/api";
import {
  Settings, AlertCircle, RefreshCw, Save, Building2,
  Phone, Mail, Clock, MapPin, FileText, Image,
} from "lucide-react";
import DropZone from "../../components/DropZone";

interface FormState {
  name: string;
  full_name: string;
  slogan: string;
  founded_year: number;
  years_experience: number;
  active_clients_count: number;
  phone: string;
  email: string;
  working_hours: string;
  address: string;
  copyright: string;
}

const INITIAL_FORM: FormState = {
  name: "", full_name: "", slogan: "", founded_year: 2022,
  years_experience: 0, active_clients_count: 0, phone: "",
  email: "", working_hours: "", address: "", copyright: "",
};

export default function AdminSiteData() {
  const [data, setData] = useState<CompanyInfoData | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function load() {
    setLoading(true); setError(null);
    try {
      const result = await fetchCompanyInfo();
      setData(result);
      setForm({
        name: result.name,
        full_name: result.full_name,
        slogan: result.slogan,
        founded_year: result.founded_year,
        years_experience: result.years_experience,
        active_clients_count: result.active_clients_count,
        phone: result.phone,
        email: result.email,
        working_hours: result.working_hours,
        address: result.address,
        copyright: result.copyright,
      });
    } catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null); setSuccess(false);
    try {
      const updated = await updateCompanyInfo({
        ...form,
        logo: logoFile || undefined,
        favicon: faviconFile || undefined,
        hero_image: heroFile || undefined,
      });
      setData(updated);
      setLogoFile(null);
      setFaviconFile(null);
      setHeroFile(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) { setError(e instanceof Error ? e.message : "Erro"); }
    finally { setSaving(false); }
  }

  function hasChanges(): boolean {
    if (!data) return false;
    return (
      form.name !== data.name ||
      form.full_name !== data.full_name ||
      form.slogan !== data.slogan ||
      form.founded_year !== data.founded_year ||
      form.years_experience !== data.years_experience ||
      form.active_clients_count !== data.active_clients_count ||
      form.phone !== data.phone ||
      form.email !== data.email ||
      form.working_hours !== data.working_hours ||
      form.address !== data.address ||
      form.copyright !== data.copyright ||
      logoFile !== null ||
      faviconFile !== null ||
      heroFile !== null
    );
  }

  return (
    <>
      <Helmet><title>Site Data — IS KENDA</title></Helmet>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-slate-500/10 text-slate-600"><Settings className="h-5 w-5" /></div>
            <div><h1 className="text-2xl font-bold text-brand-navy">Site Data</h1><p className="text-sm text-slate-400 mt-0.5">Informações da empresa</p></div>
          </div>
          <button onClick={load} disabled={loading} className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-brand-blue hover:bg-white border border-slate-200 disabled:opacity-50"><RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /><span>Actualizar</span></button>
        </div>

        {error && <div className="flex items-center space-x-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6"><AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span></div>}
        {success && <div className="flex items-center space-x-2.5 text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-6"><Save className="h-4 w-4 shrink-0" /><span>Dados actualizados com sucesso.</span></div>}

        {loading && !data ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"><div className="h-4 w-40 bg-slate-200 rounded mb-2" /><div className="h-3 w-60 bg-slate-100 rounded" /></div>)}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Section title="Imagens" icon={Image}>
              <div className="grid grid-cols-2 gap-4">
                <DropZone label="Logótipo" currentUrl={data?.logo} file={logoFile} onFileSelect={setLogoFile} />
                <DropZone label="Favicon" currentUrl={data?.favicon} file={faviconFile} onFileSelect={setFaviconFile} accept={{ "image/*": [".ico", ".jpg", ".jpeg", ".png", ".webp"] }} />
              </div>
              <div className="mt-4">
                <DropZone label="Imagem Hero" currentUrl={data?.hero_image} file={heroFile} onFileSelect={setHeroFile} />
              </div>
            </Section>
            <Section title="Empresa" icon={Building2}>
              <Field label="Nome" value={form.name} onChange={(v) => setForm({...form, name: v})} />
              <Field label="Nome completo" value={form.full_name} onChange={(v) => setForm({...form, full_name: v})} />
              <Field label="Slogan" value={form.slogan} onChange={(v) => setForm({...form, slogan: v})} />
              <div className="grid grid-cols-3 gap-4">
                <Field label="Ano de fundação" type="number" value={String(form.founded_year)} onChange={(v) => setForm({...form, founded_year: Number(v)})} />
                <Field label="Anos de experiência" type="number" value={String(form.years_experience)} onChange={(v) => setForm({...form, years_experience: Number(v)})} />
                <Field label="Clientes activos" type="number" value={String(form.active_clients_count)} onChange={(v) => setForm({...form, active_clients_count: Number(v)})} />
              </div>
            </Section>
            <Section title="Contactos" icon={Phone}>
              <Field label="Telefone" value={form.phone} onChange={(v) => setForm({...form, phone: v})} />
              <Field label="Email" value={form.email} onChange={(v) => setForm({...form, email: v})} />
            </Section>
            <Section title="Horário & Endereço" icon={Clock}>
              <Field label="Horário" value={form.working_hours} onChange={(v) => setForm({...form, working_hours: v})} />
              <Field label="Endereço" value={form.address} onChange={(v) => setForm({...form, address: v})} />
            </Section>
            <Section title="Rodapé" icon={FileText}>
              <Field label="Copyright" value={form.copyright} onChange={(v) => setForm({...form, copyright: v})} />
            </Section>
            <div className="flex items-center justify-end space-x-3 pb-8">
              <button type="submit" disabled={saving || !hasChanges()} className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 disabled:opacity-50 transition-colors">
                <Save className="h-4 w-4" />
                <span>{saving ? "A salvar…" : "Salvar alterações"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-100">
        <Icon className="h-4 w-4 text-brand-blue" />
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50" placeholder={placeholder} />
    </div>
  );
}
