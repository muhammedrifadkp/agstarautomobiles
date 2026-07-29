"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Bike, ArrowRight, ShieldAlert, Package, Sliders } from "lucide-react";
import { products } from "@/data/products";
import { bikes } from "@/data/bikes";
import { categories } from "@/data/categories";
import { formatCurrency } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const searchQuery = query.toLowerCase().trim();

  const matchedProducts = searchQuery
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.subtitle.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery) ||
          p.compatibleBikeNames.some((b) => b.toLowerCase().includes(searchQuery))
      )
    : products.slice(0, 4);

  const matchedBikes = searchQuery
    ? bikes.filter(
        (b) =>
          b.name.toLowerCase().includes(searchQuery) ||
          b.brand.toLowerCase().includes(searchQuery)
      )
    : bikes.slice(0, 4);

  const matchedCategories = searchQuery
    ? categories.filter((c) => c.name.toLowerCase().includes(searchQuery))
    : categories.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-3xl glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="relative flex items-center px-6 py-4 border-b border-white/10 bg-black/40">
          <Search className="w-6 h-6 text-neutral-400 mr-4 shrink-0" />
          <input
            suppressHydrationWarning
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parts, crash guards, bike models (e.g. Himalayan 450)..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-lg focus:outline-none font-medium"
          />
          {query && (
            <button
              suppressHydrationWarning
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-neutral-400 hover:text-white mr-2"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white border border-white/10 px-2.5 py-1 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-6 space-y-8 divide-y divide-white/5">
          {/* Motorcycle Matches */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3 flex items-center gap-2">
              <Bike className="w-4 h-4 text-white" />
              <span>Matching Motorcycles</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {matchedBikes.map((bike) => (
                <Link
                  key={bike.id}
                  href={`/bikes/${bike.slug}`}
                  onClick={onClose}
                  className="group p-3 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-white/20 hover:bg-neutral-800/80 transition-all flex flex-col"
                >
                  <span className="text-[10px] uppercase font-mono text-neutral-400">
                    {bike.brand}
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-white transition-colors truncate">
                    {bike.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Results */}
          <div className="pt-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3 flex items-center justify-between">
              <span>Accessories ({matchedProducts.length})</span>
              {searchQuery && (
                <Link
                  href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                  onClick={onClose}
                  className="text-white hover:underline flex items-center gap-1 text-[10px] tracking-wider"
                >
                  View All Results <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </h3>

            {matchedProducts.length === 0 ? (
              <div className="py-8 text-center text-neutral-500">
                No matching accessories found for "{query}".
              </div>
            ) : (
              <div className="space-y-3">
                {matchedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between p-3 rounded-xl bg-neutral-900/40 border border-white/5 hover:border-white/20 hover:bg-neutral-800/60 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-lg bg-neutral-950 border border-white/10 overflow-hidden shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-xs text-neutral-400 line-clamp-1">
                          Fits: {product.compatibleBikeNames.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-white">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-[10px] line-through text-neutral-500">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Categories Matches */}
          <div className="pt-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Explore Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchedCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-full bg-neutral-900 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/10 transition-colors"
                >
                  {cat.name} ({cat.productCount})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
