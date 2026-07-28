import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bike, ShieldCheck } from "lucide-react";
import { bikes } from "@/data/bikes";
import { products } from "@/data/products";

export function FeaturedBikes() {
  return (
    <section id="bikes" className="section-padding bg-neutral-950 border-t border-white/5">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 flex items-center gap-2">
              <Bike className="w-4 h-4 text-white" />
              <span>POPULAR MOTORCYCLE MODELS</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight italic mt-1">
              SHOP BY MOTORCYCLE
            </h2>
          </div>
          <Link
            href="/bikes"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white group"
          >
            <span>Browse All 24+ Bikes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Bikes Grid with Unique Imagery per Bike */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.slice(0, 6).map((bike) => {
            const fittedPartsCount = products.filter((p) =>
              p.compatibleBikes.includes(bike.id) || p.compatibleBikes.includes(bike.slug)
            ).length;

            return (
              <Link
                key={bike.id}
                href={`/bikes/${bike.slug}`}
                className="group relative rounded-2xl overflow-hidden h-80 border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col justify-between p-6 bg-black shadow-2xl"
              >
                {/* Background Unique Bike Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-125"
                  />
                  {/* Multi-stage Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:via-black/40 transition-colors" />
                  <div className="absolute inset-0 bg-carbon-pattern opacity-20" />
                </div>

                {/* Top Brand Pill & Accessory Count */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white border border-white/20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md font-bold">
                    {bike.brand}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                    {fittedPartsCount > 0 ? `${fittedPartsCount} Parts Fitted` : "Direct Fit"}
                  </span>
                </div>

                {/* Bottom Bike Info & CTA */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      {bike.category} • {bike.years.join(" - ")}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight italic group-hover:text-white transition-colors">
                      {bike.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15">
                    <span className="text-xs font-mono text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      <span>View Custom Armor</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
