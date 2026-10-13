import type { Social } from "@/lib/data";

export default function SocialLinks({ links, className = "social-links" }: { links: Social[]; className?: string }) {
  return (
    <div className={className}>
      {links.map(({ label, href, icon: Icon }) => (
        <a key={href} href={href} title={label} aria-label={label} target="_blank" rel="noopener noreferrer">
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
