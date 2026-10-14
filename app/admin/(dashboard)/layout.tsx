import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin/auth";
import { sections } from "@/lib/admin/sections";
import { signOut } from "../actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  const tabs = Object.entries(sections).map(([key, s]) => ({ href: `/admin/${key}`, label: s.label }));

  return (
    <section className="section admin">
      <div className="container">
        <div className="admin-top">
          <div>
            <h1 className="admin-heading">Dashboard</h1>
            <p className="admin-muted">Signed in as {user.email}</p>
          </div>
          <form action={signOut}>
            <button type="submit" className="btn secondary">
              Sign out
            </button>
          </form>
        </div>
        <AdminNav tabs={tabs} />
        {children}
      </div>
    </section>
  );
}
