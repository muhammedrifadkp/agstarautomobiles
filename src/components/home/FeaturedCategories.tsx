import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export function FeaturedCategories() {
  return (
    <section id="categories" className="section-padding bg-black relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
              EXPLORE BY ACCESSORY TYPE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight italic mt-1">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid with Full-Bleed AI Photography & Dark Luxury Overlays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden h-72 border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col justify-between p-6 shadow-2xl bg-neutral-950"
            >
              {/* AI Full-Card Photography Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-125"
                />
                {/* Multi-stage dark luxury gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:via-black/50 transition-colors" />
                <div className="absolute inset-0 bg-carbon-pattern opacity-20" />
              </div>

              {/* Top Tag & Count */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white border border-white/20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md font-bold">
                  {category.productCount} PRODUCTS
                </span>
              </div>

              {/* Bottom Details & CTA */}
              <div className="relative z-10 space-y-3">
                <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight italic group-hover:text-white transition-colors leading-tight">
                  {category.name}
                </h3>
                <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed font-mono font-normal">
                  {category.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white transition-colors">
                    Browse Collection
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
