"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HeroTimelineState {
  progress: number;
  frameIndex: number;
  logoOpacity: number;
  logoScale: number;
  cameraScale: number;
  headlineProgress: number;
  descProgress: number;
  ctaProgress: number;
  isScrolledNav: boolean;
}

export function useHeroScroll(
  triggerRef: RefObject<HTMLElement | null>,
  isLoaded: boolean
) {
  const [scrollState, setScrollState] = useState<HeroTimelineState>({
    progress: 0,
    frameIndex: 0,
    logoOpacity: 0,
    logoScale: 0.9,
    cameraScale: 1.0,
    headlineProgress: 0,
    descProgress: 0,
    ctaProgress: 0,
    isScrolledNav: false,
  });

  const frameIndexRef = useRef(0);

  useEffect(() => {
    if (!triggerRef.current || !isLoaded) return;

    const element = triggerRef.current;

    const ctx = gsap.context(() => {
      // Extended scroll pin distance for a significantly slower, ultra-cinematic scroll speed
      ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "+=350%", // Extended pin scroll length (3.5x viewport height) to decrease scroll speed further
        pin: true,
        scrub: 1.2, // Ultra-smooth momentum scrubbing
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress; // 0.0 to 1.0

          // 1. Logo (0% to 15%)
          let logoOpacity = 0;
          let logoScale = 0.9;
          if (p < 0.07) {
            const logoP = p / 0.07;
            logoOpacity = gsap.utils.clamp(0, 1, logoP);
            logoScale = 0.9 + logoP * 0.1;
          } else if (p < 0.14) {
            const logoP = (p - 0.07) / 0.07;
            logoOpacity = gsap.utils.clamp(0, 1, 1 - logoP);
            logoScale = 1.0 + logoP * 0.05;
          }

          // 2. Bike Frame Sequence (8% to 60%)
          let rawFrameIdx = 0;
          if (p <= 0.08) {
            rawFrameIdx = 0;
          } else if (p >= 0.60) {
            rawFrameIdx = 149;
          } else {
            const frameProgress = (p - 0.08) / 0.52;
            rawFrameIdx = Math.min(149, Math.floor(frameProgress * 149));
          }

          // 3. Camera slow push-in (15% to 60%)
          let cameraScale = 1.0;
          if (p > 0.15 && p <= 0.60) {
            const pushProgress = (p - 0.15) / 0.45;
            cameraScale = 1.0 + pushProgress * 0.06;
          } else if (p > 0.60) {
            cameraScale = 1.06;
          }

          // 4. Headline Fade-in (50% to 70%)
          let headlineProgress = 0;
          if (p > 0.50 && p <= 0.70) {
            headlineProgress = (p - 0.50) / 0.20;
          } else if (p > 0.70) {
            headlineProgress = 1;
          }

          // 5. Description Fade-in (65% to 80%)
          let descProgress = 0;
          if (p > 0.65 && p <= 0.80) {
            descProgress = (p - 0.65) / 0.15;
          } else if (p > 0.80) {
            descProgress = 1;
          }

          // 6. CTAs Fade-in (78% to 92%)
          let ctaProgress = 0;
          if (p > 0.78 && p <= 0.92) {
            ctaProgress = (p - 0.78) / 0.14;
          } else if (p > 0.92) {
            ctaProgress = 1;
          }

          frameIndexRef.current = rawFrameIdx;

          setScrollState({
            progress: p,
            frameIndex: rawFrameIdx,
            logoOpacity,
            logoScale,
            cameraScale,
            headlineProgress,
            descProgress,
            ctaProgress,
            isScrolledNav: p > 0.15,
          });
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [triggerRef, isLoaded]);

  return scrollState;
}
