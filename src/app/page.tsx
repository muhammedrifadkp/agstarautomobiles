import { Hero } from "@/components/home/Hero";
import { BikeFinder } from "@/components/home/BikeFinder";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedBikes } from "@/components/home/FeaturedBikes";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BestSellers } from "@/components/home/BestSellers";
import { AdventureBanner } from "@/components/home/AdventureBanner";
import { WhyAGStar } from "@/components/home/WhyAGStar";
import { BuiltByRiders } from "@/components/home/BuiltByRiders";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

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
