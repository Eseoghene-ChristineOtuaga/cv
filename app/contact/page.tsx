import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h1 className="section-title">Get In Touch</h1>
        <ContactForm />
      </div>
    </section>
  );
}
