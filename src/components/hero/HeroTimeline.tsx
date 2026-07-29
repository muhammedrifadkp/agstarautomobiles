"use client";

import { useRef } from "react";
import { useFrameSequence } from "./useFrameSequence";
import { useHeroScroll } from "./useHeroScroll";
import { HeroCanvas } from "./HeroCanvas";
import { HeroOverlay } from "./HeroOverlay";

export function HeroTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { images, isLoaded, progress, loadedCount, totalCount } = useFrameSequence();
  const scrollState = useHeroScroll(sectionRef, isLoaded);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Preloading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <h3 className="font-mono text-xs text-neutral-300 uppercase tracking-[0.3em]">
              INITIALIZING CINEMATIC EXPERIENCE
            </h3>
            <p className="font-mono text-[10px] text-neutral-500">
              {loadedCount} / {totalCount} FRAMES PRELOADED ({progress}%)
            </p>
          </div>

          <div className="w-48 h-1 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Hero Viewport Area */}
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        {/* Canvas Renderer */}
        <HeroCanvas
          images={images}
          frameIndex={scrollState.frameIndex}
          scale={scrollState.cameraScale}
          isLoaded={isLoaded}
        />

        {/* Text and Interactive Overlays */}
        <HeroOverlay scrollState={scrollState} />

        {/* Scroll Indicator Prompt */}
        {scrollState.progress < 0.15 && isLoaded && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-neutral-400 font-mono text-[10px] uppercase tracking-[0.25em] animate-pulse">
            <span>SCROLL TO DISCOVER</span>
            <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
