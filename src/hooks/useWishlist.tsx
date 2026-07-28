"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Product, WishlistItem } from "@/types";

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  totalWishlistItems: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY_WISHLIST = "agstar_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (stored) setWishlist(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    }
  }, []);

  const saveWishlist = (items: WishlistItem[]) => {
    setWishlist(items);
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(items));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    const exists = isInWishlist(product.id);
    let updated: WishlistItem[];
    if (exists) {
      updated = wishlist.filter((item) => item.product.id !== product.id);
    } else {
      updated = [...wishlist, { product, addedAt: new Date().toISOString() }];
    }
    saveWishlist(updated);
  };

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter((item) => item.product.id !== productId);
    saveWishlist(updated);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        totalWishlistItems: wishlist.length,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
