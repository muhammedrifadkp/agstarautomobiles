export interface Bike {
  id: string;
  brand: string; // e.g., "Royal Enfield", "KTM", "BMW", "Honda", "Yamaha", "TVS", "Hero", "Bajaj"
  name: string; // e.g., "Himalayan 450", "Hunter 350", "Interceptor 650", "Duke 390", "XPulse 200 4V"
  slug: string;
  image: string;
  years: number[];
  category: "Adventure" | "Modern Classic" | "Naked Sport" | "Touring" | "Cruiser" | "Super Sport";
  engineCc: number;
  description: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  code: string;
  logoUrl?: string;
  origin: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string; // Category ID or name
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  compatibleBikes: string[]; // Bike slugs or IDs
  compatibleBikeNames: string[];
  description: string;
  features: string[];
  packageIncludes: string[];
  boxContents: string[];
  specs: {
    material: string;
    finish: string;
    weight: string;
    mountingType: string;
    warranty: string;
    countryOfOrigin: string;
  };
  installation: {
    difficulty: "Easy / Bolt-on" | "Moderate" | "Professional Recommended";
    estimatedMinutes: number;
    videoUrl?: string;
    guidePdf?: string;
  };
  careInstructions: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  bikeModel: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  avatar?: string;
}

export interface GarageBike {
  brand: string;
  model: string;
  year: number;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedBike?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  bikeSlug: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: "featured" | "price-low" | "price-high" | "rating" | "newest";
}
