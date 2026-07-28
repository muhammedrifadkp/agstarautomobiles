"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Bike as BikeIcon, CheckCircle } from "lucide-react";
import { bikes } from "@/data/bikes";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function BikeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const bike = bikes.find((b) => b.slug === slug) || bikes[0];
  const matchingProducts = products.filter(
    (p) => p.compatibleBikes.includes(bike.id) || p.compatibleBikes.includes(bike.slug)
  );

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container">
        {/* Back Link */}
        <Link
          href="/bikes"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bikes Catalog</span>
        </Link>

        {/* Full-Bleed Hero Motorcycle Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/20 mb-12 min-h-[320px] flex flex-col justify-end p-8 shadow-2xl bg-neutral-950">
          <div className="absolute inset-0 z-0">
            <Image
              src={bike.image}
              alt={bike.name}
              fill
              sizes="100vw"
              priority
              className="object-cover object-center filter brightness-75 contrast-125 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white border border-white/20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md font-bold">
                  {bike.brand}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                  ✓ Verified 100% Fitment
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white uppercase italic tracking-tight">
                {bike.brand} {bike.name}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono">
                {bike.description}
              </p>
            </div>

            {/* Quick Specs Container */}
            <div className="grid grid-cols-3 gap-4 font-mono text-xs text-neutral-300 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/15 shrink-0">
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase">Category</span>
                <strong className="text-white text-sm">{bike.category}</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase">Displacement</span>
                <strong className="text-white text-sm">{bike.engineCc} cc</strong>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase">Model Years</span>
                <strong className="text-white text-sm">{bike.years.join("-")}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <h2 className="font-heading text-2xl font-extrabold text-white uppercase italic">
              {bike.name} Fitment Accessories ({matchingProducts.length})
            </h2>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4" />
              100% Direct Bolt-On Guaranteed
            </span>
          </div>

          {matchingProducts.length === 0 ? (
            <div className="p-12 text-center bg-neutral-950 rounded-2xl border border-white/10 text-neutral-400 text-xs font-mono space-y-2">
              <p className="text-sm font-bold text-white uppercase">More Accessories Loading Soon</p>
              <p>Custom crash guards and luggage racks for {bike.name} are currently in testing.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
