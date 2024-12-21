import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async middleware() {
    return [
      {
        source: "/((?!api|_next|static|favicon.ico).*)",
        destination: "/src/middleware.ts",
      },
    ];
  },
};

export default nextConfig;
