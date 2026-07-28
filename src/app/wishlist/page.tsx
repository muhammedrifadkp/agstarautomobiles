"use client";

import Link from "next/link";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container">
        <div className="mb-8 space-y-2">
          <Link href="/shop" className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
          <h1 className="font-heading text-4xl font-extrabold uppercase italic text-white">
            SAVED WISHLIST ({wishlist.length})
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="p-16 rounded-2xl bg-neutral-950 border border-white/10 text-center space-y-4 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-neutral-500 mx-auto" />
            <h2 className="font-heading font-extrabold text-xl uppercase text-white">
              Your Wishlist Is Empty
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Browse accessories and save items for your motorcycle.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <ProductCard key={item.product.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
