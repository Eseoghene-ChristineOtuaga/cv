import Image from "next/image";
import Link from "next/link";
import Clouds from "@/components/Clouds";
import SocialLinks from "@/components/SocialLinks";
import Workflow from "@/components/Workflow";
import { getInterests, getSkills } from "@/lib/content";
import { socials } from "@/lib/data";
import portrait from "@/public/ghibli.jpg";

export default async function Home() {
  const [skills, interests] = await Promise.all([getSkills(), getInterests()]);

  return (
    <>
      <section id="home">
        <Clouds />
        <div className="soot-sprite sprite-1" />
        <div className="soot-sprite sprite-2" />

        <div className="container">
          <div className="hero-content">
            <div className="profile-side">
              <div className="profile-pic">
                <Image
                  src={portrait}
                  alt="Eseoghene's portrait"
                  priority
                  placeholder="blur"
                  sizes="(max-width: 480px) 220px, (max-width: 900px) 270px, 340px"
                />
              </div>
            </div>

            <div className="intro-side">
              <div className="intro-text">
                <h1>
                  こんにちは,
                  <br />
                  I&apos;m Eseoghene
                </h1>
                <p className="hero-subtitle">AI Enthusiast &middot; Developer &middot; Problem Solver</p>
                <p>
                  Passionate about building intelligent systems and creating beautiful, functional digital
                  experiences. More than learning, I love doing — because that&apos;s where the magic happens.
                </p>

                <div className="hero-buttons">
                  <Link href="/projects" className="btn">
                    View My Work
                  </Link>
                  <Link href="/contact" className="btn secondary">
                    Get in Touch
                  </Link>
                </div>

                <ul className="interests">
                  {interests.map(({ label, icon: Icon }, i) => (
                    <li key={`${label}-${i}`} className="interest-item">
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <SocialLinks links={socials} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2 className="section-title">My Skills</h2>

          <div className="skills-categories">
            {skills.map(({ title, icon: Icon, text, pills }, i) => (
              <div key={`${title}-${i}`} className="skill-card fade-in">
                <div className="skill-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="skill-pills">
                  {pills.map((p) => (
                    <span key={p} className="pill">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Workflow />
        </div>
      </section>
    </>
  );
}
