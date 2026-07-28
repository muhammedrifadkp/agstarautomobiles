import { Star, Quote, CheckCircle } from "lucide-react";
import { reviews } from "@/data/reviews";

export function Testimonials() {
  return (
    <section className="section-padding bg-neutral-950 border-t border-white/5">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            REAL RIDER VERIFIED FEEDBACK
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight italic">
            WHAT RIDERS SAY
          </h2>
          <p className="text-xs text-neutral-400">
            Over 5,000+ touring riders trust AG Star accessories on highways & extreme trails across India.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-metal-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/25 transition-all"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center text-amber-400 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <h3 className="font-heading font-bold text-sm text-white uppercase line-clamp-1">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed italic font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">{rev.author}</h4>
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    {rev.bikeModel} • {rev.location}
                  </span>
                </div>
                {rev.verifiedPurchase && (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
