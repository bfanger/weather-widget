import type { NextConfig } from "next";
import fs from "node:fs";
import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin";

const inDocker = fs.existsSync("/.dockerenv");

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  webpack: (config, { dev }) => {
    if (dev && inDocker) {
      config.watchOptions = { poll: 1000 };
    }
    return config;
  },
};

const withVarlock = varlockNextConfigPlugin();

export default withVarlock(nextConfig);
