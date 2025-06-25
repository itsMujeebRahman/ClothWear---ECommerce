import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  eslint: {
    // Warning: this will allow potentially unsafe code through
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
