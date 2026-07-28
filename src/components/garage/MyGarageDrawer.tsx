"use client";

import { useState } from "react";
import { X, Bike, Check, Trash2, ShieldCheck, Plus } from "lucide-react";
import { useGarage } from "@/hooks/useGarage";
import { bikes } from "@/data/bikes";
import { GarageBike } from "@/types";

export function MyGarageDrawer() {
  const {
    activeBike,
    savedBikes,
    setActiveBike,
    addBikeToGarage,
    removeBikeFromGarage,
    isGarageOpen,
    setIsGarageOpen,
  } = useGarage();

  const [selectedBrand, setSelectedBrand] = useState("Royal Enfield");
  const [selectedBikeSlug, setSelectedBikeSlug] = useState("himalayan-450");
  const [selectedYear, setSelectedYear] = useState(2024);

  if (!isGarageOpen) return null;

  // Filter bikes by brand
  const filteredBikes = bikes.filter((b) => b.brand === selectedBrand);
  const currentBike = bikes.find((b) => b.slug === selectedBikeSlug) || filteredBikes[0];

  const handleSaveBike = () => {
    if (!currentBike) return;

    const newGarageBike: GarageBike = {
      brand: currentBike.brand,
      model: currentBike.name,
      year: selectedYear,
      slug: currentBike.slug,
    };

    addBikeToGarage(newGarageBike);
  };

  const brands = Array.from(new Set(bikes.map((b) => b.brand)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <Bike className="w-6 h-6 text-white" />
            <div>
              <h2 className="font-heading font-extrabold text-lg uppercase tracking-wider text-white">
                My Garage & Bike Fitment
              </h2>
              <p className="text-xs text-neutral-400">
                Save your motorcycle to see 100% verified fitment badges across the site.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsGarageOpen(false)}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Active Bike Status */}
          {activeBike ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                      Currently Active
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="font-heading text-base font-extrabold text-white uppercase">
                    {activeBike.brand} {activeBike.model} ({activeBike.year})
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveBike(null)}
                className="text-xs text-neutral-400 hover:text-white underline font-mono"
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-center space-y-1">
              <span className="text-xs text-neutral-400">No active bike selected</span>
              <p className="text-[11px] text-neutral-500">
                Select your motorcycle below to verify bolt-on accessory compatibility.
              </p>
            </div>
          )}

          {/* Add New Bike Form */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Select Motorcycle Model</span>
            </h3>

            {/* Select Brand */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                1. Select Brand
              </label>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      const firstBike = bikes.find((b) => b.brand === brand);
                      if (firstBike) setSelectedBikeSlug(firstBike.slug);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedBrand === brand
                        ? "bg-white text-black shadow-lg"
                        : "bg-neutral-900 text-neutral-300 hover:text-white border border-white/10"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Model */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                2. Select Bike Model
              </label>
              <select
                value={selectedBikeSlug}
                onChange={(e) => setSelectedBikeSlug(e.target.value)}
                className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-white"
              >
                {filteredBikes.map((bike) => (
                  <option key={bike.id} value={bike.slug} className="bg-black text-white">
                    {bike.name} ({bike.category} - {bike.engineCc}cc)
                  </option>
                ))}
              </select>
            </div>

            {/* Select Year */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                3. Select Model Year
              </label>
              <div className="flex flex-wrap gap-2">
                {(currentBike?.years || [2022, 2023, 2024, 2025, 2026]).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedYear === yr
                        ? "bg-white text-black"
                        : "bg-neutral-900 text-neutral-400 border border-white/10"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveBike}
              className="w-full py-3 rounded-xl bg-white text-black font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all transform active:scale-95 shadow-xl mt-4"
            >
              <Check className="w-4 h-4" />
              <span>Set as Active Garage Bike</span>
            </button>
          </div>

          {/* Saved Bikes List */}
          {savedBikes.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">
                Saved Motorcycles ({savedBikes.length})
              </h3>
              <div className="space-y-2">
                {savedBikes.map((sb) => (
                  <div
                    key={sb.slug}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/5"
                  >
                    <div>
                      <span className="text-sm font-bold text-white">
                        {sb.brand} {sb.model} ({sb.year})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveBike(sb)}
                        className="px-3 py-1 rounded-md bg-neutral-800 text-xs text-white font-medium hover:bg-neutral-700"
                      >
                        Select
                      </button>
                      <button
                        onClick={() => removeBikeFromGarage(sb.slug)}
                        className="p-1 text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
