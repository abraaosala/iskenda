export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  sortOrder?: number;
  isVisible?: boolean;
}

export interface Client {
  id: string;
  name: string;
  logoLetter: string;
  colorClass: string;
  logo?: string | null;
  isVisible?: boolean;
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  description: string;
  modules: string[];
  icon: string;
  isVisible?: boolean;
}

export interface AcademyOffer {
  title: string;
  description: string;
  icon: string;
  isVisible?: boolean;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
  isVisible?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  initials: string;
  colorClass: string;
  gradient: string;
  icon: string;
  photo?: string | null;
  isVisible?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  icon: string;
  src: string;
  isVisible?: boolean;
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

export interface SiteSection {
  key: string;
  label: string;
  isVisible: boolean;
  sortOrder?: number;
}

export type SectionVisibility = Partial<Record<string, boolean>>;
