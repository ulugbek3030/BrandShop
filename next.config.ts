import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robosell.ams3.digitaloceanspaces.com',
        pathname: '/robosell/**',
      },
    ],
  },
};

export default nextConfig;
