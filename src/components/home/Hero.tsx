"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Bike } from "lucide-react";
import { useGarage } from "@/hooks/useGarage";

export function Hero() {
  const { setIsGarageOpen } = useGarage();

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black">
      {/* AI Generated Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="AG Star Motorcycles Hero AI Background"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-40 scale-105 filter contrast-125 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-carbon-pattern opacity-30 mix-blend-overlay" />
      </div>

      <div className="site-container relative z-10 w-full text-center max-w-5xl mx-auto space-y-8">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-white/20 text-xs font-mono tracking-[0.25em] text-neutral-300 uppercase shadow-2xl backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>ENGINEERED FOR THE ROAD AHEAD</span>
        </div>

        {/* Main Bold Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white uppercase tracking-tighter leading-none italic">
          RIDE WITHOUT <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
            COMPROMISE
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Aircraft-grade T6 aluminum & high-tensile steel crash guards, luggage racks, and adventure armor designed for Indian highways and extreme touring.
        </p>

        {/* Magnetic Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span>Explore Accessories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            suppressHydrationWarning
            onClick={() => setIsGarageOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/90 text-white font-extrabold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 border border-white/20 hover:bg-neutral-800 hover:border-white transition-all backdrop-blur-md"
          >
            <Bike className="w-4 h-4 text-white" />
            <span>Select Your Bike</span>
          </button>
        </div>

        {/* Micro Features Row */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left border-t border-white/10 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span>100% Bolt-On Fitment</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span>Lifetime Structural Warranty</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span>CNC Laser Machine Precision</span>
          </div>
        </div>
      </div>
    </section>
  );
}
