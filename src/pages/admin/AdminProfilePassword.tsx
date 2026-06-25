import { useState, useEffect, useRef, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "@tanstack/react-router";
import { changePassword } from "../../services/api";
import SavingOverlay from "../../components/SavingOverlay";
import {
  Lock, ArrowLeft, Save, AlertCircle, CheckCircle2, X, ShieldCheck, Eye, EyeOff,
} from "lucide-react";

export default function AdminProfilePassword() {
  const navigate = useNavigate();
  const navigateTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(navigateTimer.current), []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const minLength = 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasMinLength = newPassword.length >= minLength;
  const passwordsMatch = newPassword === newPasswordConfirmation && newPassword.length > 0;
  const strength = [hasUpper, hasLower, hasNumber, hasMinLength].filter(Boolean).length;

  const strengthLabel = ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte"][strength];
  const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"][strength];
  const strengthTextColor = ["text-red-600", "text-orange-600", "text-yellow-600", "text-lime-600", "text-green-600"][strength];

  const canSubmit = currentPassword && hasMinLength && hasUpper && hasLower && hasNumber && passwordsMatch;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!currentPassword || !newPassword) {
      setError("Preencha todos os campos.");
      return;
    }
    if (!hasMinLength) {
      setError(`A nova palavra-passe deve ter pelo menos ${minLength} caracteres.`);
      return;
    }
    if (!passwordsMatch) {
      setError("As palavras-passe não coincidem.");
      return;
    }
    setSaving(true);
    try {
      await changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPasswordConfirmation,
      });
      setSuccess(true);
      clearTimeout(navigateTimer.current);
      navigateTimer.current = setTimeout(() => navigate({ to: "/admin/perfil" }), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao alterar palavra-passe");
    } finally {
      setSaving(false);
    }
  }

  function PasswordInput({ value, onChange, show, onToggleShow, placeholder, label }: {
    value: string; onChange: (v: string) => void; show: boolean; onToggleShow: () => void; placeholder: string; label: string;
  }) {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        <div className="relative group">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition bg-white"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={onToggleShow}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Alterar Palavra-passe — IS KENDA</title></Helmet>
      <SavingOverlay show={saving} />

      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy text-white shadow-sm">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-navy">Alterar Palavra-passe</h1>
              <p className="text-sm text-slate-400 mt-0.5">Definir uma nova palavra-passe segura</p>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/admin/perfil" })}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              {error && (
                <div className="flex items-center gap-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2.5 text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Palavra-passe alterada com sucesso. A redirecionar…</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <PasswordInput
                  label="Palavra-passe actual"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  show={showCurrent}
                  onToggleShow={() => setShowCurrent(!showCurrent)}
                  placeholder="Palavra-passe actual"
                />

                <div className="border-t border-slate-100 pt-5">
                  <PasswordInput
                    label="Nova palavra-passe"
                    value={newPassword}
                    onChange={setNewPassword}
                    show={showNew}
                    onToggleShow={() => setShowNew(!showNew)}
                    placeholder="Nova palavra-passe"
                  />

                  {newPassword.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                            style={{ width: `${(strength / 4) * 100}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-semibold ${strengthTextColor} shrink-0`}>
                          {strengthLabel}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        <Requirement met={hasMinLength} text={`Mínimo ${minLength} caracteres`} />
                        <Requirement met={hasUpper} text="Pelo menos uma letra maiúscula" />
                        <Requirement met={hasLower} text="Pelo menos uma letra minúscula" />
                        <Requirement met={hasNumber} text="Pelo menos um número" />
                      </ul>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <PasswordInput
                    label="Confirmar nova palavra-passe"
                    value={newPasswordConfirmation}
                    onChange={setNewPasswordConfirmation}
                    show={showConfirm}
                    onToggleShow={() => setShowConfirm(!showConfirm)}
                    placeholder="Repetir nova palavra-passe"
                  />
                  {newPasswordConfirmation.length > 0 && (
                    <div className="mt-2">
                      <Requirement met={passwordsMatch} text="As palavras-passe coincidem" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/admin/perfil" })}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Cancelar</span>
                  </button>
                  <button
                    type="submit"
                    disabled={saving || success || !canSubmit}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? "A alterar…" : "Alterar palavra-passe"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-4 w-4 text-brand-blue" />
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Dicas de Segurança</p>
            </div>
            <ul className="space-y-2.5">
              {[
                "Use pelo menos 8 caracteres",
                "Combine maiúsculas e minúsculas",
                "Inclua números",
                "Evite palavras comuns ou datas pessoais",
                "Não reutilize palavras-passe de outros sites",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 mt-1.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function Requirement({ met, text }: { met: boolean; text: string }) {
  return (
    <li className="flex items-center gap-2 text-xs">
      <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
        met ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-300"
      }`}>
        {met ? (
          <CheckCircle2 className="h-3 w-3" />
        ) : (
          <span className="text-[10px] font-bold">•</span>
        )}
      </span>
      <span className={met ? "text-green-700 font-medium" : "text-slate-400"}>{text}</span>
    </li>
  );
}
