"use client";

import { useState, useEffect, useRef } from "react";

const TOTAL_FRAMES = 150;
const PRIORITY_BATCH_SIZE = 20;

function padZero(num: number, size: number = 4): string {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function useFrameSequence() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;

    const handleFrameLoad = () => {
      if (!isMountedRef.current) return;
      count++;
      setLoadedCount(count);

      // Once initial priority batch (first 20 frames) is loaded, mark hero as ready for instant display
      if (count >= PRIORITY_BATCH_SIZE && !isLoaded) {
        setImages([...loadedImages]);
        setIsLoaded(true);
      } else if (count % 10 === 0 || count === TOTAL_FRAMES) {
        setImages([...loadedImages]);
      }
    };

    // Priority 1: Load first 20 frames immediately
    for (let i = 1; i <= PRIORITY_BATCH_SIZE; i++) {
      const img = new Image();
      const index = i - 1;
      img.src = `/hero-frames/frame_${padZero(i)}.webp`;
      img.onload = handleFrameLoad;
      img.onerror = handleFrameLoad;
      loadedImages[index] = img;
    }

    // Priority 2: Load remaining frames (21 to 150) in background
    for (let i = PRIORITY_BATCH_SIZE + 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const index = i - 1;
      img.src = `/hero-frames/frame_${padZero(i)}.webp`;
      img.onload = handleFrameLoad;
      img.onerror = handleFrameLoad;
      loadedImages[index] = img;
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return {
    images,
    loadedCount,
    totalCount: TOTAL_FRAMES,
    isLoaded,
    progress,
  };
}
