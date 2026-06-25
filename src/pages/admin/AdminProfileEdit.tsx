import { useState, useEffect, useRef, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from "../../services/api";
import SavingOverlay from "../../components/SavingOverlay";
import {
  UserCircle, Mail, ArrowLeft, Save, AlertCircle, CheckCircle2, X,
} from "lucide-react";

export default function AdminProfileEdit() {
  const navigate = useNavigate();
  const { user, login: updateAuth } = useAuth();
  const navigateTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(navigateTimer.current), []);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hasChanges = name !== user?.name || email !== user?.email;
  const isValid = name.trim().length > 0 && email.trim().length > 0 && email.includes("@");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!name.trim() || !email.trim()) {
      setError("Nome e email são obrigatórios.");
      return;
    }
    if (!email.includes("@")) {
      setError("Informe um email válido.");
      return;
    }
    setSaving(true);
    try {
      const result = await updateProfile({ name: name.trim(), email: email.trim() });
      updateAuth(result.token, result.user);
      setSuccess(true);
      clearTimeout(navigateTimer.current);
      navigateTimer.current = setTimeout(() => navigate({ to: "/admin/perfil" }), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao actualizar perfil");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (hasChanges && !confirm("Tem alterações não guardadas. Deseja mesmo sair?")) return;
    navigate({ to: "/admin/perfil" });
  }

  const initials = user?.name
    ? user.name.split(" ").map((s: string) => s[0]).join("").substring(0, 2).toUpperCase()
    : "AD";

  return (
    <>
      <Helmet><title>Editar Perfil — IS KENDA</title></Helmet>
      <SavingOverlay show={saving} />

      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy text-white shadow-sm">
              <UserCircle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-navy">Editar Perfil</h1>
              <p className="text-sm text-slate-400 mt-0.5">Actualizar nome e email</p>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/admin/perfil" })}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 bg-gradient-to-r from-brand-navy/5 to-transparent border-b border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-navy">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="flex items-center gap-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2.5 text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Perfil actualizado com sucesso. A redirecionar…</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                <div className="relative group">
                  <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition bg-white"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition bg-white"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Cancelar</span>
                </button>
                <div className="flex items-center gap-3">
                  {hasChanges && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg font-medium">
                      Alterações não guardadas
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={saving || success || !isValid || !hasChanges}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? "A guardar…" : "Salvar alterações"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
