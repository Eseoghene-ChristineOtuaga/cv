import type { IconType } from "react-icons";
import * as fallback from "@/lib/data";
import type { Note, Project } from "@/lib/data";
import { iconFor } from "@/lib/icons";
import { createPublicClient } from "@/lib/supabase/public";

// Content the admin dashboard edits. Each getter reads Supabase and falls back to
// lib/data.ts when Supabase isn't configured or can't be reached.

export type Skill = { title: string; icon: IconType; text: string; pills: string[] };
export type Interest = { label: string; icon: IconType };
export type Hobby = { title: string; icon: IconType; text: string; tags: string[]; special?: boolean };

type Row = Record<string, unknown>;

async function rows(table: string): Promise<Row[] | null> {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("position")
    .order("created_at");
  if (error) {
    console.error(`Supabase: couldn't load ${table}:`, error.message);
    return null;
  }
  return data;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");
const opt = (v: unknown) => (typeof v === "string" && v ? v : undefined);
const list = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);

export async function getProjects(): Promise<Project[]> {
  const data = await rows("projects");
  if (!data) return fallback.projects;
  return data.map((r) => {
    const src = opt(r.image_url);
    return {
      title: str(r.title),
      text: str(r.text),
      tags: list(r.tags),
      cover: str(r.cover) || str(r.title),
      image: src ? { src, alt: str(r.image_alt) || str(r.title) } : undefined,
      href: opt(r.href),
      status: opt(r.status) ?? "Coming Soon",
    };
  });
}

export async function getSkills(): Promise<Skill[]> {
  const data = await rows("skills");
  if (!data) return fallback.skills;
  return data.map((r) => ({ title: str(r.title), icon: iconFor(str(r.icon)), text: str(r.text), pills: list(r.pills) }));
}

export async function getInterests(): Promise<Interest[]> {
  const data = await rows("interests");
  if (!data) return fallback.interests;
  return data.map((r) => ({ label: str(r.label), icon: iconFor(str(r.icon)) }));
}

export async function getNotes(): Promise<Note[]> {
  const data = await rows("notes");
  if (!data) return fallback.notes;
  return data.map((r) => ({
    title: str(r.title),
    text: str(r.text),
    cover: str(r.cover) || str(r.title),
    date: str(r.date),
    href: opt(r.href),
  }));
}

export async function getHobbies(): Promise<Hobby[]> {
  const data = await rows("hobbies");
  if (!data) return fallback.hobbies;
  return data.map((r) => ({
    title: str(r.title),
    icon: iconFor(str(r.icon)),
    text: str(r.text),
    tags: list(r.tags),
    special: r.special === true,
  }));
}
