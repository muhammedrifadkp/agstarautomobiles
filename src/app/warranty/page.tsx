import { ShieldCheck, CheckCircle } from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container max-w-3xl space-y-8 font-mono text-xs text-neutral-300">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            AG STAR GUARANTEE
          </span>
          <h1 className="font-heading text-4xl font-extrabold uppercase italic text-white">
            LIFETIME WARRANTY POLICY
          </h1>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-4">
          <h3 className="font-heading text-lg font-bold uppercase text-white">
            1. What Is Covered
          </h3>
          <p className="leading-relaxed">
            AG Star Automobiles provides a Lifetime Structural Warranty covering weld joints, bracket fatigue, and metal frame integrity under normal adventure touring conditions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-4">
          <h3 className="font-heading text-lg font-bold uppercase text-white">
            2. How To File A Claim
          </h3>
          <p className="leading-relaxed">
            If your product experiences a structural weld defect, contact our support team with your order ID and a clear photograph of the defect. We will issue a direct replacement wing or bracket free of charge.
          </p>
        </div>
      </div>
    </div>
  );
}
