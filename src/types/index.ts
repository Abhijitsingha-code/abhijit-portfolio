import type { Models } from 'appwrite';

export interface ProfileData extends Models.Document {
  name?: string;
  title?: string;
  description?: string;
  resumeUrl?: string;
}

export interface ProjectData extends Models.Document {
  title: string;
  description: string;
  bg?: string;
  imageUrl?: string;
  tags?: string[];
  sourceCodeUrl?: string;
  liveSiteUrl?: string;
}

export interface SkillData extends Models.Document {
  name: string;
  iconName?: string;
}
