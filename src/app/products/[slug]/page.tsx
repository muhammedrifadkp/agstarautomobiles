"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  ShieldCheck,
  ShoppingBag,
  Heart,
  Sliders,
  ChevronDown,
  Wrench,
  Package,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Truck,
  RotateCcw,
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useGarage } from "@/hooks/useGarage";
import { ProductCard } from "@/components/product/ProductCard";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "box" | "install" | "care">("specs");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { activeBike, checkCompatibility } = useGarage();

  const isFavorited = isInWishlist(product.id);
  const fitment = checkCompatibility(product);

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const faqs = [
    {
      q: "Does this crash guard fit my exact bike model?",
      a: `This accessory is 100% precision engineered for ${product.compatibleBikeNames.join(
        ", "
      )}. It mounts directly to factory chassis mounting points using included Grade 8.8 fasteners with zero frame modifications.`,
    },
    {
      q: "What is the warranty coverage?",
      a: `All AG Star accessories carry a ${product.specs.warranty}. We cover structural weld cracking, bracket bending under normal load, and defects in materials.`,
    },
    {
      q: "How long does shipping take across India?",
      a: "Orders are dispatched within 24 hours via express surface air cargo. Delivery typically takes 2–4 business days across major Indian cities.",
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">
            Shop
          </Link>
          <span>/</span>
          <span className="text-white truncate">{product.title}</span>
        </div>

        {/* Main Product Layout (Gallery + Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main High-Res Image with Lens Zoom effect */}
            <div className="relative aspect-4/3 rounded-2xl bg-neutral-950 border border-white/10 overflow-hidden group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {product.isBestSeller && (
                  <span className="px-3 py-1 rounded-md bg-white text-black text-xs font-extrabold uppercase tracking-wider">
                    BEST SELLER
                  </span>
                )}
                {product.isNew && (
                  <span className="px-3 py-1 rounded-md bg-neutral-900 border border-white/20 text-white text-xs font-extrabold uppercase tracking-wider">
                    NEW
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? "border-white"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Specs & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                AG STAR ACCESSORY • {product.category}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase italic tracking-tight text-white mt-1">
                {product.title}
              </h1>
              <p className="text-xs text-neutral-300 mt-2 font-mono">{product.subtitle}</p>
            </div>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 py-2 border-y border-white/10 text-xs font-mono">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                <span className="font-bold text-white text-sm">{product.rating}</span>
                <span className="text-neutral-400 ml-1">({product.reviewCount} Reviews)</span>
              </div>
              <span className="text-emerald-400 font-bold uppercase">
                {product.inStock ? "✓ In Stock & Ready to Ship" : "Pre-order"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base line-through text-neutral-500">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Fitment Status */}
            <div
              className={`p-4 rounded-xl border text-xs flex items-center gap-3 font-medium ${
                fitment.isCompatible
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                  : "bg-red-950/40 border-red-500/30 text-red-300"
              }`}
            >
              <ShieldCheck className="w-5 h-5 shrink-0 text-white" />
              <div>
                <span className="font-bold block uppercase font-mono text-[11px]">
                  Motorcycle Fitment Status
                </span>
                <span>{fitment.message}</span>
              </div>
            </div>

            {/* Compatible Bikes Badge List */}
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-2 font-bold">
                Direct Compatible Models:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.compatibleBikeNames.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 text-neutral-200 text-xs font-mono border border-white/10"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-4 rounded-xl bg-white text-black font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all transform active:scale-95 shadow-2xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-xl border transition-colors ${
                  isFavorited
                    ? "bg-white text-black border-white"
                    : "bg-neutral-900 border-white/15 text-neutral-300 hover:text-white"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-black" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs (Specifications, Package Includes, Box Contents, Installation, Care) */}
        <div className="mb-16">
          <div className="flex border-b border-white/10 overflow-x-auto gap-4 font-heading uppercase text-sm">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-4 px-2 font-extrabold tracking-wider transition-colors border-b-2 ${
                activeTab === "specs"
                  ? "border-white text-white"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("box")}
              className={`pb-4 px-2 font-extrabold tracking-wider transition-colors border-b-2 ${
                activeTab === "box"
                  ? "border-white text-white"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Package Includes & In Box
            </button>
            <button
              onClick={() => setActiveTab("install")}
              className={`pb-4 px-2 font-extrabold tracking-wider transition-colors border-b-2 ${
                activeTab === "install"
                  ? "border-white text-white"
                  : "border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              Installation Guide
            </button>
          </div>

          <div className="py-8 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/10 mt-6">
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-neutral-400">Material Construction</span>
                  <span className="text-white font-bold">{product.specs.material}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-neutral-400">Surface Finish</span>
                  <span className="text-white font-bold">{product.specs.finish}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-neutral-400">Total Net Weight</span>
                  <span className="text-white font-bold">{product.specs.weight}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-neutral-400">Mounting Type</span>
                  <span className="text-white font-bold">{product.specs.mountingType}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-neutral-400">Warranty Coverage</span>
                  <span className="text-white font-bold">{product.specs.warranty}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-neutral-400">Country of Origin</span>
                  <span className="text-white font-bold">{product.specs.countryOfOrigin}</span>
                </div>
              </div>
            )}

            {activeTab === "box" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="font-heading font-extrabold text-sm uppercase text-white flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>Package Includes</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-mono text-neutral-300">
                    {product.packageIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-extrabold text-sm uppercase text-white flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>What's In The Box</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-mono text-neutral-300">
                    {product.boxContents.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-white shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "install" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-white" />
                    <span>Difficulty: <strong className="text-white">{product.installation.difficulty}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white" />
                    <span>Est. Time: <strong className="text-white">{product.installation.estimatedMinutes} mins</strong></span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-300 leading-relaxed font-mono">
                  <p>1. Ensure motorcycle is resting securely on center stand or paddock stand.</p>
                  <p>2. Remove factory chassis engine mount bolts using standard socket wrench.</p>
                  <p>3. Align AG Star crash guard bracket to frame holes and insert supplied SS bolts.</p>
                  <p>4. Torque fasteners to 35 Nm using a torque wrench.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl font-extrabold uppercase italic text-white mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-heading text-sm font-bold uppercase text-white"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-neutral-400" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openFaqIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-5 pt-0 text-xs text-neutral-300 leading-relaxed font-mono border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div>
          <h3 className="font-heading text-2xl font-extrabold uppercase italic text-white mb-6">
            RELATED ACCESSORIES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
