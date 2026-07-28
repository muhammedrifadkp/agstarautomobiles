"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Bike, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useGarage } from "@/hooks/useGarage";

export function MobileNav() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const { setIsGarageOpen } = useGarage();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "Bike", href: "#garage", icon: Bike, isGarageTrigger: true },
    { name: "Wishlist", href: "#wishlist", icon: Heart, badge: totalWishlistItems, isWishlistTrigger: true },
    { name: "Cart", href: "#cart", icon: ShoppingCart, badge: totalItems, isCartTrigger: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCartTrigger) {
            return (
              <button
                key={item.name}
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors relative p-1"
              >
                <Icon className="w-5 h-5 text-white" />
                {item.badge ? (
                  <span className="absolute top-0 right-1 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
                <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
              </button>
            );
          }

          if (item.isWishlistTrigger) {
            return (
              <button
                key={item.name}
                onClick={() => setIsWishlistOpen(true)}
                className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors relative p-1"
              >
                <Icon className="w-5 h-5" />
                {item.badge ? (
                  <span className="absolute top-0 right-1 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
                <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
              </button>
            );
          }

          if (item.isGarageTrigger) {
            return (
              <button
                key={item.name}
                onClick={() => setIsGarageOpen(true)}
                className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors p-1"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                isActive ? "text-white font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
