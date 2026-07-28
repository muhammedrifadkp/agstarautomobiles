import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "@/components/common/InstagramIcon";

export function InstagramFeed() {
  const instaPosts = [
    {
      id: 1,
      image: "/images/instagram/insta-feed-1.jpg",
      url: "https://www.instagram.com/reels/DSe3ht0iOgZ/",
      handle: "@agstar_automobiles",
      likes: "2.8k",
      location: "Spiti & Himalayan Trails"
    },
    {
      id: 2,
      image: "/images/instagram/insta-feed-2.jpg",
      url: "https://www.instagram.com/reels/DRYkrGpjrQ0/",
      handle: "@agstar_automobiles",
      likes: "1.9k",
      location: "Track & Performance Build"
    },
    {
      id: 3,
      image: "/images/instagram/insta-feed-3.jpg",
      url: "https://www.instagram.com/reels/DWna2TOkukz/",
      handle: "@agstar_automobiles",
      likes: "3.4k",
      location: "Adventure Expedition"
    },
    {
      id: 4,
      image: "/images/instagram/insta-feed-4.jpg",
      url: "https://www.instagram.com/reels/DSjFc4jk8Sc/",
      handle: "@agstar_automobiles",
      likes: "2.1k",
      location: "AG Star Custom Garage"
    },
  ];

  return (
    <section className="section-padding bg-black border-t border-white/5">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-white" />
              <span>FOLLOW THE COMMUNITY</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight italic mt-1">
              INSTAGRAM RIDER FEED
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white text-xs font-mono uppercase flex items-center gap-2 hover:bg-white hover:text-black transition-all"
            >
              <span>@agstar_automobiles</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={siteConfig.contact.instagramAlt}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white text-xs font-mono uppercase flex items-center gap-2 hover:bg-white hover:text-black transition-all"
            >
              <span>@moto_agp_</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Instagram Grid with High-Octane Rider Imagery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instaPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl"
            >
              <Image
                src={post.image}
                alt="Instagram Post"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-125"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4 text-center backdrop-blur-xs">
                <InstagramIcon className="w-8 h-8 text-white" />
                <span className="text-xs font-mono font-bold text-white">{post.handle}</span>
                <span className="text-[10px] font-mono text-neutral-300">📍 {post.location}</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">❤️ {post.likes}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
