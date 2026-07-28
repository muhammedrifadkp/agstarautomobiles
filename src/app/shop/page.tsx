"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, Grid, List, Search, X, Check, ArrowUpDown } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { bikes } from "@/data/bikes";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("q") || "";

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [bikeFilter, setBikeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (categoryFilter && p.categorySlug !== categoryFilter) return false;
        if (bikeFilter && !p.compatibleBikes.includes(bikeFilter)) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesBike = p.compatibleBikeNames.some((b) => b.toLowerCase().includes(q));
          if (!matchesTitle && !matchesBike) return false;
        }
        if (p.price > maxPrice) return false;
        if (inStockOnly && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [categoryFilter, bikeFilter, searchQuery, maxPrice, inStockOnly, sortBy]);

  const clearFilters = () => {
    setCategoryFilter("");
    setBikeFilter("");
    setSearchQuery("");
    setMaxPrice(8000);
    setInStockOnly(false);
  };

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      <div className="site-container">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            AG STAR ONLINE CATALOG
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white uppercase italic tracking-tight">
            MOTORCYCLE ACCESSORIES STORE
          </h1>
          <p className="text-xs text-neutral-400 max-w-xl">
            Explore 100% bolt-on crash guards, saddle stays, top racks, and frame sliders engineered for Indian adventure touring.
          </p>
        </div>

        {/* Filter Bar Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950 border border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2 rounded-xl bg-neutral-900 text-white border border-white/15 text-xs font-mono uppercase flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <span className="text-xs font-mono text-neutral-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> Products
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-neutral-900 border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-neutral-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`space-y-6 lg:block ${
              mobileFilterOpen ? "block" : "hidden"
            } bg-neutral-950 p-6 rounded-2xl border border-white/10 h-fit`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                FILTER PRODUCTS
              </h3>
              <button
                onClick={clearFilters}
                className="text-[11px] font-mono text-neutral-400 hover:text-white underline"
              >
                Reset All
              </button>
            </div>

            {/* Search Input Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-400">
                Keyword Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Guard, Rack..."
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                />
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-400">
                Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setCategoryFilter("")}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg font-mono transition-colors ${
                    categoryFilter === ""
                      ? "bg-white text-black font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategoryFilter(c.slug)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg font-mono transition-colors flex items-center justify-between ${
                      categoryFilter === c.slug
                        ? "bg-white text-black font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] opacity-70">({c.productCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bike Model Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-400">
                Motorcycle Model
              </label>
              <select
                value={bikeFilter}
                onChange={(e) => setBikeFilter(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="">All Bike Models</option>
                {bikes.map((b) => (
                  <option key={b.id} value={b.slug}>
                    {b.brand} {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-neutral-400">
                <span>Max Price:</span>
                <span className="text-white font-bold">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="8000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-white bg-neutral-800"
              />
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded bg-neutral-900 border-white/20 text-black focus:ring-0"
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="p-12 rounded-2xl bg-neutral-950 border border-white/10 text-center space-y-4">
                <h3 className="font-heading text-lg font-bold uppercase text-white">
                  No Matching Products Found
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Try adjusting your filter settings or search query to find compatible motorcycle parts.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedQuickView(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
