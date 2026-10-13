import SocialLinks from "./SocialLinks";
import { socials } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container footer-content">
        <SocialLinks links={socials} className="footer-social" />
        <p className="copyright">© {year} Eseoghene Christine Otuaga. All rights reserved.</p>
        <p className="footer-message">Designed with care and Ghibli magic</p>
      </div>
    </footer>
  );
}
