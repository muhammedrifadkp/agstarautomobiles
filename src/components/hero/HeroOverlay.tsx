"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bike, Zap } from "lucide-react";
import { useGarage } from "@/hooks/useGarage";
import { HeroTimelineState } from "./useHeroScroll";

interface HeroOverlayProps {
  scrollState: HeroTimelineState;
}

export function HeroOverlay({ scrollState }: HeroOverlayProps) {
  const { setIsGarageOpen } = useGarage();

  const {
    logoOpacity,
    logoScale,
    headlineProgress,
    descProgress,
    ctaProgress,
    progress,
  } = scrollState;

  // Staggered text animation math
  const headlineY = (1 - headlineProgress) * 40; // translateY 40px -> 0px
  const headlineBlur = (1 - headlineProgress) * 12; // blur 12px -> 0px
  const headlineSpacing = headlineProgress > 0 ? `${(1 - headlineProgress) * 0.25}em` : "normal";

  const descY = (1 - descProgress) * 30; // translateY 30px -> 0px
  const descBlur = (1 - descProgress) * 8; // blur 8px -> 0px

  const ctaY = (1 - ctaProgress) * 25; // translateY 25px -> 0px

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center site-container">
      {/* 1. Opening Brand Logo & Tagline (0% - 14% Scroll) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: progress > 0.18 ? "none" : "flex",
        }}
      >
        <div className="relative w-48 sm:w-64 md:w-80 h-16 sm:h-20 md:h-24 mb-4 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          <Image
            src="/images/white-text-logo-without-bg.png"
            alt="AG Star Automobiles"
            fill
            sizes="320px"
            priority
            className="object-contain"
          />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-white/20 text-[10px] sm:text-xs font-mono tracking-[0.3em] text-neutral-300 uppercase shadow-2xl backdrop-blur-md">
          <Zap className="w-3 h-3 text-white animate-pulse" />
          <span>SUPERIOR AUTOMOTIVE ENGINEERING</span>
        </div>
      </div>

      {/* 2. Main Narrative Storytelling Text (45% - 100% Scroll) */}
      <div
        className="w-full max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 transition-opacity duration-300"
        style={{
          display: progress < 0.35 ? "none" : "block",
        }}
      >
        {/* Headline */}
        <div
          className="transition-all duration-300"
          style={{
            opacity: headlineProgress,
            transform: `translateY(${headlineY}px)`,
            filter: `blur(${headlineBlur}px)`,
            letterSpacing: headlineSpacing,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/80 border border-white/20 text-xs font-mono tracking-[0.25em] text-neutral-300 uppercase shadow-2xl backdrop-blur-md mb-4">
            <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>ENGINEERED FOR THE ROAD AHEAD</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white uppercase tracking-tighter leading-none italic">
            RIDE WITHOUT <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              COMPROMISE
            </span>
          </h1>
        </div>

        {/* Subtitle / Description */}
        <div
          className="transition-all duration-300"
          style={{
            opacity: descProgress,
            transform: `translateY(${descY}px)`,
            filter: `blur(${descBlur}px)`,
          }}
        >
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Aircraft-grade T6 aluminum & high-tensile steel crash guards, luggage racks, and adventure armor designed for Indian highways and extreme touring.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="pt-2 sm:pt-4 transition-all duration-300 pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          style={{
            opacity: ctaProgress,
            transform: `translateY(${ctaY}px)`,
          }}
        >
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
      </div>
    </div>
  );
}
