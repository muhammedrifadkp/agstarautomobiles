"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } =
    useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "AGRIDER10") {
      setCouponDiscount(0.1);
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try 'AGRIDER10' for 10% off.");
    }
  };

  const discountAmount = subtotal * couponDiscount;
  const finalTotal = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="font-heading font-extrabold text-lg uppercase tracking-wider text-white">
                Your Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-neutral-900/60 border-b border-white/5">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-neutral-300">
                {subtotal >= FREE_SHIPPING_THRESHOLD
                  ? "🎉 You qualified for FREE India Express Shipping!"
                  : `Add ${formatCurrency(remainingForFreeShipping)} more for FREE Shipping`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-white uppercase text-base">
                  Your bag is empty
                </h3>
                <p className="text-xs text-neutral-400 max-w-xs">
                  Gear up your motorcycle with aircraft-grade protection and premium accessories.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
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
                    {item.selectedBike && (
                      <span className="inline-block text-[10px] text-neutral-400 font-mono">
                        Fit: {item.selectedBike}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/15 rounded-md bg-black/50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-white text-neutral-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-white text-neutral-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-white">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
              {/* Coupon input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon (e.g. AGRIDER10)"
                  className="flex-1 bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-neutral-800 text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  Apply
                </button>
              </div>

              {couponApplied && (
                <div className="text-xs text-emerald-400 flex justify-between font-mono">
                  <span>10% Rider Discount Applied</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? "FREE" : formatCurrency(299)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 299))}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-white text-black font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all transform active:scale-95 shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Frontend UI Demo — No payment will be processed</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Mock Preview Dialog */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-2xl max-w-sm w-full text-center space-y-4 border border-white/20">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-white uppercase">
              API-Ready Checkout Preview
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This frontend eCommerce project is fully component-based and prepared to integrate with REST APIs or payment gateways (Razorpay, Stripe, Paytm) once backend endpoints are attached.
            </p>
            <div className="bg-neutral-900 p-3 rounded-lg text-left font-mono text-[11px] text-neutral-300 space-y-1">
              <div>Items Count: {totalItems}</div>
              <div>Final Amount: {formatCurrency(finalTotal)}</div>
              <div>Status: Ready for REST API Payload</div>
            </div>
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="w-full py-2.5 rounded-lg bg-white text-black font-bold text-xs uppercase"
            >
              Close Demo Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
