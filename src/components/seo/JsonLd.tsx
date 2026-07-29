"use client";

import { siteConfig } from "@/config/site";

export function JsonLd() {
  const baseUrl = siteConfig.url || "https://agstarautomobiles.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "AG Star Automobiles",
    legalName: "AG Star Automobiles",
    url: baseUrl,
    logo: `${baseUrl}/images/white-text-logo-without-bg.png`,
    image: `${baseUrl}/images/hero-bg.png`,
    description: siteConfig.description,
    telephone: "+919901230526",
    email: "sales.agstar@gmail.com",
    vatID: "29AGSPA9812K1Z8",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "AG Star Automobiles Main Workshop",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560001",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/agstar_automobiles",
      "https://www.facebook.com/agstarautomobiles",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AG Star Automobiles",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
