import type { MetadataRoute } from "next";

const SITE_URL = "https://www.resumeable.cv";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/templates", "/resume-examples", "/pricing", "/privacy", "/terms"],
        disallow: ["/builder/", "/dashboard", "/login", "/signup", "/callback", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
