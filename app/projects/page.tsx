import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section id="projects" className="section">
      <div className="container">
        <h1 className="section-title">My Projects</h1>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={`${p.title}-${i}`} className="project-card card fade-in">
              <div className="card-img">
                {p.image ? (
                  <Image src={p.image.src} alt={p.image.alt} width={1024} height={1024} sizes="(max-width: 700px) 100vw, 400px" />
                ) : (
                  p.cover
                )}
              </div>
              <div className="card-content">
                <h2>{p.title}</h2>
                <p>{p.text}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                {p.href ? (
                  <a href={p.href} className="btn" target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                ) : (
                  <span className="btn secondary btn-static">{p.status}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
