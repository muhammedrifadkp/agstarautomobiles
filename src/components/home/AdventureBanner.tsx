"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";

export function AdventureBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 27,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-black text-white">
      {/* AI Generated Adventure Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/adventure-bg.png"
          alt="Adventure Trail Riding AI Background"
          fill
          sizes="100vw"
          className="object-cover opacity-35 filter contrast-125 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-carbon-pattern opacity-40" />
      </div>

      <div className="site-container relative z-10">
        <div className="max-w-3xl space-y-6">
          {/* Limited Time Badge & Countdown */}
          <div className="inline-flex flex-wrap items-center gap-4 p-3 rounded-2xl bg-neutral-900/90 border border-white/15 backdrop-blur-md">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span>LIMITED TIME SEASON-END BUNDLES</span>
            </span>

            {/* Countdown timer blocks */}
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
              <span className="bg-black px-2 py-1 rounded border border-white/20">
                {String(timeLeft.days).padStart(2, "0")}d
              </span>
              <span>:</span>
              <span className="bg-black px-2 py-1 rounded border border-white/20">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="bg-black px-2 py-1 rounded border border-white/20">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="bg-black px-2 py-1 rounded border border-white/20">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>

          {/* Main Statement */}
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight italic">
            GENUINE PARTS. <br />
            FITTED RIGHT. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
              DELIVERED FAST.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
            Upgrade your ride with precision CNC-engineered crash guards, saddle stays, and luggage racks. Built to withstand extreme Himalayan weather and harsh gravel trails.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-neutral-200 transition-all shadow-2xl transform hover:scale-105"
            >
              <span>Explore Spare Parts & Armor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Insured Shipping Across India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
