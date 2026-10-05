import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Activity, Heart, Play, Square } from 'lucide-react';

export default function HeroSection() {
  const [activeSimModel, setActiveSimModel] = useState('a2');
  const [simStatus, setSimStatus] = useState('ready'); // ready, measuring, complete
  const [simValues, setSimValues] = useState({ sys: 120, dia: 80, pulse: 72 });
  const animRef = useRef(null);

  const handleStartSim = () => {
    if (simStatus === 'measuring') {
      setSimStatus('ready');
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    setSimStatus('measuring');
    setSimValues({ sys: 0, dia: 0, pulse: 0 });

    const start = performance.now();
    const duration = 2800;

    const animate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 0.6) {
        const curSys = Math.round((progress / 0.6) * 175);
        setSimValues({ sys: curSys, dia: 0, pulse: Math.round(55 + progress * 20) });
      } else {
        const settleProgress = (progress - 0.6) / 0.4;
        const targetSys = activeSimModel === 'a1' ? 122 : activeSimModel === 'a2' ? 118 : 120;
        const targetDia = activeSimModel === 'a1' ? 82 : activeSimModel === 'a2' ? 78 : 80;
        const targetPulse = 72;

        const curSys = Math.round(175 - settleProgress * (175 - targetSys));
        const curDia = Math.round(targetDia * settleProgress);
        const curPulse = Math.round(targetPulse);

        setSimValues({ sys: curSys, dia: curDia, pulse: curPulse });
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        const finalSys = activeSimModel === 'a1' ? 122 : activeSimModel === 'a2' ? 118 : 120;
        const finalDia = activeSimModel === 'a1' ? 82 : activeSimModel === 'a2' ? 78 : 80;
        setSimValues({ sys: finalSys, dia: finalDia, pulse: 72 });
        setSimStatus('complete');
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

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

            {/* Canadian Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-900/30 border border-violet-700/40 text-xs font-mono text-violet-200">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>R-BIOMEDS CANADA • KITCHENER, ON</span>
            </div>

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
              <a
                href="#products"
                className="px-6 py-3.5 rounded-full bg-white text-[#090715] font-semibold text-sm hover:bg-violet-100 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
              >
                <span>Explore Device Range</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#health-tools"
                className="px-6 py-3.5 rounded-full bg-violet-950/40 hover:bg-violet-900/40 text-violet-200 border border-violet-800/50 font-medium text-sm transition-all inline-flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-violet-400" />
                <span>Free Health Tools</span>
              </a>
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

          {/* Hero Right: Interactive Digital Monitor Stage */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              <div className="bg-[#100d23] border border-violet-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden">

                {/* Corner Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-violet-400/50" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-violet-400/50" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-violet-400/50" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-violet-400/50" />

                {/* Header bar of monitor */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-violet-200">
                      KINGSTON {activeSimModel.toUpperCase()} SIMULATOR
                    </span>
                  </div>



                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${simStatus === 'measuring'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : simStatus === 'complete'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      }`}>
                      {simStatus === 'measuring' ? 'INFLATING MWI...' : simStatus === 'complete' ? 'COMPLETE' : 'STANDBY'}
                    </span>
                  </div>


                </div>

                {/* Interactive Digital Segment Screen */}
                <div className="bg-[#06040e] border border-violet-900/50 rounded-2xl p-5 mb-6 relative shadow-inner">
                  <div className="grid grid-cols-3 gap-4 items-center">

                    {/* SYS */}
                    <div className="text-center border-r border-white/10 pr-2">
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">SYS mmHg</div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white mt-1 tabular-nums">
                        {simValues.sys > 0 ? String(simValues.sys).padStart(3, ' ') : '---'}
                      </div>
                      <div className="text-[10px] text-violet-400 font-mono mt-1">Systolic</div>
                    </div>

                    {/* DIA */}
                    <div className="text-center border-r border-white/10 px-2">
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">DIA mmHg</div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white mt-1 tabular-nums">
                        {simValues.dia > 0 ? String(simValues.dia).padStart(3, ' ') : '---'}
                      </div>
                      <div className="text-[10px] text-violet-400 font-mono mt-1">Diastolic</div>
                    </div>

                    {/* PULSE */}
                    <div className="text-center pl-2">
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">PULSE /min</div>
                      <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-emerald-400 mt-1 tabular-nums">
                        {simValues.pulse > 0 ? simValues.pulse : '--'}
                      </div>
                      <div className="text-[10px] text-emerald-400/80 font-mono mt-1 flex items-center justify-center gap-1">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                        <span>BPM</span>
                      </div>
                    </div>

                  </div>

                  {/* Animated ECG Pulse Wave with Live Cardiogram Scan */}
                  <div className="mt-4 pt-3 border-t border-white/10 relative h-10 overflow-hidden flex items-center ecg-mask">
                    <div className="w-full relative h-8 overflow-hidden">
                      <svg
                        className={`absolute left-0 top-0 h-8 w-[960px] fill-none transition-colors duration-300 ${simStatus === 'measuring'
                          ? 'stroke-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.85)] animate-ecg-active'
                          : simStatus === 'complete'
                            ? 'stroke-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.6)] animate-ecg-idle'
                            : 'stroke-violet-900/50'
                          }`}
                        viewBox="0 0 960 32"
                      >
                        <path
                          d={`M0 16 ${('h30 l4 -4 l4 4 h14 l3 4 l5 -20 l5 26 l4 -10 h12 l6 -5 l6 5 h27 ').repeat(8)}`}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>


                    </div>
                  </div>
                </div>

                {/* Device Control & Interactive Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                  {/* Model Switcher Tabs */}
                  <div className="flex items-center gap-1 bg-[#090616] p-1 rounded-xl border border-white/10 w-full sm:w-auto">
                    <button
                      onClick={() => { setActiveSimModel('a1'); setSimStatus('ready'); }}
                      className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${activeSimModel === 'a1'
                        ? 'bg-violet-600 text-white font-semibold shadow-md'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      Model A1
                    </button>
                    <button
                      onClick={() => { setActiveSimModel('a2'); setSimStatus('ready'); }}
                      className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${activeSimModel === 'a2'
                        ? 'bg-violet-600 text-white font-semibold shadow-md'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      Model A2 (MWI)
                    </button>
                    <button
                      onClick={() => { setActiveSimModel('a14'); setSimStatus('ready'); }}
                      className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${activeSimModel === 'a14'
                        ? 'bg-violet-600 text-white font-semibold shadow-md'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      Model A14 (Tubeless)
                    </button>
                  </div>

                  {/* Start/Stop Button */}
                  <button
                    onClick={handleStartSim}
                    className={`w-full sm:w-auto p-2  rounded-md font-medium text-xs tracking-wider uppercase font-mono flex items-center justify-center gap-2 transition-all ${simStatus === 'measuring'
                      ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                      : 'bg-violet-200 hover:bg-white text-[#090715] shadow-lg shadow-violet-500/20'
                      }`}
                  >
                    {simStatus === 'measuring' ? (
                      <>
                        <Square className="w-3 h-3 fill-current" />
                        <span className='text-[8px]'>Stop Pressure</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span className='text-[8px]'>Start Reading</span>
                      </>
                    )}
                  </button>

                </div>

                {/* Device Sub-caption */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>
                    {activeSimModel === 'a2' && 'FDBP-A2 • Intelligent Compression & LCD'}
                    {activeSimModel === 'a1' && 'FDBP-A1 • Dual-User 2×60 Channel Memory'}
                    {activeSimModel === 'a14' && 'FDBP-A14 • 360° Tubeless All-in-One Cuff'}
                  </span>
                  <span className="text-violet-300">Click Start Reading</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
