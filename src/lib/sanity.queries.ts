import { sanityClient } from './sanity';
import type { ProfileData, ProjectData, SkillData, AboutData, SkillsPageData, ProjectsPageData, ContactPageData } from '../types';

// ─── GROQ Queries ────────────────────────────────────────────────────────────

export const PROFILE_QUERY = `*[_type == "profile"][0]{
  _id,
  name,
  title,
  description,
  "resumeUrl": resumeFile.asset->url,
  email
}`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc){
  _id,
  title,
  description,
  bg,
  "imageUrl": image.asset->url,
  tags,
  sourceCodeUrl,
  liveSiteUrl
}`;

export const SKILLS_QUERY = `*[_type == "skill"] | order(order asc, name asc){
  _id,
  name,
  iconName,
  category,
  color
}`;

// ─── Fetch helpers ────────────────────────────────────────────────────────────

export async function fetchProfile(): Promise<ProfileData | null> {
  try {
    const data = await sanityClient.fetch<ProfileData>(PROFILE_QUERY);
    return data ?? null;
  } catch (err) {
    console.error('Failed to fetch profile from Sanity:', err);
    return null;
  }
}

export async function fetchProjects(): Promise<ProjectData[]> {
  try {
    const data = await sanityClient.fetch<ProjectData[]>(PROJECTS_QUERY);
    return data ?? [];
  } catch (err) {
    console.error('Failed to fetch projects from Sanity:', err);
    return [];
  }
}

export async function fetchSkills(): Promise<SkillData[]> {
  try {
    const data = await sanityClient.fetch<SkillData[]>(SKILLS_QUERY);
    return data ?? [];
  } catch (err) {
    console.error('Failed to fetch skills from Sanity:', err);
    return [];
  }
}

export const ABOUT_QUERY = `*[_type == "about"][0]{
  _id,
  title,
  subtitle,
  bio,
  stats,
  highlights
}`;

export async function fetchAbout(): Promise<AboutData | null> {
  try {
    const data = await sanityClient.fetch<AboutData>(ABOUT_QUERY);
    return data ?? null;
  } catch (err) {
    console.error('Failed to fetch about data from Sanity:', err);
    return null;
  }
}

// ─── Singleton Page Settings Queries ──────────────────────────────────────────

export const SKILLS_PAGE_QUERY = `*[_type == "skillsPage"][0]{
  _id,
  eyebrow,
  title,
  description
}`;

export const PROJECTS_PAGE_QUERY = `*[_type == "projectsPage"][0]{
  _id,
  eyebrow,
  title,
  description
}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0]{
  _id,
  eyebrow,
  title,
  description,
  location,
  responseTime,
  socialLinks[]{
    _key,
    label,
    iconName,
    href,
    color
  }
}`;

// ─── Fetch helpers for page settings ─────────────────────────────────────────

export async function fetchSkillsPage(): Promise<SkillsPageData | null> {
  try {
    const data = await sanityClient.fetch<SkillsPageData>(SKILLS_PAGE_QUERY);
    return data ?? null;
  } catch (err) {
    console.error('Failed to fetch skills page settings:', err);
    return null;
  }
}

export async function fetchProjectsPage(): Promise<ProjectsPageData | null> {
  try {
    const data = await sanityClient.fetch<ProjectsPageData>(PROJECTS_PAGE_QUERY);
    return data ?? null;
  } catch (err) {
    console.error('Failed to fetch projects page settings:', err);
    return null;
  }
}

export async function fetchContactPage(): Promise<ContactPageData | null> {
  try {
    const data = await sanityClient.fetch<ContactPageData>(CONTACT_PAGE_QUERY);
    return data ?? null;
  } catch (err) {
    console.error('Failed to fetch contact page settings:', err);
    return null;
  }
}
