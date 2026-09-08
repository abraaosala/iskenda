import { createRootRoute, createRoute, createRouter, redirect, Outlet } from "@tanstack/react-router";
import HeadTags from "./components/HeadTags";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminClients from "./pages/admin/AdminClients";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSections from "./pages/admin/AdminSections";
import AdminSiteData from "./pages/admin/AdminSiteData";
import AdminProfileView from "./pages/admin/AdminProfileView";
import AdminProfileEdit from "./pages/admin/AdminProfileEdit";
import AdminProfilePassword from "./pages/admin/AdminProfilePassword";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <HeadTags />
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    if (token) throw redirect({ to: "/admin" });
  },
  component: LoginPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw redirect({ to: "/login" });
  },
  component: AdminLayout,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: AdminDashboard,
});

const adminServicesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/servicos",
  component: AdminServices,
});

const adminTeamRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/equipa",
  component: AdminTeam,
});

const adminClientsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/clientes",
  component: AdminClients,
});

const adminGalleryRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/galeria",
  component: AdminGallery,
});

const adminSiteDataRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/site-data",
  component: AdminSiteData,
});

const adminSectionsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/seccoes",
  component: AdminSections,
});

const adminProfileViewRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/perfil",
  component: AdminProfileView,
});

const adminProfileEditRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/perfil/editar",
  component: AdminProfileEdit,
});

const adminProfilePasswordRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/perfil/alterar-password",
  component: AdminProfilePassword,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  adminRoute.addChildren([
    adminIndexRoute,
    adminServicesRoute,
    adminTeamRoute,
    adminClientsRoute,
    adminGalleryRoute,
    adminSectionsRoute,
    adminSiteDataRoute,
    adminProfileViewRoute,
    adminProfileEditRoute,
    adminProfilePasswordRoute,
  ]),
]);

export const router = createRouter({ routeTree });
