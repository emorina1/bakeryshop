import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'example.com'], // domainet për imazhe të jashtme
  },
};

export default nextConfig;
