"use client";

import { useEffect, useRef } from "react";

interface HeroCanvasProps {
  images: HTMLImageElement[];
  frameIndex: number;
  scale?: number;
  isLoaded: boolean;
}

export function HeroCanvas({
  images,
  frameIndex,
  scale = 1.0,
  isLoaded,
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = () => {
      const img = images[frameIndex] || images[0];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = window.innerWidth;
      const ch = window.innerHeight;

      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        canvas.style.width = `${cw}px`;
        canvas.style.height = `${ch}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear previous frame with pure black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);

      // Cover aspect ratio scaling calculations
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const imgRatio = iw / ih;
      const canvasRatio = cw / ch;

      let dw: number, dh: number;
      if (canvasRatio > imgRatio) {
        dw = cw * scale;
        dh = (cw / imgRatio) * scale;
      } else {
        dh = ch * scale;
        dw = (ch * imgRatio) * scale;
      }

      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(drawFrame);

    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [images, frameIndex, scale, isLoaded]);

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-500"
      />
    </div>
  );
}
