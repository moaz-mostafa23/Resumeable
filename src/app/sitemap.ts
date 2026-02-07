import type { MetadataRoute } from "next";

const SITE_URL = "https://www.resumeable.cv";

/**
 * Auto-generated sitemap for search engines.
 * Next.js serves this at /sitemap.xml.
 *
 * As we add blog posts and resume-example pages, we can pull
 * those dynamically from the filesystem or a CMS.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
