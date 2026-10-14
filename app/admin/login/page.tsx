import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <section className="section admin">
      <div className="container admin-narrow">
        <h1 className="section-title">Welcome back</h1>
        {error === "not-admin" && (
          <p className="form-status error">This account isn&apos;t on the admin list yet.</p>
        )}
        <LoginForm />
      </div>
    </section>
  );
}
