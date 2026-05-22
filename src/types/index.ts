// Sanity document types — no Appwrite Models dependency

export interface ProfileData {
  _id: string;
  name?: string;
  title?: string;
  description?: string;
  resumeUrl?: string;
  email?: string;
}

export interface ProjectData {
  _id: string;
  title: string;
  description: string;
  bg?: string;
  imageUrl?: string;
  tags?: string[];
  sourceCodeUrl?: string;
  liveSiteUrl?: string;
  order?: number;
}

export interface SkillData {
  _id: string;
  name: string;
  iconName?: string;
  category?: string;
  color?: string;
  order?: number;
}

export interface AboutData {
  _id: string;
  title?: string;
  subtitle?: string;
  bio?: string[];
  stats?: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  highlights?: Array<{
    iconName: string;
    label: string;
    color: string;
  }>;
}

export interface SkillsPageData {
  _id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export interface ProjectsPageData {
  _id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export interface ContactPageSocialLink {
  _key: string;
  label: string;
  iconName?: string;
  href: string;
  color?: string;
}

export interface ContactPageData {
  _id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  location?: string;
  responseTime?: string;
  socialLinks?: ContactPageSocialLink[];
}
