import { Truck, Clock, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container max-w-3xl space-y-8 font-mono text-xs text-neutral-300">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            DELIVERY & LOGISTICS
          </span>
          <h1 className="font-heading text-4xl font-extrabold uppercase italic text-white">
            SHIPPING POLICY
          </h1>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-4">
          <h3 className="font-heading text-lg font-bold uppercase text-white">
            Express Transit Across India
          </h3>
          <p className="leading-relaxed">
            All orders are carefully packed in heavy cardboard boxes with high-density foam wrapping to prevent powder coating scratches.
          </p>
          <ul className="space-y-2 text-neutral-300 pt-2">
            <li>• Metro Cities: 2 to 3 Business Days</li>
            <li>• Tier 2 & Tier 3 Cities: 3 to 5 Business Days</li>
            <li>• Free Express Shipping on orders over ₹5,000</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
