"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bike as BikeIcon, ShieldCheck, Filter } from "lucide-react";
import { bikes } from "@/data/bikes";
import { products } from "@/data/products";

export default function BikesOverviewPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");

  const brands = ["ALL", "Royal Enfield", "KTM", "BMW", "Hero", "Honda", "TVS"];

  const filteredBikes =
    selectedBrand === "ALL"
      ? bikes
      : bikes.filter((b) => b.brand.toLowerCase().includes(selectedBrand.toLowerCase()));

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 flex items-center gap-2">
            <BikeIcon className="w-4 h-4 text-white" />
            <span>MOTORCYCLE COMPATIBILITY CATALOG</span>
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white uppercase italic tracking-tight">
            SHOP BY MOTORCYCLE
          </h1>
          <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
            Select your exact motorcycle brand and model to browse 100% direct bolt-on crash guards, saddle stays, luggage racks, and adventure armor.
          </p>
        </div>

        {/* Brand Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 border-b border-white/10 font-mono text-xs">
          <Filter className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 rounded-xl uppercase tracking-wider font-bold shrink-0 transition-all ${
                selectedBrand === brand
                  ? "bg-white text-black shadow-lg"
                  : "bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Bike Grid with Unique Imagery per Bike Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBikes.map((bike) => {
            const fittedPartsCount = products.filter(
              (p) => p.compatibleBikes.includes(bike.id) || p.compatibleBikes.includes(bike.slug)
            ).length;

            return (
              <Link
                key={bike.id}
                href={`/bikes/${bike.slug}`}
                className="group relative rounded-2xl overflow-hidden h-80 border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col justify-between p-6 bg-neutral-950 shadow-2xl"
              >
                {/* Full-Bleed Cover Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-125"
                  />
                  {/* Multi-stage dark luxury gradient mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:via-black/40 transition-colors" />
                  <div className="absolute inset-0 bg-carbon-pattern opacity-20" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white border border-white/20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md font-bold">
                    {bike.brand}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                    {fittedPartsCount > 0 ? `${fittedPartsCount} Parts Fitted` : "Direct Fit"}
                  </span>
                </div>

                {/* Bottom Content & CTA */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      {bike.category} • {bike.years.join(" - ")}
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight italic group-hover:text-white transition-colors">
                      {bike.name}
                    </h2>
                  </div>

                  <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed font-mono font-normal">
                    {bike.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15">
                    <span className="text-xs font-mono text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      <span>View Custom Armor</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
