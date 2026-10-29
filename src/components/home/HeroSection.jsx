import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const bannerSlides = [
  {
    id: 'portfolio',
    image: '/banner/1.png',
    badge: 'Proudly Canadian • FDA 510(k) Cleared',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    title: 'Precision with care.',
    subtitle: 'Know your numbers. Own your health.',
    description: 'Intelligent healthcare diagnostics engineered for clinical fidelity, intuitive ergonomics, and everyday confidence. Complete home monitoring portfolio backed by a 3-Year Canadian warranty.',
    primaryCta: { label: 'Explore Device Range', mobileLabel: 'Explore Range', href: '/products' },
    secondaryCta: { label: 'Where to Buy (FB & Retail)', mobileLabel: 'Where to Buy', href: '/where-to-buy' },
    tabLabel: 'Portfolio Overview',
    highlights: [
      { value: '±3 mmHg', label: 'Clinical Accuracy' },
      { value: 'MWI Tech', label: 'Gentle Inflation' },
      { value: '3-Year', label: 'Canadian Warranty' },
    ],
  },
  {
    id: 'a1',
    image: '/banner/2.png',    
    badge: 'FDA 510(k) Cleared • Accessible Care',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    title: 'Kingston Instruments A1',
    subtitle: 'Quality blood-pressure monitoring, now within reach.',
    description: 'Straightforward dual-user cardiovascular tracking with gentle MWI measurement while inflating. FDA 510(k) cleared with 120 stored readings, irregular-heartbeat alert, and wide-range cuff.',
    primaryCta: { label: 'View A1 Monitor', mobileLabel: 'View A1', href: '/products?category=bp' },
    secondaryCta: { label: 'Order on Facebook ($39.99 CAD)', mobileLabel: 'Order ($39.99)', href: '/where-to-buy' },
    tabLabel: 'A1 Dual-User',
    highlights: [
      { value: '$39.99 CAD', label: 'Accessible Price' },
      { value: '120 Memory', label: 'Dual-User Storage' },
      { value: '22–42 cm', label: 'Wide-Range Cuff' },
    ],
  },
  {
    id: 'a2',
    image: '/banner/3.png',
    badge: 'Bestseller • High-Visibility LED',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    title: 'Kingston Instruments A2',
    subtitle: 'A clearer reading brings greater confidence.',
    description: 'Large, illuminated high-contrast LED display designed for effortless viewing by seniors and shared families. Dual 99-reading history, MWI inflation comfort, and USB-compatible power option.',
    primaryCta: { label: 'View A2 Monitor', mobileLabel: 'View A2', href: '/products?category=bp' },
    secondaryCta: { label: 'Buy A2 ($54.99 CAD)', mobileLabel: 'Buy ($54.99)', href: '/where-to-buy' },
    tabLabel: 'A2 LED Display',
    highlights: [
      { value: '$54.99 CAD', label: 'Direct Special' },
      { value: 'Large LED', label: 'High-Visibility Screen' },
      { value: 'USB 5V / AAA', label: 'Dual Power Choice' },
    ],
  },
  {
    id: 'a13',
    image: '/banner/4.png',

    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    title: 'Kingston Instruments A13',
    subtitle: 'No tubes. No bulky monitor. No compromise.',
    description: 'Experience upper-arm blood pressure monitoring without the tubes. Streamlined cuff-integrated construction with rechargeable 3.7V lithium battery, modern LED display, and 240 dual-user storage.',
    primaryCta: { label: 'View A13 Tubeless', mobileLabel: 'View A13', href: '/products?category=bp' },
    secondaryCta: { label: 'Buy A13 ($69.99 CAD)', mobileLabel: 'Buy ($69.99)', href: '/where-to-buy' },
    tabLabel: 'A13 Tubeless',
    highlights: [
      { value: '$69.99 CAD', label: 'Flagship Price' },
      { value: 'Tubeless', label: 'Cuff-Integrated' },
      { value: 'Rechargeable', label: '3.7V Li-ion' },
    ],
  },
];

const AUTO_PLAY_INTERVAL = 6000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext]);

  const activeSlide = bannerSlides[current];

  return (
    <section
      className="relative overflow-hidden bg-[#070512] border-b border-violet-950/40 select-none lg:min-h-[675px] flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Kingston Instruments Hero Banner"
    >
      {/* Mobile Dedicated 3D Product Visual Stage */}
      <div className="lg:hidden relative w-full h-[250px] sm:h-[320px] overflow-hidden bg-gradient-to-b from-[#070512] via-[#0b081e] to-[#070512] flex-shrink-0">
        {bannerSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-[78%_center]"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Soft bottom vignette into controls */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#070512] to-transparent pointer-events-none z-20" />
      </div>

      {/* Desktop Background Banner Imagery Container (hidden on mobile) */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        {bannerSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-right transition-transform duration-1000 ease-out ${
                idx === current ? 'scale-100' : 'scale-105'
              }`}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Hero Ambient Backlight Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-2 sm:pt-16 lg:pt-24 pb-4 sm:pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Column: Slide Content */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-3.5 sm:space-y-5 text-left">

            {/* Title & Subtitle - Hidden on phone (< sm) */}
            <div className="space-y-2 hidden sm:block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.08] text-white">
                {activeSlide.title.includes('care.') ? (
                  <>
                    Precision with <span className="font-serif-instrument italic font-normal text-violet-300">care.</span>
                  </>
                ) : (
                  activeSlide.title
                )}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-light text-violet-200/90 tracking-wide">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* Description - Hidden on phone (< sm) */}
            <p className="hidden sm:block text-slate-300/90 text-sm sm:text-base max-w-xl leading-relaxed font-light">
              {activeSlide.description}
            </p>

            {/* Professional Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5 w-full max-w-lg">
              {/* Primary CTA */}
              <Link
                to={activeSlide.primaryCta.href}
                className="group relative h-11 sm:h-12 px-3 sm:px-6 rounded-xl sm:rounded-full bg-white hover:bg-slate-50 text-slate-950 font-semibold text-xs sm:text-sm tracking-tight shadow-[0_2px_14px_rgba(255,255,255,0.22)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <span className="truncate hidden sm:inline">{activeSlide.primaryCta.label}</span>
                <span className="truncate sm:hidden">{activeSlide.primaryCta.mobileLabel || activeSlide.primaryCta.label}</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-slate-800 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary CTA */}
              <Link
                to={activeSlide.secondaryCta.href}
                className="group relative h-11 sm:h-12 px-2.5 sm:px-6 rounded-xl sm:rounded-full bg-violet-950/70 hover:bg-violet-900/70 active:bg-violet-950 text-violet-100 border border-violet-700/50 hover:border-violet-500/60 font-semibold text-xs sm:text-sm tracking-tight backdrop-blur-md shadow-[0_2px_14px_rgba(124,58,237,0.2)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0 text-violet-400" />
                <span className="truncate hidden sm:inline">{activeSlide.secondaryCta.label}</span>
                <span className="truncate sm:hidden">{activeSlide.secondaryCta.mobileLabel || activeSlide.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Dynamic Highlights Matrix */}
            <div className="pt-3 sm:pt-5 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              {activeSlide.highlights.map((item, idx) => (
                <div key={idx} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-2 sm:p-2.5 text-center sm:text-left flex flex-col justify-center">
                  <div className="text-xs sm:text-lg font-bold text-white tracking-tight truncate">
                    {item.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (Transparent area that allows the 3D renders in the banner to shine through) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[300px]" />

        </div>
      </div>

      {/* Bottom Bar: Tab Navigation & Slide Controls */}
      <div className="relative z-20 bg-gradient-to-t from-[#05040d] via-[#070512]/90 to-transparent pt-3 sm:pt-6 pb-4 sm:pb-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">

          {/* Quick Slide Tabs */}
          <div className="flex overflow-x-auto max-w-full items-center justify-start sm:justify-center gap-1.5 sm:gap-2 w-full sm:w-auto py-1 scrollbar-none">
            {bannerSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goTo(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 border flex-shrink-0 ${
                  idx === current
                    ? 'bg-violet-600/30 border-violet-400/60 text-white shadow-lg shadow-violet-900/40'
                    : 'bg-white/[0.03] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${idx === current ? 'bg-violet-400' : 'bg-slate-600'}`} />
                <span>{slide.tabLabel}</span>
              </button>
            ))}
          </div>

          {/* Arrows & Dot Indicators */}
          <div className="flex items-center gap-3">
            {/* Prev Arrow */}
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 px-2">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`rounded-full transition-all duration-300 ${idx === current ? 'w-5 h-1.5 bg-violet-400' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Linear Progress Bar for active slide */}
        <div className="w-full h-0.5 bg-white/5 mt-3 relative overflow-hidden">
          <div
            key={current}
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all"
            style={{
              animation: isPaused ? 'none' : `ks-progress ${AUTO_PLAY_INTERVAL}ms linear infinite`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes ks-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
