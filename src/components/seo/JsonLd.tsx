/**
 * Structured data (JSON-LD) for search engines.
 *
 * Includes SoftwareApplication schema so Google can show rich results
 * (app name, category, pricing). We only declare what we can back up —
 * no fake ratings until we have real reviews.
 */
export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resumeable",
    url: "https://www.resumeable.cv",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Free drag-and-drop resume builder with ATS-friendly templates and instant PDF export.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Drag-and-drop resume editor",
      "ATS-friendly templates",
      "Real-time preview",
      "PDF export",
      "Custom sections",
      "No signup required",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
