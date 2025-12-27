import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.plantchat.com',
        port: '',
        pathname: '/public/images/**',
    }     ],
  },
};

export default nextConfig;
