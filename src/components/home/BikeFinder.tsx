"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bike as BikeIcon, Search } from "lucide-react";
import { bikes } from "@/data/bikes";
import { useGarage } from "@/hooks/useGarage";

export function BikeFinder() {
  const router = useRouter();
  const { addBikeToGarage } = useGarage();
  const [selectedBrand, setSelectedBrand] = useState("Royal Enfield");
  const [selectedBikeSlug, setSelectedBikeSlug] = useState("himalayan-450");
  const [selectedYear, setSelectedYear] = useState(2024);

  const brands = Array.from(new Set(bikes.map((b) => b.brand)));
  const filteredBikes = bikes.filter((b) => b.brand === selectedBrand);
  const currentBike = bikes.find((b) => b.slug === selectedBikeSlug) || filteredBikes[0];

  const handleSearchFitment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBike) return;

    // Save to My Garage
    addBikeToGarage({
      brand: currentBike.brand,
      model: currentBike.name,
      year: selectedYear,
      slug: currentBike.slug,
    });

    // Navigate to bike specific accessories page
    router.push(`/bikes/${currentBike.slug}`);
  };

  return (
    <section id="bike-finder" className="relative z-20 -mt-12 sm:-mt-16 site-container transition-all">
      <div className="bg-metal-surface rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-extrabold">
              <BikeIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white uppercase tracking-wider">
                BIKE FINDER
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Select your motorcycle to view 100% compatible custom parts
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            ✓ 100% Guaranteed Bolt-on Fitment
          </span>
        </div>

        <form onSubmit={handleSearchFitment} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Brand Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5 font-bold">
              1. Brand
            </label>
            <select
              suppressHydrationWarning
              value={selectedBrand}
              onChange={(e) => {
                const b = e.target.value;
                setSelectedBrand(b);
                const first = bikes.find((item) => item.brand === b);
                if (first) setSelectedBikeSlug(first.slug);
              }}
              className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-white transition-colors"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand} className="bg-black text-white">
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Model Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5 font-bold">
              2. Model
            </label>
            <select
              suppressHydrationWarning
              value={selectedBikeSlug}
              onChange={(e) => setSelectedBikeSlug(e.target.value)}
              className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-white transition-colors"
            >
              {filteredBikes.map((bike) => (
                <option key={bike.id} value={bike.slug} className="bg-black text-white">
                  {bike.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5 font-bold">
              3. Year
            </label>
            <select
              suppressHydrationWarning
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-white transition-colors"
            >
              {(currentBike?.years || [2020, 2021, 2022, 2023, 2024, 2025, 2026]).map((yr) => (
                <option key={yr} value={yr} className="bg-black text-white">
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Action */}
          <div className="flex items-end">
            <button
              suppressHydrationWarning
              type="submit"
              className="w-full py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all transform active:scale-95 shadow-xl"
            >
              <Search className="w-4 h-4" />
              <span>Find Matching Parts</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
