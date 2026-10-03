import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Don't let `next dev` generate AGENTS.md — agent instructions live in CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
