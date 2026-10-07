import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import BloodPressureMonitor from './BloodPressureMonitor';

export default function HeroSection() {

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-violet-950/40">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">


            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-white">
                Precision with <span className="font-serif-instrument italic font-normal text-violet-300">care.</span>
              </h1>
              <p className="text-xl sm:text-2xl font-light text-slate-300 tracking-wide">
                Know your numbers. <span className="font-semibold text-white">Own your health.</span>
              </p>
            </div>

            {/* Lede Text */}
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Intelligent healthcare monitoring engineered for modern clinical fidelity and everyday confidence. Built on Canadian industrial heritage, purposeful ergonomics, and dependable measurement stability.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-full bg-white text-[#090715] font-semibold text-sm hover:bg-violet-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
              >
                <span>Explore Device Range</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/where-to-buy"
                className="px-6 py-3.5 rounded-full bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-800/60 font-semibold text-sm transition-all inline-flex items-center gap-2 shadow-lg shadow-violet-950/40"
              >
                <ShoppingBag className="w-4 h-4 text-violet-400" />
                <span>Where to Buy (FB & Retail)</span>
              </Link>
            </div>

            {/* Quick Pillars */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-lg font-bold text-white tracking-tight">±3 mmHg</div>
                <div className="text-xs text-slate-400 font-mono">Clinical Accuracy</div>
              </div>
              <div>
                <div className="text-lg font-bold text-violet-300 tracking-tight">MWI Tech</div>
                <div className="text-xs text-slate-400 font-mono">Gentle Inflation</div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-400 tracking-tight">100%</div>
                <div className="text-xs text-slate-400 font-mono">Canadian Brand</div>
              </div>
            </div>

          </div>

          {/* Hero Right: Interactive 3D Blood Pressure Monitor */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Ambient Backlight Glow behind the 3D device */}
            <div className="absolute w-[320px] h-[320px] bg-gradient-to-tr from-violet-600/30 via-indigo-500/25 to-purple-600/20 rounded-full blur-[90px] pointer-events-none -z-10" />

            {/* Model Badge / Live Interactive Tag */}
            <div className="flex items-center justify-between w-full max-w-[280px] sm:max-w-[290px] px-1 mb-2.5 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 text-violet-300 text-[11px] font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FDBP-A2 Series
              </span>
              <span className="text-[10px] text-violet-200 bg-violet-900/40 border border-violet-700/50 px-2 py-0.5 rounded-full">
                Press START
              </span>
            </div>

            {/* 3D Blood Pressure Monitor from Blood Pressure Monitor.html */}
            <BloodPressureMonitor />

            {/* Feature Footnote below the device */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="text-emerald-400 font-bold">✓</span> Real-Time Pulse Wave
              </span>
              <span className="flex items-center gap-1">
                <span className="text-violet-400 font-bold">✓</span> Dual User Memory (2×60)
              </span>
              <span className="flex items-center gap-1">
                <span className="text-indigo-400 font-bold">✓</span> Audio Feedback
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
