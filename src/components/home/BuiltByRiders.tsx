import Image from "next/image";
import { Flag, Map, Mountain, ShieldAlert } from "lucide-react";

export function BuiltByRiders() {
  return (
    <section className="section-padding bg-neutral-950 border-y border-white/5 relative overflow-hidden">
      {/* Carbon pattern background texture */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-20 pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Visual Column with AI Lifestyle Workshop Image */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 group shadow-2xl">
            <Image
              src="/images/built-by-riders.png"
              alt="Built By Riders - AG Star Motorcycles Workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold block mb-1">
                TESTED ON REAL ROADS
              </span>
              <h4 className="font-heading font-extrabold text-base text-white uppercase">
                COIMBATORE • LADAKH • SPITI • WESTERN GHATS
              </h4>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white uppercase tracking-widest">
              <Flag className="w-3.5 h-3.5 text-white" />
              <span>CRAFTED IN INDIA</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight italic leading-tight">
              BUILT BY RIDERS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                FOR INDIAN ROADS.
              </span>
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              We started AG Star Automobiles because off-the-shelf motorcycle accessories often failed under real Indian road conditions — pot-holes, high-vibration monsoons, and extreme gravel trails.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Our team consists of passionate touring riders and mechanical engineers. Every crash guard geometry and saddle stay offset is field-tested over thousands of kilometers before entering production.
            </p>

            {/* Rider Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <Mountain className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Touring Ready</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Engineered to support heavy soft luggage and top boxes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Impact Dissipation</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Transfers impact energy to frame nodes, saving engine cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
