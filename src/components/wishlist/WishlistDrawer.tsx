"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-white fill-white" />
              <h2 className="font-heading font-extrabold text-lg uppercase tracking-wider text-white">
                Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-500">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-white uppercase text-base">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-neutral-400 max-w-xs">
                  Save your favorite motorcycle accessories and crash guards here while browsing.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-xl bg-neutral-900/50 border border-white/5 relative group"
                >
                  <div className="relative w-20 h-20 rounded-lg bg-neutral-950 border border-white/10 overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.product.title}
                    </h4>
                    <span className="text-xs font-extrabold text-white block mt-1">
                      {formatCurrency(item.product.price)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(item.product);
                        removeFromWishlist(item.product.id);
                      }}
                      className="mt-3 w-full py-1.5 rounded-md bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromWishlist(item.product.id)}
                    className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
