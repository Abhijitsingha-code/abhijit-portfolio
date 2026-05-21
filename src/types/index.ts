// Sanity document types — no Appwrite Models dependency

export interface ProfileData {
  _id: string;
  name?: string;
  title?: string;
  description?: string;
  resumeUrl?: string;
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
