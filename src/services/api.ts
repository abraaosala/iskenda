import type { Service, Client, Course, AcademyOffer, CompanyValue, TeamMember, GalleryItem } from "../types";
import type { SocialLink } from "../types";

const API_ORIGIN = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = API_ORIGIN ? `${API_ORIGIN}/api` : "/api";

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleAuthError(res: Response): Promise<void> {
  if (res.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    const loginUrl = new URL("/login", window.location.origin);
    if (window.location.pathname !== loginUrl.pathname) {
      window.location.href = loginUrl.pathname;
    }
  }
}

async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, init);
  if (!res.ok) await handleAuthError(res);
  return res;
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (body.errors) {
      const first = Object.values(body.errors)[0];
      return Array.isArray(first) ? first[0] : String(first);
    }
    return body.message || `Erro do servidor (${res.status})`;
  } catch {
    return `Erro do servidor (${res.status})`;
  }
}

function buildFormData(data: object): FormData {
  const fd = new FormData();
  for (const [key, val] of Object.entries(data)) {
    if (val !== undefined && val !== null) {
      const value = val instanceof File
        ? val
        : Array.isArray(val) || typeof val === "object"
          ? JSON.stringify(val)
          : String(val);
      fd.append(key, value);
    }
  }
  return fd;
}

export interface SiteData {
  company: {
    name: string;
    fullName: string;
    slogan: string;
    foundedYear: number;
    yearsExperience: number;
    activeClientsCount: number;
    phone: string;
    email: string;
    workingHours: string;
    address: string;
    copyright: string;
    logo: string | null;
    favicon: string | null;
    heroImage: string | null;
    logoScroll: string | null;
  };
  services: Service[];
  clients: Client[];
  courses: Course[];
  academyOffers: AcademyOffer[];
  values: CompanyValue[];
  team: TeamMember[];
  gallery: GalleryItem[];
  socialLinks: SocialLink[];
}

export async function fetchSiteData(): Promise<SiteData> {
  const res = await fetch(`${BASE_URL}/site-data`);
  if (!res.ok) throw new Error(`Failed to fetch site data: ${res.status}`);
  return res.json();
}

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service_area: string;
  message?: string;
}

export async function submitContact(data: ContactPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to submit contact: ${res.status}`);
}

export interface AuthUserDetails {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export async function fetchAuthUser(): Promise<AuthUserDetails> {
  const res = await apiFetch(`${BASE_URL}/auth/me`, { headers: authHeaders() });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export interface LoginResponse {
  token: string;
  user: { name: string; email: string };
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const msg = res.status === 401 ? "Credenciais inválidas." : `Erro do servidor (${res.status})`;
    throw new Error(msg);
  }
  return res.json();
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
}

export interface UpdateProfileResponse {
  user: { name: string; email: string };
  token: string;
}

export async function updateProfile(data: UpdateProfilePayload): Promise<UpdateProfileResponse> {
  const res = await apiFetch(`${BASE_URL}/auth/me`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export async function changePassword(data: ChangePasswordPayload): Promise<void> {
  const res = await apiFetch(`${BASE_URL}/auth/password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export interface RecentContact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  serviceArea: string;
  message?: string;
  createdAt: string;
}

export interface AdminDashboard {
  stats: {
    services: number;
    clients: number;
    team: number;
    gallery: number;
    experience: { years: number; suffix: string };
  };
  recentContacts: RecentContact[];
}

export async function fetchAdminDashboard(): Promise<AdminDashboard> {
  const res = await apiFetch(`${BASE_URL}/admin/dashboard`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
  const json = await res.json();
  if (json.recentContacts?.data) {
    json.recentContacts = json.recentContacts.data;
  }
  return json;
}

export async function fetchServices(): Promise<Service[]> {
  const res = await apiFetch(`${BASE_URL}/admin/services`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
  const json = await res.json();
  return json.data ?? json;
}

export async function deleteService(id: string): Promise<void> {
  const res = await apiFetch(`${BASE_URL}/admin/services/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export interface ServicePayload {
  title: string;
  description: string;
  icon: string;
  features: string[];
  sort_order?: number;
}

export async function createService(data: ServicePayload): Promise<Service> {
  const res = await apiFetch(`${BASE_URL}/admin/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function updateService(id: string, data: Partial<ServicePayload>): Promise<Service> {
  const res = await apiFetch(`${BASE_URL}/admin/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

/* ─── Team Members ─── */

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const res = await apiFetch(`${BASE_URL}/admin/team-members`, { headers: authHeaders() });
  if (!res.ok) throw new Error(await parseError(res));
  const json = await res.json();
  return json.data ?? json;
}

export interface TeamMemberPayload {
  name: string;
  role: string;
  description: string;
  initials: string;
  color_class?: string;
  gradient?: string;
  icon?: string;
  photo?: File;
}

export async function createTeamMember(data: TeamMemberPayload): Promise<TeamMember> {
  if (data.photo) {
    const fd = buildFormData(data);
    const res = await apiFetch(`${BASE_URL}/admin/team-members`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
  }
  const res = await apiFetch(`${BASE_URL}/admin/team-members`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function updateTeamMember(id: string, data: Partial<TeamMemberPayload>): Promise<TeamMember> {
  if (data.photo) {
    const fd = buildFormData(data);
    fd.append("_method", "PUT");
    const res = await apiFetch(`${BASE_URL}/admin/team-members/${id}`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
  }
  const res = await apiFetch(`${BASE_URL}/admin/team-members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function deleteTeamMember(id: string): Promise<void> {
  const res = await apiFetch(`${BASE_URL}/admin/team-members/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

/* ─── Clients ─── */

export async function fetchClients(): Promise<Client[]> {
  const res = await apiFetch(`${BASE_URL}/admin/clients`, { headers: authHeaders() });
  if (!res.ok) throw new Error(await parseError(res));
  const json = await res.json();
  return json.data ?? json;
}

export interface ClientPayload {
  name: string;
  logo_letter?: string;
  color_class?: string;
  logo?: File;
}

export async function createClient(data: ClientPayload): Promise<Client> {
  if (data.logo) {
    const fd = buildFormData(data);
    const res = await apiFetch(`${BASE_URL}/admin/clients`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
  }
  const res = await apiFetch(`${BASE_URL}/admin/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function updateClient(id: string, data: Partial<ClientPayload>): Promise<Client> {
  if (data.logo) {
    const fd = buildFormData(data);
    fd.append("_method", "PUT");
    const res = await apiFetch(`${BASE_URL}/admin/clients/${id}`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
  }
  const res = await apiFetch(`${BASE_URL}/admin/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function deleteClient(id: string): Promise<void> {
  const res = await apiFetch(`${BASE_URL}/admin/clients/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

/* ─── Company Info ─── */

export interface CompanyInfoData {
  id: number;
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
  logo: string | null;
  favicon: string | null;
  hero_image: string | null;
  logo_scroll: string | null;
  social_links?: SocialLink[];
}

export interface CompanyInfoPayload extends Omit<Partial<CompanyInfoData>, "logo" | "favicon" | "hero_image" | "logo_scroll"> {
  logo?: File;
  favicon?: File;
  hero_image?: File;
  logo_scroll?: File;
  social_links?: SocialLink[];
}

export async function fetchCompanyInfo(): Promise<CompanyInfoData> {
  const res = await apiFetch(`${BASE_URL}/admin/company-info`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function updateCompanyInfo(data: CompanyInfoPayload): Promise<CompanyInfoData> {
  const hasFiles = data.logo instanceof File || data.favicon instanceof File || data.hero_image instanceof File || data.logo_scroll instanceof File;
  if (hasFiles) {
    const fd = buildFormData(data);
    fd.append("_method", "PUT");
    const res = await apiFetch(`${BASE_URL}/admin/company-info`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
  }
  const res = await apiFetch(`${BASE_URL}/admin/company-info`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

/* ─── Gallery Items ─── */

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const res = await apiFetch(`${BASE_URL}/admin/gallery-items`, { headers: authHeaders() });
  if (!res.ok) throw new Error(await parseError(res));
  const json = await res.json();
  return json.data ?? json;
}

export interface GalleryItemPayload {
  title: string;
  category: string;
  gradient?: string;
  icon?: string;
  src?: string;
  src_file?: File;
}

export async function createGalleryItem(data: GalleryItemPayload): Promise<GalleryItem> {
  if (data.src_file) {
    const fd = buildFormData(data);
    const res = await apiFetch(`${BASE_URL}/admin/gallery-items`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
  }
  const res = await apiFetch(`${BASE_URL}/admin/gallery-items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItemPayload>): Promise<GalleryItem> {
  if (data.src_file) {
    const fd = buildFormData(data);
    fd.append("_method", "PUT");
    const res = await apiFetch(`${BASE_URL}/admin/gallery-items/${id}`, {
      method: "POST",
      headers: authHeaders(),
      body: fd,
    });
    if (!res.ok) throw new Error(await parseError(res));
    return res.json();
  }
  const res = await apiFetch(`${BASE_URL}/admin/gallery-items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const res = await apiFetch(`${BASE_URL}/admin/gallery-items/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
}
