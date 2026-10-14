import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

// Returns a Supabase client signed in as an admin, or sends the visitor to the login page.
export async function requireAdmin() {
  if (!supabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?error=not-admin");

  return { supabase, user: data.user };
}
