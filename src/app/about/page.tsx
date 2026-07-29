import { ShieldCheck, Flag, Wrench, Mountain, Award, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container max-w-4xl space-y-12">
        <div className="space-y-3 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            OUR STORY & BRAND IDENTITY
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase italic tracking-tight">
            ABOUT AG STAR AUTOMOBILES
          </h1>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Crafting aircraft-grade motorcycle protection, luggage racks, and adventure armor engineered specifically for Indian highways and extreme touring.
          </p>
        </div>

        {/* Mission Banner */}
        <div className="p-8 rounded-2xl bg-metal-surface border border-white/20 space-y-4">
          <h2 className="font-heading font-extrabold text-2xl uppercase italic text-white">
            RIDE WITHOUT COMPROMISE
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono">
            AG Star Automobiles was founded by touring riders and mechanical engineers who were dissatisfied with weak, vibrating aftermarket bike parts that rusted or bent during real-world adventure riding.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-mono">
            Based out of Bengaluru, India, our state-of-the-art facility manufactures precision cold-rolled steel crash guards, T6 aluminum top racks, and CNC skid plates using 3D chassis laser scan modeling.
          </p>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-3">
            <Cpu className="w-8 h-8 text-white" />
            <h3 className="font-heading font-extrabold text-lg uppercase text-white">
              3D Scan Laser Precision
            </h3>
            <p className="text-xs text-neutral-400 font-mono leading-relaxed">
              Every motorcycle frame is 3D laser scanned to ensure 100% bolt-on fitment without chassis cutting or forcing mounting holes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-3">
            <Award className="w-8 h-8 text-white" />
            <h3 className="font-heading font-extrabold text-lg uppercase text-white">
              Lifetime Structural Warranty
            </h3>
            <p className="text-xs text-neutral-400 font-mono leading-relaxed">
              We stand behind our welds and heavy gauge steel with a comprehensive lifetime warranty against structural cracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
