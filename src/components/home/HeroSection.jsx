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
    primaryCta: { label: 'Explore Device Range', href: '/products' },
    secondaryCta: { label: 'Where to Buy (FB & Retail)', href: '/where-to-buy' },
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
    primaryCta: { label: 'View A1 Monitor', href: '/products?category=bp' },
    secondaryCta: { label: 'Order on Facebook ($39.99 CAD)', href: '/where-to-buy' },
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
    primaryCta: { label: 'View A2 Monitor', href: '/products?category=bp' },
    secondaryCta: { label: 'Buy A2 ($54.99 CAD)', href: '/where-to-buy' },
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
    primaryCta: { label: 'View A13 Tubeless', href: '/products?category=bp' },
    secondaryCta: { label: 'Buy A13 ($69.99 CAD)', href: '/where-to-buy' },
    tabLabel: 'A13 Tubeless',
    highlights: [
      { value: '$69.99 CAD', label: 'Flagship Price' },
      { value: 'Tubeless', label: 'Cuff-Integrated' },
      { value: 'Rechargeable', label: '3.7V Lithium Cell' },
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
      className="relative overflow-hidden bg-[#070512] border-b border-violet-950/40 select-none min-h-[580px] sm:min-h-[620px] lg:min-h-[675px] flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Kingston Instruments Hero Banner"
    >
      {/* Background Banner Imagery Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bannerSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
          >
            {/* Banner Image positioned rightward to highlight 3D renders */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`   ${idx === current ? 'scale-100' : 'scale-105'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 sm:pt-16 lg:pt-24 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Slide Content */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-5 text-left">

            {/* Animated Badge */}


            {/* Title & Subtitle */}
            <div className="space-y-2">
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

            {/* Description */}
            <p className="text-slate-300/90 text-sm sm:text-base max-w-xl leading-relaxed font-light">
              {activeSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to={activeSlide.primaryCta.href}
                className="px-6 py-3.5 rounded-full bg-white text-[#090715] font-semibold text-sm hover:bg-violet-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
              >
                <span>{activeSlide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={activeSlide.secondaryCta.href}
                className="px-6 py-3.5 rounded-full bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-800/60 font-semibold text-sm transition-all inline-flex items-center gap-2 shadow-lg shadow-violet-950/40"
              >
                <ShoppingBag className="w-4 h-4 text-violet-400" />
                <span>{activeSlide.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Dynamic Highlights Matrix */}
            <div className="pt-5 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              {activeSlide.highlights.map((item, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                  <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
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
      <div className="relative z-20 bg-gradient-to-t from-[#05040d] via-[#070512]/90 to-transparent pt-6 pb-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Quick Slide Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
            {bannerSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goTo(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 border ${idx === current
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
