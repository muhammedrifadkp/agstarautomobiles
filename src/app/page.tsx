import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { BikeFinder } from "@/components/home/BikeFinder";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";

// Dynamic imports for below-the-fold sections to boost initial loading speed
const FeaturedBikes = dynamic(
  () => import("@/components/home/FeaturedBikes").then((m) => m.FeaturedBikes),
  { loading: () => <div className="min-h-[400px] bg-black/40 animate-pulse" /> }
);

const FeaturedProducts = dynamic(
  () => import("@/components/home/FeaturedProducts").then((m) => m.FeaturedProducts),
  { loading: () => <div className="min-h-[500px] bg-black/40 animate-pulse" /> }
);

const BestSellers = dynamic(
  () => import("@/components/home/BestSellers").then((m) => m.BestSellers),
  { loading: () => <div className="min-h-[400px] bg-black/40 animate-pulse" /> }
);

const AdventureBanner = dynamic(
  () => import("@/components/home/AdventureBanner").then((m) => m.AdventureBanner)
);

const WhyAGStar = dynamic(
  () => import("@/components/home/WhyAGStar").then((m) => m.WhyAGStar)
);

const BuiltByRiders = dynamic(
  () => import("@/components/home/BuiltByRiders").then((m) => m.BuiltByRiders)
);

const InstagramFeed = dynamic(
  () => import("@/components/home/InstagramFeed").then((m) => m.InstagramFeed)
);

const Testimonials = dynamic(
  () => import("@/components/home/Testimonials").then((m) => m.Testimonials)
);

const Newsletter = dynamic(
  () => import("@/components/home/Newsletter").then((m) => m.Newsletter)
);

export default function HomePage() {
  return (
    <>
      {/* 1. Full Screen Hero */}
      <Hero />

      {/* 2. Bike Finder (directly below Hero) */}
      <BikeFinder />

      {/* 3. Featured Categories */}
      <FeaturedCategories />

      {/* 4. Featured Bikes */}
      <FeaturedBikes />

      {/* 5. Featured Products */}
      <FeaturedProducts />

      {/* 6. Best Sellers */}
      <BestSellers />

      {/* 7. Adventure Banner */}
      <AdventureBanner />

      {/* 8. Why AG Star */}
      <WhyAGStar />

      {/* 9. Built By Riders */}
      <BuiltByRiders />

      {/* 10. Instagram Feed */}
      <InstagramFeed />

      {/* 11. Testimonials */}
      <Testimonials />

      {/* 12. Newsletter */}
      <Newsletter />
    </>
  );
}
