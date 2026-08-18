export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  featured?: boolean;
}

export interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface SocialLink {
  name: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  headline: string;
  description: string;
  email: string;
  location: string;
}