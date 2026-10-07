import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HeartPulse, ArrowRight, Sparkles, ShoppingBag, BookOpen, Droplet, Heart } from 'lucide-react';
import HealthToolsSuite from '../components/home/HealthToolsSuite';
import HealthReadingGuide from '../components/health/HealthReadingGuide';

export default function HealthToolsPage() {
  return (
    <div className="min-h-screen bg-[#080711] text-[#edeaf8] selection:bg-violet-500/30">
      
      {/* Hero */}
      <section className="relative pt-12 pb-14 lg:pt-18 lg:pb-20 border-b border-violet-950/50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-600/15 via-rose-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
            <Activity className="w-3.5 h-3.5 text-violet-400" />
            <span>INTERACTIVE CLINICAL HEALTH & EDUCATION SUITE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
            Free Interactive Health Calculators & Reading Guides
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Monitor your vital statistics with our clinical BMI analyzer, blood pressure trend logger, and blood glucose unit converter. Plus, read our authoritative clinical guides on how to interpret BP and blood glucose readings and what each medical term means.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#reading-guide"
              className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-violet-600/30"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>How to Read BP & Glucose Guide</span>
            </a>

            <Link
              to="/products"
              className="px-5 py-2.5 rounded-full bg-white text-[#090715] font-semibold text-xs hover:bg-violet-100 transition-colors flex items-center gap-1.5"
            >
              <span>Explore Diagnostic Monitors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/where-to-buy"
              className="px-5 py-2.5 rounded-full bg-violet-950/50 hover:bg-violet-900/50 text-violet-200 border border-violet-800/40 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Where to Buy (FB & Retail)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Suite (Interactive Calculators & Embedded Guides) */}
      <HealthToolsSuite showGuide={true} />

      {/* Dedicated Standalone Reading Guide & Terminology Section (Exclusive to Health Tools) */}
      <section id="reading-guide" className="py-16 bg-[#070513] border-t border-violet-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
              Clinical Reference Handbook
            </span>
            <h2 className="text-3xl font-medium text-white tracking-tight mt-1">
              Complete Reading & Terminology Breakdown
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Learn how to interpret your numbers, understand clinical thresholds from Hypertension Canada and WHO, and explore comprehensive definitions for every cardiovascular and glycemic metric.
            </p>
          </div>

          <HealthReadingGuide defaultCategory="bp" />
        </div>
      </section>

      {/* Medical Disclaimer Banner */}
      <section className="py-12 bg-[#06050e] border-t border-violet-950/40">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CLINICAL REFERENCE ADVISORY</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            These interactive health tools and clinical reading guides are provided for educational and wellness awareness only. They do not constitute official medical advice, clinical diagnosis, or treatment plans. Please consult your physician or licensed healthcare provider for questions regarding hypertension, cardiovascular health, or diabetes management.
          </p>
        </div>
      </section>

    </div>
  );
}
