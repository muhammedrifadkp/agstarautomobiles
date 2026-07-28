import Link from "next/link";
import { ArrowLeft, Bike } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 bg-black min-h-screen text-white flex items-center justify-center text-center">
      <div className="site-container max-w-md space-y-6">
        <div className="w-20 h-20 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
          <Bike className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            ERROR 404
          </span>
          <h1 className="font-heading text-4xl font-extrabold uppercase italic text-white">
            TRAIL ENDED HERE
          </h1>
          <p className="text-xs font-mono text-neutral-400">
            The page or accessory you are looking for has been moved or doesn't exist.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-2xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Homepage</span>
        </Link>
      </div>
    </div>
  );
}
