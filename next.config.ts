import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: 'app/build',
  images: {
    domains: ['memorywall-backend.onrender.com'],
    loader: 'default',
    path: '/_next/image',
  },
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
