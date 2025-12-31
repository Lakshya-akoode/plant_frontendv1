import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plantchatvercel.akoodedemo.com',
        port: '',
        pathname: '/public/images/**',
    },
     {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/public/images/**',
     }  ],
  },
};

export default nextConfig;
