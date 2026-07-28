import { ShieldCheck, Cpu, Layers, Wrench, Award, Compass } from "lucide-react";

export function WhyAGStar() {
  const pillars = [
    {
      icon: Cpu,
      title: "CNC Precision Engineering",
      description: "Machined on multi-axis CNC laser cutters for sub-millimeter bolt alignment.",
    },
    {
      icon: Layers,
      title: "Aircraft-Grade Materials",
      description: "Crafted from T6 6061 aluminum alloy & heavy-duty seamless mild steel tubing.",
    },
    {
      icon: ShieldCheck,
      title: "Dual-Coat Powder Finish",
      description: "Thermoset UV-resistant matte black powder coating protects against rust & scratches.",
    },
    {
      icon: Award,
      title: "Lifetime Structural Warranty",
      description: "Guaranteed structural integrity against welds splitting or bracket failure.",
    },
    {
      icon: Wrench,
      title: "Zero-Cut Bolt-On Installation",
      description: "Designed using 3D chassis scans for 100% direct frame mounting without cutting.",
    },
    {
      icon: Compass,
      title: "Tested on Tough Terrain",
      description: "Rigorously trail-tested across Ladakh, Spiti, Zoji La, and Western Ghats.",
    },
  ];

  return (
    <section className="section-padding bg-black border-t border-white/5">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            THE AG STAR DIFFERENCE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight italic">
            WHY RIDERS CHOOSE US
          </h2>
          <p className="text-sm text-neutral-400">
            We don't make generic catalog parts. Every accessory is custom engineered to absorb impact and protect your bike's most vital components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-metal-card p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-white uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
