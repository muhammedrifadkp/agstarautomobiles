"use client";

import Image from "next/image";
import Link from "next/link";
import { Sliders, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link href="/shop" className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>
            <h1 className="font-heading text-4xl font-extrabold uppercase italic text-white">
              PRODUCT SPEC COMPARISON
            </h1>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/15 text-xs font-mono text-neutral-300 hover:text-white"
            >
              Clear Comparison List
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="p-16 rounded-2xl bg-neutral-950 border border-white/10 text-center space-y-4 max-w-md mx-auto">
            <Sliders className="w-12 h-12 text-neutral-500 mx-auto" />
            <h2 className="font-heading font-extrabold text-xl uppercase text-white">
              No Accessories Added For Comparison
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Click the compare icon on product cards while browsing to view side-by-side specifications.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto pb-6">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-4 bg-neutral-950 border border-white/10 text-neutral-400 uppercase w-48 font-mono">
                    Specification
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-4 bg-neutral-950 border border-white/10 min-w-[220px]">
                      <div className="space-y-3">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="p-1 text-neutral-500 hover:text-red-400 float-right"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="relative w-full aspect-square rounded-xl bg-black overflow-hidden border border-white/10">
                          <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                        </div>
                        <h3 className="font-heading font-bold text-sm text-white uppercase line-clamp-1">{product.title}</h3>
                        <span className="text-sm font-extrabold text-white block">{formatCurrency(product.price)}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-2 rounded-lg bg-white text-black font-bold uppercase text-[11px] flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-4 font-bold text-white bg-neutral-950 border border-white/10">Category</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 border border-white/10">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white bg-neutral-950 border border-white/10">Material</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 border border-white/10">{p.specs.material}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white bg-neutral-950 border border-white/10">Finish</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 border border-white/10">{p.specs.finish}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white bg-neutral-950 border border-white/10">Net Weight</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 border border-white/10">{p.specs.weight}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white bg-neutral-950 border border-white/10">Warranty</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 border border-white/10">{p.specs.warranty}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
