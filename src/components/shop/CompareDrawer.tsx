"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Sliders, ArrowRight, Trash2 } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { formatCurrency } from "@/lib/utils";

export function CompareDrawer() {
  const { compareList, isCompareOpen, setIsCompareOpen, removeFromCompare, clearCompare } =
    useCompare();

  if (!isCompareOpen || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-white" />
          <h4 className="font-heading text-xs uppercase font-extrabold tracking-wider text-white">
            Compare Accessories ({compareList.length}/4)
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCompare}
            className="text-[11px] text-neutral-400 hover:text-white uppercase font-mono"
          >
            Clear All
          </button>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
        {compareList.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-2 rounded-xl bg-neutral-900/80 border border-white/10 relative group"
          >
            <div className="relative w-12 h-12 rounded-lg bg-black overflow-hidden shrink-0">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-bold text-white truncate">{product.title}</h5>
              <span className="text-[11px] font-mono text-neutral-400">
                {formatCurrency(product.price)}
              </span>
            </div>
            <button
              onClick={() => removeFromCompare(product.id)}
              className="p-1 text-neutral-500 hover:text-red-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {compareList.length < 4 && (
          <div className="hidden sm:flex items-center justify-center p-2 rounded-xl border border-dashed border-white/15 text-[11px] font-mono text-neutral-500">
            + Add up to 4 items
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-white/10 flex justify-end">
        <Link
          href="/compare"
          onClick={() => setIsCompareOpen(false)}
          className="px-5 py-2 rounded-lg bg-white text-black font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-neutral-200 transition-colors"
        >
          <span>View Side-By-Side Comparison</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
