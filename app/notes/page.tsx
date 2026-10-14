import type { Metadata } from "next";
import Link from "next/link";
import { getNotes } from "@/lib/content";

export const metadata: Metadata = { title: "Notes" };

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <section id="notes" className="section">
      <div className="container">
        <h1 className="section-title">My Notes</h1>

        <div className="notes-grid">
          {notes.map((n, i) => (
            <article key={`${n.title}-${i}`} className="note-card card fade-in">
              <div className="card-img">{n.cover}</div>
              <div className="card-content">
                <h2>{n.title}</h2>
                <p>{n.text}</p>
                <span className="note-date">{n.date}</span>
                {n.href ? (
                  <Link href={n.href} className="btn">
                    Read More
                  </Link>
                ) : (
                  <span className="btn secondary btn-static">Coming Soon</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
