import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const githubBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "/FutureMe";

const nextConfig: NextConfig = {
  // Vinext's local Cloudflare adapter does not expose the asset fetch binding
  // expected by Next's image optimizer. These images already ship at their
  // final sizes, so serving them directly is the reliable behavior in both
  // the Codex preview and the deployed static bundle.
  images: {
    unoptimized: true,
  },
  ...(githubPages
    ? {
        output: "export",
        basePath: githubBasePath,
        assetPrefix: githubBasePath,
        trailingSlash: true,
        typescript: {
          tsconfigPath: "tsconfig.pages.json",
        },
      }
    : {}),
};

export default nextConfig;
