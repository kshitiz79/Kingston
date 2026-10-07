import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Store, ExternalLink, ShieldCheck, Tag, ArrowRight } from 'lucide-react';

export default function WhereToBuyBanner() {
  return (
    <section className="py-14 bg-gradient-to-b from-[#080711] via-[#0d0924] to-[#080711] border-y border-violet-950/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#100d28]/90 border border-violet-800/50 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 font-semibold">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook Marketplace & Ads</span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  Licensed Retail Stores
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                Now available online, on Facebook, and in retail.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Arriving from our Facebook Marketplace ads? Take advantage of exclusive promo rates, order directly with free delivery across Canada, or find an authorized pharmacy partner near you.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  Official 2-Year Canadian Warranty
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-violet-300">
                  <Tag className="w-4 h-4" />
                  FB Ad Promo Code: FB10
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/where-to-buy"
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-700/40 transition-all flex items-center justify-center gap-2 text-center"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Visit Where to Buy Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/where-to-buy?product=fdbp-a2#fb-section"
                className="py-3.5 px-6 rounded-2xl bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-blue-200 border border-blue-500/30 text-xs font-medium transition-all flex items-center justify-center gap-2 text-center"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Browse FB Ad Offers</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
