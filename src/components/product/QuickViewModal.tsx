"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, ShieldCheck, Check, Heart, Sliders, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useGarage } from "@/hooks/useGarage";
import { formatCurrency } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { activeBike, checkCompatibility } = useGarage();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const fitment = checkCompatibility(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl glass-panel rounded-2xl border border-white/20 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Left Gallery Column */}
        <div className="md:w-1/2 p-6 bg-black/50 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative w-full aspect-square rounded-xl bg-neutral-950 border border-white/10 overflow-hidden mb-4">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Thumbnail row */}
          <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImageIndex === idx ? "border-white" : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Info Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                {product.category}
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="font-heading text-2xl font-extrabold text-white uppercase tracking-wider">
              {product.title}
            </h2>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-bold text-white ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                ({product.reviewCount} Rider Reviews)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase font-mono">
                {product.inStock ? "In Stock" : "Pre-order"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-extrabold text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-neutral-500">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Fitment Status */}
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 font-medium ${
                fitment.isCompatible
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                  : "bg-red-950/40 border-red-500/30 text-red-300"
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{fitment.message}</span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Compatible Models */}
            <div>
              <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
                Verified Compatible Models:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.compatibleBikeNames.map((name) => (
                  <span
                    key={name}
                    className="px-2 py-1 rounded bg-neutral-900 text-neutral-300 text-[10px] font-mono border border-white/10"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex gap-3">
              <button
                suppressHydrationWarning
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-1 py-3.5 rounded-xl bg-white text-black font-extrabold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag</span>
              </button>

              <button
                suppressHydrationWarning
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isFavorited
                    ? "bg-white text-black border-white"
                    : "bg-neutral-900 border-white/15 text-neutral-300 hover:text-white"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-black" : ""}`} />
              </button>
            </div>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-white/15 text-white text-center text-xs font-mono uppercase tracking-widest block hover:bg-white/10 transition-colors"
            >
              View Full Product Specifications →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
