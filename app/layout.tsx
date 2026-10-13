import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Totoro from "@/components/Totoro";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eseoghene | Developer & AI Enthusiast",
    template: "%s — Eseoghene",
  },
  description:
    "Eseoghene Christine Otuaga: AI enthusiast, developer, and problem solver. Projects, notes, chess, and marshmallows.",
  openGraph: {
    title: "Eseoghene | Developer & AI Enthusiast",
    description: "AI enthusiast, developer, and problem solver.",
    images: [{ url: "/ghibli.jpg", width: 1024, height: 1024, alt: "Eseoghene's portrait" }],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#eaf4ec",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.className} data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Totoro />
        <RevealObserver />
      </body>
    </html>
  );
}
