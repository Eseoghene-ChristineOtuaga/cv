import type { Metadata } from "next";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import { mentors } from "@/lib/data";

export const metadata: Metadata = { title: "My Mentors & Guides" };

export default function MentorsPage() {
  return (
    <section id="notes" className="section">
      <div className="container">
        <h1 className="section-title">My Mentors &amp; Guides</h1>

        <div className="mentors-grid">
          {mentors.map((m) => (
            <article key={m.name} className="mentor-note">
              <div className="note-pin" />
              <div className="note-header">
                <h2 className="mentor-name">{m.name}</h2>
                <p className="mentor-role">{m.role}</p>
              </div>
              <div className="note-content">
                <p className="mentor-description">{m.text}</p>
                <SocialLinks links={m.links} />
              </div>
            </article>
          ))}
        </div>

        <blockquote className="ghibli-quote fade-in">
          Their work reminds me that learning is a continuous journey and creativity has no ceiling. As Angela often
          says — the best way to learn is by doing.
        </blockquote>

        <div className="back-link">
          <Link href="/notes" className="btn secondary">
            Back to Notes
          </Link>
        </div>
      </div>
    </section>
  );
}
