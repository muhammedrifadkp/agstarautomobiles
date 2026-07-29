"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useGarage } from "@/hooks/useGarage";
import { Search, ShoppingBag, Heart, Wrench, Menu, X, Bike } from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const { scrollDirection, isScrolled } = useScrollDirection();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const { activeBike, setIsGarageOpen } = useGarage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sticky header hide on scroll down, show on scroll up
  const isHidden = scrollDirection === "down" && isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "glass-panel shadow-2xl py-3 border-b border-white/10"
          : "bg-black/60 backdrop-blur-md py-4 border-b border-white/5"
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-9 w-36 sm:h-10 sm:w-44 transition-transform group-hover:scale-105">
            <Image
              src="/images/white-text-logo-without-bg.png"
              alt="AG Star Automobiles"
              fill
              priority
              sizes="176px"
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.desktop.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest text-neutral-300 hover:text-white font-medium transition-colors hover:scale-105 transform"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* My Garage Indicator Button */}
          <button
            suppressHydrationWarning
            onClick={() => setIsGarageOpen(true)}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeBike
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
            }`}
            title="My Garage - Select your bike to verify fitment"
          >
            <Bike className="w-3.5 h-3.5 text-white" />
            <span className="truncate max-w-[130px]">
              {activeBike ? `${activeBike.brand} ${activeBike.model}` : "My Garage"}
            </span>
            {activeBike && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Quick Search Button */}
          <button
            suppressHydrationWarning
            onClick={onOpenSearch}
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 group"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
            <span className="hidden lg:inline-flex items-center text-[10px] uppercase tracking-wider text-neutral-400 border border-white/15 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </span>
          </button>

          {/* Wishlist Icon */}
          <button
            suppressHydrationWarning
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-all relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalWishlistItems}
              </span>
            )}
          </button>

          {/* Shopping Cart Drawer Icon */}
          <button
            suppressHydrationWarning
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-black text-white px-1.5 py-0.5 rounded-full text-[10px] font-extrabold">
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 mt-3 p-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <button
              suppressHydrationWarning
              onClick={() => {
                setMobileMenuOpen(false);
                setIsGarageOpen(true);
              }}
              className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-white/10 text-white text-sm"
            >
              <div className="flex items-center gap-3">
                <Bike className="w-5 h-5 text-white" />
                <span>
                  {activeBike
                    ? `${activeBike.brand} ${activeBike.model}`
                    : "Select Your Bike"}
                </span>
              </div>
              <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono">
                My Garage
              </span>
            </button>

            {siteConfig.nav.desktop.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-neutral-200 hover:text-white py-2 border-b border-white/5 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
