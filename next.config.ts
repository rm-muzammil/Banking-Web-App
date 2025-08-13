import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ⬅ Skip TS type errors at build time
  },
  eslint: {
    ignoreDuringBuilds: true, // ⬅ Skip ESLint errors at build time
  },
  /* config options here */
};

export default nextConfig;
