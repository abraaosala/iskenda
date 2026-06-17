import { type FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";
import { fetchAuthUser } from "../../services/api";
import {
  UserCircle, Mail, Pencil, Lock, Calendar, ShieldCheck,
  Briefcase, Users, Star, Settings,
} from "lucide-react";

interface AuthUserDetails {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function AdminProfileView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [details, setDetails] = useState<AuthUserDetails | null>(null);

  useEffect(() => {
    fetchAuthUser()
      .then(setDetails)
      .catch(() => {});
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((s: string) => s[0]).join("").substring(0, 2).toUpperCase()
    : "AD";

  const quickLinks = [
    { icon: Briefcase, label: "Serviços", path: "/admin/servicos" },
    { icon: Users, label: "Equipa", path: "/admin/equipa" },
    { icon: Star, label: "Clientes", path: "/admin/clientes" },
    { icon: Settings, label: "Configurações", path: "/admin/site-data" },
  ];

  return (
    <>
      <Helmet><title>Meu Perfil — IS KENDA</title></Helmet>

      <div className="w-full max-w-4xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy text-white shadow-sm">
            <UserCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Meu Perfil</h1>
            <p className="text-sm text-slate-400 mt-0.5">Informações da sua conta</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-20 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy/80" />
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end -mt-10 gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center text-white font-bold text-2xl shadow-lg border-4 border-white shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0 pt-2 sm:pt-0 sm:pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-lg font-bold text-brand-navy truncate">{user?.name}</p>
                      {details?.isAdmin && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-200">
                          <ShieldCheck className="h-3 w-3" />
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </div>
                    <p className="text-sm text-slate-900 font-medium break-all">{user?.email}</p>
                  </div>
                  {details?.createdAt && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        <Calendar className="h-3.5 w-3.5" />
                        Membro desde
                      </div>
                      <p className="text-sm text-slate-900 font-medium">
                        {new Date(details.createdAt).toLocaleDateString("pt-PT", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate({ to: "/admin/perfil/editar" })}
                  className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-orange hover:bg-amber-600 transition-colors shadow-sm"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Editar Perfil</span>
                </button>
                <button
                  onClick={() => navigate({ to: "/admin/perfil/alterar-password" })}
                  className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  <span>Alterar Palavra-passe</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick links sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Acesso Rápido
              </p>
              <div className="space-y-1">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate({ to: item.path })}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
