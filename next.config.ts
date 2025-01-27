import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/2048-in-react",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
