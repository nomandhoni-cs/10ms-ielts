import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Existing patterns
      {
        protocol: "https",
        hostname: "cdn.10minuteschool.com",
        pathname: "**",
      },
      // New pattern to allow images from S3 bucket
      {
        protocol: "https",
        hostname: "s3.ap-southeast-1.amazonaws.com",
        pathname: "/cdn.10minuteschool.com/images/**", // Adjust pathname if needed based on your S3 structure
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
