import { MapPin, Phone, ExternalLink } from "lucide-react";

export default function DealersPage() {
  const dealers = [
    { city: "Coimbatore", name: "AG Star Flagship Store", address: "Avinashi Road, Coimbatore, Tamil Nadu", phone: "+91 98765 43210" },
    { city: "Bengaluru", name: "Apex Moto Performance", address: "Koramangala 8th Block, Bengaluru, Karnataka", phone: "+91 98765 11223" },
    { city: "Mumbai", name: "Throttle & Torque Outlets", address: "Andheri West, Mumbai, Maharashtra", phone: "+91 98765 44556" },
    { city: "Delhi NCR", name: "Himalayan Rider Zone", address: "Karol Bagh, New Delhi", phone: "+91 98765 77889" },
    { city: "Pune", name: "Overland Gear Co.", address: "JM Road, Pune, Maharashtra", phone: "+91 98765 99001" },
  ];

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container max-w-4xl space-y-12">
        <div className="space-y-3 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            AUTHORIZATION & FITMENT OUTLETS
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase italic tracking-tight">
            DEALER NETWORK
          </h1>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Find official AG Star Automobiles dealers and authorized installation centers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dealers.map((dealer) => (
            <div key={dealer.name} className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-3">
              <span className="px-2.5 py-1 rounded bg-white text-black text-[10px] font-extrabold font-mono uppercase">
                {dealer.city}
              </span>
              <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                {dealer.name}
              </h3>
              <p className="text-xs text-neutral-400 font-mono flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{dealer.address}</span>
              </p>
              <p className="text-xs text-neutral-300 font-mono flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <span>{dealer.phone}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
