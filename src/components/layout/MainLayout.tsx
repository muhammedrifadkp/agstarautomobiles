"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";
import { Footer } from "./Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { MyGarageDrawer } from "@/components/garage/MyGarageDrawer";
import { CompareDrawer } from "@/components/shop/CompareDrawer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      
      <main className="flex-1">{children}</main>

      <Footer />
      <MobileNav />

      {/* Global Modals & Drawers */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
      <WishlistDrawer />
      <MyGarageDrawer />
      <CompareDrawer />
    </div>
  );
}
