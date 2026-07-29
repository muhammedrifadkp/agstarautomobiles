"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="section-padding bg-black border-t border-white/10 relative overflow-hidden">
      <div className="site-container relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            JOIN THE RIDE COMMUNITY
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight italic">
            PRODUCT DROPS & EXCLUSIVE DEALS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Subscribe to receive new motorcycle fitment launches, tour stories, and VIP discounts directly to your inbox.
          </p>
        </div>

        {subscribed ? (
          <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 max-w-md mx-auto flex items-center justify-center gap-3 text-emerald-300 text-sm font-mono font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Welcome to AG Star Rider Club! Check your inbox soon.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              suppressHydrationWarning
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
            <button
              suppressHydrationWarning
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shrink-0 shadow-lg"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
