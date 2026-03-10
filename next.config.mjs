/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep serverless chromium external and include its binary assets in the PDF route bundle.
  serverExternalPackages: ["@sparticuz/chromium"],
  outputFileTracingIncludes: {
    "/api/pdf": ["./node_modules/@sparticuz/chromium/bin/**/*"],
    "/api/pdf/route": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default nextConfig;
