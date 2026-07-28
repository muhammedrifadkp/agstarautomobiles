"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);

  const results = useMemo(() => {
    if (!query) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.compatibleBikeNames.some((b) => b.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container">
        <div className="max-w-2xl mx-auto mb-12 space-y-4 text-center">
          <h1 className="font-heading text-4xl font-extrabold uppercase italic text-white">
            SEARCH ACCESSORIES
          </h1>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search parts, crash guards, Himalayan 450..."
              className="w-full bg-neutral-900 border border-white/20 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white font-medium shadow-xl"
            />
            <Search className="w-5 h-5 text-neutral-400 absolute right-4 top-4" />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Search Results ({results.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white">Searching...</div>}>
      <SearchContent />
    </Suspense>
  );
}
