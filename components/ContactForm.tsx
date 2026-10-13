"use client";

import { useState, type FormEvent } from "react";
import { FaSpinner } from "react-icons/fa6";

const ENDPOINT = "https://formspree.io/f/mwpnzjnp";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const sending = status.state === "sending";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus({ state: "error", message: "Please fill in all fields before sending." });
      return;
    }

    setStatus({ state: "sending" });

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus({ state: "success", message: "Thanks for reaching out! I will get back to you shortly." });
        form.reset();
      } else {
        const body = await response.json().catch(() => ({}));
        const errorMsg =
          (body?.errors && body.errors.map((err: { message: string }) => err.message).join(", ")) ||
          "Oops! There was a problem sending your message. Please try again.";
        setStatus({ state: "error", message: errorMsg });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your internet connection and try again." });
    }
  }

  return (
    <div className="contact-form fade-in">
      <form action={ENDPOINT} method="POST" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" autoComplete="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            autoComplete="email"
            inputMode="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your message" required />
        </div>

        {/* Honeypot: Formspree drops submissions that fill this in. */}
        <input type="text" name="_gotcha" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <button type="submit" className="btn submit-btn" disabled={sending}>
          {sending ? (
            <>
              <FaSpinner className="spin" aria-hidden="true" /> Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {status.state === "success" && (
          <div className="form-status success" role="status">
            {status.message}
          </div>
        )}
        {status.state === "error" && (
          <div className="form-status error" role="alert">
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
