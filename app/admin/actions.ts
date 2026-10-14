"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getSection, type Section } from "@/lib/admin/sections";
import { requireAdmin } from "@/lib/admin/auth";
import { iconNames } from "@/lib/icons";
import { supabaseConfigured } from "@/lib/supabase/env";
import { CONTENT_TAG } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string };

const BUCKET = "media";
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!supabaseConfigured) return { error: "Supabase isn't set up yet. Add the keys to .env.local first." };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "That email and password don't match." };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function refresh(sectionKey: string, section: Section) {
  updateTag(CONTENT_TAG);
  section.paths.forEach((p) => revalidatePath(p));
  revalidatePath(`/admin/${sectionKey}`);
}

function storagePath(url: unknown) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  return typeof url === "string" && url.includes(marker) ? url.split(marker)[1] : null;
}

export async function saveItem(
  sectionKey: string,
  id: string | null,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const section = getSection(sectionKey);
  if (!section) return { error: "Unknown section." };
  const { supabase } = await requireAdmin();

  const row: Record<string, unknown> = {};
  let replacedImage: string | null = null;

  for (const field of section.fields) {
    const raw = formData.get(field.name);
    const value = typeof raw === "string" ? raw.trim() : "";

    switch (field.kind) {
      case "list":
        row[field.name] = value.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
        break;
      case "checkbox":
        row[field.name] = raw === "on";
        break;
      case "icon":
        row[field.name] = iconNames.includes(value) ? value : "FaStar";
        break;
      case "image": {
        const file = formData.get(`${field.name}_file`);
        const remove = formData.get(`${field.name}_remove`) === "on";
        let url: string | null = value || null;

        if (file instanceof File && file.size > 0) {
          if (!file.type.startsWith("image/")) return { error: "That file isn't an image." };
          if (file.size > MAX_IMAGE_BYTES) return { error: "Images must be under 4 MB." };
          const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
          const path = `${sectionKey}/${crypto.randomUUID()}.${ext}`;
          const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
          if (error) return { error: `Image upload failed: ${error.message}` };
          url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
        } else if (remove) {
          url = null;
        }
        if (url !== (value || null)) replacedImage = value;
        row[field.name] = url;
        break;
      }
      default:
        if (field.required && !value) return { error: `${field.label} is required.` };
        row[field.name] = value || (field.nullable ? null : "");
    }
  }

  if (id) {
    const { error } = await supabase.from(sectionKey).update(row).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { data: last } = await supabase
      .from(sectionKey)
      .select("position")
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();
    row.position = (last?.position ?? -1) + 1;
    const { error } = await supabase.from(sectionKey).insert(row);
    if (error) return { error: error.message };
  }

  const oldFile = storagePath(replacedImage);
  if (oldFile) await supabase.storage.from(BUCKET).remove([oldFile]);

  refresh(sectionKey, section);
  redirect(`/admin/${sectionKey}`);
}

export async function deleteItem(sectionKey: string, id: string) {
  const section = getSection(sectionKey);
  if (!section) return;
  const { supabase } = await requireAdmin();

  const { data } = await supabase.from(sectionKey).delete().eq("id", id).select().maybeSingle();
  const files = section.fields
    .filter((f) => f.kind === "image")
    .map((f) => storagePath(data?.[f.name]))
    .filter((p): p is string => Boolean(p));
  if (files.length) await supabase.storage.from(BUCKET).remove(files);

  refresh(sectionKey, section);
}

export async function moveItem(sectionKey: string, id: string, direction: -1 | 1) {
  const section = getSection(sectionKey);
  if (!section) return;
  const { supabase } = await requireAdmin();

  const { data } = await supabase.from(sectionKey).select("id").order("position").order("created_at");
  if (!data) return;
  const ids = data.map((r) => r.id as string);
  const from = ids.indexOf(id);
  const to = from + direction;
  if (from < 0 || to < 0 || to >= ids.length) return;
  [ids[from], ids[to]] = [ids[to], ids[from]];

  // Renumber everything so positions stay tidy (0, 1, 2…).
  await Promise.all(ids.map((rowId, position) => supabase.from(sectionKey).update({ position }).eq("id", rowId)));

  refresh(sectionKey, section);
}
