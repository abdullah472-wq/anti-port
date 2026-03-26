export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  percentage: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  color: string;
  gradient: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Web' | 'Mobile' | 'Full Stack';
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  lighthouseScore?: number;
  loadTime?: string;
  mobileResponsive?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  content?: string;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  whatsappLink: string;
  location: string;
  address: string;
}
