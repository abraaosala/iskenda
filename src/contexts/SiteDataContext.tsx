import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchSiteData, type SiteData } from "../services/api";
import {
  COMPANY_INFO as FALLBACK_COMPANY,
  SERVICES as FALLBACK_SERVICES,
  CLIENTS as FALLBACK_CLIENTS,
  VALUES as FALLBACK_VALUES,
  ACADEMIA_COURSES as FALLBACK_COURSES,
  ACADEMIA_OFFERS as FALLBACK_OFFERS,
  TEAM_MEMBERS as FALLBACK_TEAM,
  GALLERY_ITEMS as FALLBACK_GALLERY,
  SOCIAL_LINKS as FALLBACK_SOCIAL,
} from "../data";
import type { SocialLink } from "../types";

interface SiteDataContextValue {
  loading: boolean;
  error: string | null;
  company: SiteData["company"];
  services: SiteData["services"];
  clients: SiteData["clients"];
  courses: SiteData["courses"];
  academyOffers: SiteData["academyOffers"];
  values: SiteData["values"];
  team: SiteData["team"];
  gallery: SiteData["gallery"];
  socialLinks: SocialLink[];
  refresh: () => void;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSiteData();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const value: SiteDataContextValue = {
    loading,
    error,
    company: data?.company ?? FALLBACK_COMPANY,
    services: data?.services ?? FALLBACK_SERVICES,
    clients: data?.clients ?? FALLBACK_CLIENTS,
    courses: data?.courses ?? FALLBACK_COURSES,
    academyOffers: data?.academyOffers ?? FALLBACK_OFFERS,
    values: data?.values ?? FALLBACK_VALUES,
    team: data?.team ?? FALLBACK_TEAM,
    gallery: data?.gallery ?? FALLBACK_GALLERY,
    socialLinks: data?.socialLinks ?? FALLBACK_SOCIAL,
    refresh: load,
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
