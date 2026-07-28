"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Eye, Sliders, ShoppingBag, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useCompare } from "@/hooks/useCompare";
import { useGarage } from "@/hooks/useGarage";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const { activeBike, checkCompatibility } = useGarage();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const fitment = checkCompatibility(product);

  const displayImage =
    isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div
      className="group bg-metal-card rounded-2xl overflow-hidden flex flex-col justify-between relative transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestSeller && (
          <span className="px-2.5 py-1 rounded-md bg-white text-black text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
            BEST SELLER
          </span>
        )}
        {product.isNew && (
          <span className="px-2.5 py-1 rounded-md bg-neutral-900 text-white border border-white/20 text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
            NEW
          </span>
        )}
        {activeBike && (
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
              fitment.isCompatible
                ? "bg-emerald-500/90 text-black"
                : "bg-red-950/80 text-red-300 border border-red-500/30"
            }`}
          >
            {fitment.isCompatible ? "✓ Fits Your Bike" : "✕ Fit Check Required"}
          </span>
        )}
      </div>

      {/* Top Right Quick Actions */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => toggleWishlist(product)}
          className={`p-2 rounded-full border backdrop-blur-md transition-all ${
            isFavorited
              ? "bg-white text-black border-white"
              : "bg-black/60 text-white border-white/10 hover:bg-white hover:text-black"
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-black" : ""}`} />
        </button>

        <button
          onClick={() => toggleCompare(product)}
          className={`p-2 rounded-full border backdrop-blur-md transition-all ${
            isCompared
              ? "bg-white text-black border-white"
              : "bg-black/60 text-white border-white/10 hover:bg-white hover:text-black"
          }`}
          title="Compare accessories"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square w-full bg-neutral-950 border-b border-white/5 overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={displayImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
        </Link>

        {/* Quick View Hover Bar */}
        {onQuickView && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
            <button
              onClick={() => onQuickView(product)}
              className="w-full py-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 hover:bg-white hover:text-black transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 mr-1" />
              <span className="text-white font-bold">{product.rating}</span>
              <span className="text-neutral-500 ml-1">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-heading font-extrabold text-base text-white group-hover:text-neutral-200 transition-colors uppercase tracking-tight line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-neutral-400 line-clamp-1 mt-1 font-mono">
            {product.compatibleBikeNames.join(" • ")}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-base font-extrabold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="block text-[10px] line-through text-neutral-500">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-3.5 py-2 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-200 transition-all transform active:scale-95 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
