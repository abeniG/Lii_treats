import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages compatibility
  output: "standalone",

  images: {
    // Allow images served from the /public folder (local)
    unoptimized: true, // Cloudflare Pages doesn't support Next.js Image Optimization server
  },
};

export default nextConfig;
