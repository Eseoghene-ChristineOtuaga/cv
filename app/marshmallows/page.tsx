import type { Metadata } from "next";
import MarshmallowRain from "@/components/MarshmallowRain";
import { getHobbies } from "@/lib/content";

export const metadata: Metadata = { title: "Marshmallows" };

export default async function MarshmallowsPage() {
  const hobbies = await getHobbies();

  return (
    <section id="marshmallows" className="section">
      <MarshmallowRain />

      <div className="container">
        <h1 className="section-title">My Marshmallows</h1>
        <p className="section-subtitle">
          The softer side of Ese — hobbies, passions, and the things that keep me human.
        </p>

        <div className="hobby-cards">
          {hobbies.map(({ title, icon: Icon, text, tags, special }, i) => (
            <article key={`${title}-${i}`} className={`hobby-card${special ? " marshmallow-card" : ""}`}>
              <div className="hobby-header">
                <span className="hobby-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h2 className="hobby-title">{title}</h2>
              </div>
              <div className="hobby-content">
                <p className="hobby-description">{text}</p>
                <div className="hobby-meta">
                  {tags.map((t) => (
                    <span key={t} className="hobby-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
