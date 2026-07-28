import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Truck, Wrench, RotateCcw, Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/common/InstagramIcon";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-24 md:pb-12 text-neutral-400">
      <div className="site-container">
        {/* Brand Value Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-16 border-b border-white/10">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/5">
            <ShieldCheck className="w-8 h-8 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-heading font-bold text-white uppercase">
                Lifetime Warranty
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Guaranteed against structural & weld defects.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/5">
            <Truck className="w-8 h-8 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-heading font-bold text-white uppercase">
                Fast India Express
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Insured express delivery across India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/5">
            <Wrench className="w-8 h-8 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-heading font-bold text-white uppercase">
                100% Bolt-On Fit
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Zero chassis cutting or welding required.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/5">
            <RotateCcw className="w-8 h-8 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-heading font-bold text-white uppercase">
                Easy Replacement
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Hassle-free 7-day fitment exchange.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-44">
                <Image
                  src="/images/nav-logo.png"
                  alt="AG Star Automobiles"
                  fill
                  sizes="176px"
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              Precision-built motorcycle accessories, crash protection, and adventure luggage armor crafted for Indian roads and extreme long-distance touring.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="w-4 h-4 text-white" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone className="w-4 h-4 text-white" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail className="w-4 h-4 text-white" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Instagram agstar_automobiles"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.instagramAlt}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Instagram moto_agp_"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Accessories */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-bold mb-4">
              Shop Accessories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.nav.footer.shop.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-bold mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.nav.footer.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-bold mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.nav.footer.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright & Disclaimer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} AG Star Automobiles. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-neutral-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-300">
              Terms of Service
            </Link>
            <Link href="/dealers" className="hover:text-neutral-300">
              Dealer Network
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
