"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-white">
      <div className="site-container max-w-5xl space-y-12">
        <div className="space-y-3 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            CUSTOMER SUPPORT & FITMENT HELP
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase italic tracking-tight">
            CONTACT AG STAR AUTOMOBILES
          </h1>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Need help selecting accessories for your motorcycle? Reach out to our technical support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-neutral-950 p-6 rounded-2xl border border-white/10">
            <h3 className="font-heading font-extrabold text-lg uppercase text-white">
              GET IN TOUCH
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block">Factory Address</span>
                  <span className="text-white font-bold">{siteConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block">Phone & WhatsApp Support</span>
                  <span className="text-white font-bold">{siteConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-400 block">Email Support</span>
                  <span className="text-white font-bold">{siteConfig.contact.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-heading font-extrabold text-xl text-white uppercase">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Thank you for reaching out! Our fitment specialist will reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-extrabold text-lg uppercase text-white">
                  Send Us A Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Motorcycle Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Enfield Himalayan 450"
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                    Your Query
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about accessory fitment, custom mounting, or order tracking..."
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <span>Submit Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
