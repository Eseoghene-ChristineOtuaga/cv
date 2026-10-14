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
  // Lets phones on the home network use the dev server (hot reload included).
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    // Project images uploaded from the admin dashboard live in Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
  experimental: {
    // Room for image uploads from the admin dashboard (they're capped at 4 MB).
    serverActions: { bodySizeLimit: "5mb" },
  },
  async redirects() {
    return Object.entries(oldPages).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
