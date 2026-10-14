"use client";

import { useActionState } from "react";
import { signIn, type FormState } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});

  return (
    <form action={action} className="contact-form admin-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {state.error && <p className="form-status error">{state.error}</p>}
      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
