import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // distDir: 'app/build',
  typescript: {
    ignoreBuildErrors: true,  // Temporary during debugging
  },
  eslint: {
    ignoreDuringBuilds: true,  // Temporary during debugging
  },
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