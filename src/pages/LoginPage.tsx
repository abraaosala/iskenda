import { useState, FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "@tanstack/react-router";
import { ThreeDot } from "react-loading-indicators";
import SavingOverlay from "../components/SavingOverlay";
import { Landmark, LogIn, AlertCircle, Eye, EyeOff, Mail, Lock, Building2, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const msg = res.status === 401
          ? "Credenciais inválidas."
          : "Erro do servidor. Tente novamente.";
        throw new Error(msg);
      }
      const data = await res.json();
      login(data.token, data.user);
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login — IS KENDA</title>
      </Helmet>
      <div className="min-h-screen flex">
      {/* Sidebar — Branding */}
      <div className="hidden lg:flex w-[440px] min-h-screen bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-10 -left-10 w-72 h-72 rounded-full bg-white" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-orange" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 text-brand-orange mb-6 ring-1 ring-white/5">
            <Landmark className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            IS KENDA
          </h1>
          <p className="text-sm text-white/50 mt-2 max-w-[280px] leading-relaxed">
            Consultoria & Academia — Soluções empresariais para o crescimento do seu negócio em Angola.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
              <p className="text-sm text-white/60 leading-relaxed">
                Gerencia os serviços, equipa e conteúdos do site num só lugar.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
              <p className="text-sm text-white/60 leading-relaxed">
                Actualiza cursos, preços e informações em tempo real.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
              <p className="text-sm text-white/60 leading-relaxed">
                Acompanha os pedidos de contacto dos seus clientes.
              </p>
            </div>
          </div>
        </div>

        <div className="relative space-y-4">
          <div className="flex items-center space-x-3 text-white/30">
            <div className="h-px flex-1 bg-white/10" />
            <Building2 className="h-4 w-4" />
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-xs text-white/20 text-center">
            2026 — IS KENDA CONSULTORIA & ACADEMIA
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile brand hint */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-navy/10 text-brand-navy mb-3">
              <Landmark className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-extrabold text-brand-navy tracking-tight">
              IS KENDA
            </h1>
            <p className="text-xs text-slate-400 mt-1">Acesso restrito</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900">Bem-vindo</h2>
              <p className="text-sm text-slate-500 mt-1">
                Aceda ao painel administrativo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center space-x-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@iskenda.co.ao"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Palavra-passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 text-brand-dark font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-brand-orange/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                <LogIn className="h-4 w-4" />
                <span>{loading ? "A entrar…" : "Entrar"}</span>
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate({ to: "/" })}
                  className="flex items-center justify-center space-x-1.5 w-full text-xs text-slate-400 hover:text-brand-blue transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Voltar ao site</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <SavingOverlay show={loading} />
    </>
  );
}
