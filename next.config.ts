import type { NextConfig } from "next";

const oldPages: Record<string, string> = {
  "/index.html": "/",
  "/projects.html": "/projects",
  "/marshmallows.html": "/marshmallows",
  "/Marshmallows.html": "/marshmallows",
  "/notes.html": "/notes",
  "/chess.html": "/chess",
  "/contact.html": "/contact",
  "/MyMentors&Guides.html": "/notes/mentors-and-guides",
  "/MyMentors%26Guides.html": "/notes/mentors-and-guides",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(oldPages).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
