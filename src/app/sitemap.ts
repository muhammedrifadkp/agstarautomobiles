import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { bikes } from "@/data/bikes";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url || "https://agstarautomobiles.com";

  // 1. Static Core Pages
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/dealers",
    "/compare",
    "/wishlist",
    "/returns",
    "/warranty",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/shop" ? ("daily" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/shop" ? 0.9 : 0.6,
  }));

  // 2. Bike Fitment Model Pages (/bikes/[slug])
  const bikeRoutes = bikes.map((bike) => ({
    url: `${baseUrl}/bikes/${bike.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 3. Category Pages (/shop?category=[slug])
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/shop?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 4. Individual Product Pages (/products/[slug])
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...bikeRoutes, ...categoryRoutes, ...productRoutes];
}
