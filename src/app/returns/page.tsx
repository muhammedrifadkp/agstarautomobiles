export default function ReturnsPage() {
  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container max-w-3xl space-y-8 font-mono text-xs text-neutral-300">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            HASSLE-FREE EXCHANGE
          </span>
          <h1 className="font-heading text-4xl font-extrabold uppercase italic text-white">
            RETURNS & EXCHANGES
          </h1>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border border-white/10 space-y-4">
          <h3 className="font-heading text-lg font-bold uppercase text-white">
            7-Day Fitment Exchange
          </h3>
          <p className="leading-relaxed">
            If you accidentally ordered a part for the wrong model year or motorcycle variant, you can initiate a return or exchange within 7 days of delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
