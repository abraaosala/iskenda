export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  sortOrder?: number;
}

export interface Client {
  id: string;
  name: string;
  logoLetter: string;
  colorClass: string;
  logo?: string | null;
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  description: string;
  modules: string[];
  icon: string;
}

export interface AcademyOffer {
  title: string;
  description: string;
  icon: string;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
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
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  icon: string;
  src: string;
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}
