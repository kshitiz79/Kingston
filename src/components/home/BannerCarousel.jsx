import React, { useState, useEffect, useCallback, useRef } from 'react';

const banners = [
  { src: '/banner1.png', alt: 'Kingston Instruments — Banner 1' },
  { src: '/banner2.png', alt: 'Kingston Instruments — Banner 2' },
];

const AUTO_PLAY_INTERVAL = 4500;

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % banners.length);
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext]);

  return (
    <section
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-[#080711]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Product banner carousel"
    >
      {/* Slide track */}
      <div className="relative ">
        {banners.map((banner, idx) => (
          <div
            key={banner.src}
            className={`transition-opacity duration-700 ease-in-out mx-28 ${idx === current
              ? 'opacity-100 relative'
              : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            aria-hidden={idx !== current}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-auto block rounded-3xl"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${idx === current
              ? 'w-6 h-2 bg-white'
              : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
          />
        ))}
      </div>

      {/* Auto-play progress bar */}


      <style>{`
        @keyframes ks-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
