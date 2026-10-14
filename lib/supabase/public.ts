import { createClient } from "@supabase/supabase-js";
import { supabaseConfigured, supabaseKey, supabaseUrl } from "./env";

// Every public read is tagged so the admin dashboard can refresh the site after an edit.
export const CONTENT_TAG = "content";

export function createPublicClient() {
  if (!supabaseConfigured) return null;
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { tags: [CONTENT_TAG], revalidate: 3600 } }),
    },
  });
}
