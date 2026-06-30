declare module "react/jsx-runtime";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useSiteData } from "../../contexts/SiteDataContext";
import {
  LogOut, Landmark, LayoutDashboard, Briefcase, Users,
  Star, Image, Settings, Menu, UserCircle,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Serviços", icon: Briefcase, path: "/admin/servicos" },
  { label: "Equipa", icon: Users, path: "/admin/equipa" },
  { label: "Clientes", icon: Star, path: "/admin/clientes" },
  { label: "Galeria", icon: Image, path: "/admin/galeria" },
  { label: "Site Data", icon: Settings, path: "/admin/site-data" },
  { label: "Meu Perfil", icon: UserCircle, path: "/admin/perfil" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { company } = useSiteData();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <>
      <Helmet>
        <title>Admin — IS KENDA</title>
      </Helmet>
      <div className="h-screen flex overflow-hidden bg-slate-50">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-brand-navy to-[#0a1f3d] transition-all duration-300 h-screen shrink-0 ${
            collapsed ? "w-[72px]" : "w-[260px]"
          } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className={`flex items-center h-16 border-b border-white/5 px-4 ${collapsed ? "justify-center" : ""}`}>
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {company.logoScroll ? (
                <img src={company.logoScroll} alt={company.name} className="h-8 w-auto shrink-0" />
              ) : (
                <div className="p-2 rounded-xl bg-white/10 text-brand-orange shrink-0">
                  <Landmark className="h-5 w-5" />
                </div>
              )}
              {!collapsed && (
                <span className="font-bold text-base text-white tracking-tight truncate">
                  {company.name}
                </span>
              )}
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
              aria-label={collapsed ? "Expandir" : "Recolher"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate({ to: item.path });
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center rounded-xl transition-all duration-200 ${
                    collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5 space-x-3"
                  } ${
                    isActive
                      ? "bg-brand-orange/20 text-brand-orange"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`shrink-0 ${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-white/5 p-3">
            {!collapsed && (
              <div className="px-1 mb-3">
                <p className="text-xs text-white/30 truncate">{user?.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors ${
                collapsed ? "justify-center py-3" : "px-3 py-2.5 space-x-3"
              }`}
              title={collapsed ? "Sair" : undefined}
            >
              <LogOut className={`shrink-0 ${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
              {!collapsed && <span className="text-sm font-medium">Sair</span>}
            </button>
          </div>
        </aside>

        <div className="flex flex-col min-w-0 flex-1">
          <header className="lg:hidden bg-white border-b border-slate-200 h-16 flex items-center px-4 sticky top-0 z-30">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="ml-3 font-bold text-brand-navy">IS KENDA — Admin</span>
          </header>

          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
