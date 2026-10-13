import React, { useEffect, useRef, useState } from 'react';

export default function FirstTimeLoader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef(null);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
    }, 500);
  };

  // Lock scroll while loader is visible
  useEffect(() => {
    if (!shouldRender) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldRender]);

  // Escape key to dismiss
  useEffect(() => {
    if (!shouldRender) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleDismiss();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shouldRender]);

  // Progress animation (runs on every page refresh, ~1.7s duration)
  useEffect(() => {
    if (!shouldRender) return;

    const startTime = performance.now();
    const duration = 1700; // 1.7s fast & smooth
    let rafId;
    let dismissTimer;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        dismissTimer = setTimeout(handleDismiss, 180);
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(dismissTimer);
    };
  }, [shouldRender]);

  // Blood Pressure Monitor Zigzag Waveform Animation (Compact)
  useEffect(() => {
    if (!shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let rafId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width || 340;
      const height = rect.height || 88;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Oscillometric Zigzag Curve from Blood Pressure Monitor
    const pulseWave = (p) => {
      const g = (x, c, s) => Math.exp(-Math.pow((x - c) / s, 2));

      return (
        0.12 * g(p, 0.08, 0.035) -
        0.28 * g(p, 0.13, 0.012) +
        1.38 * g(p, 0.155, 0.018) -
        0.44 * g(p, 0.18, 0.015) +
        0.36 * g(p, 0.30, 0.07) +
        0.22 * g(p, 0.44, 0.05)
      );
    };

    const render = (timeMs) => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width || 340;
      const H = rect.height || 88;
      const time = timeMs / 1000;
      const baseY = H * 0.62;
      const period = 60 / 72;
      const speed = 140;

      ctx.clearRect(0, 0, W, H);

      // Subtle medical grid in violet glow (matching Blood Pressure Monitor)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += 14) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Faint glowing emerald area under the wave
      const gradient = ctx.createLinearGradient(0, 0, 0, H);
      gradient.addColorStop(0, 'rgba(52, 211, 153, 0.16)');
      gradient.addColorStop(1, 'rgba(52, 211, 153, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= W; x += 2) {
        const p = ((((time - (W - x) / speed) / period) % 1) + 1) % 1;
        const y = baseY - pulseWave(p) * (H * 0.52);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Glowing emerald zigzag line
      ctx.save();
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      let leadY = baseY;
      for (let x = 0; x <= W; x += 2) {
        const p = ((((time - (W - x) / speed) / period) % 1) + 1) % 1;
        const y = baseY - pulseWave(p) * (H * 0.52);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        if (x >= W - 4) {
          leadY = y;
        }
      }
      ctx.stroke();
      ctx.restore();

      // Leading pulse sweep head dot
      ctx.save();
      ctx.shadowColor = '#a7f3d0';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ecfdf5';
      ctx.beginPath();
      ctx.arc(W - 2, leadY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,

        backdropFilter: 'blur(10px)',
      }}
      className={`fixed inset-0  flex flex-col items-center justify-center ${isExiting
        ? 'opacity-0 scale-[1.02] pointer-events-none blur-sm'
        : 'opacity-100 scale-100'
        }`}
    >


      {/* Compact Diagnostic Card */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] mx-4 p-5 rounded-2xl flex flex-col gap-4">
        {/* Header */}


        {/* Compact Waveform Viewport */}
        <div className="w-full h-20 sm:h-24 relative rounded-xl overflow-hidden z-20 ">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Progress bar and status */}

      </div>
    </div>
  );
}
