"use client";

import { ReactNode } from "react";
import { GarageProvider } from "@/hooks/useGarage";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import { CompareProvider } from "@/hooks/useCompare";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <GarageProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>{children}</CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </GarageProvider>
    </SmoothScrollProvider>
  );
}
