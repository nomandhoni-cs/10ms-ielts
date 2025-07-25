import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.10minuteschool.com/**")],
  },
  /* config options here */
};

export default nextConfig;
