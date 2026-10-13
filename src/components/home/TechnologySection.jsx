import React from 'react';
import { Sliders, Heart, Layers, Zap } from 'lucide-react';

export default function TechnologySection() {
  const technologies = [
    {
      icon: Sliders,
      title: 'MWI Technology',
      subtitle: 'Measurement While Inflating',
      desc: 'Measures blood pressure gently on the inflation up-curve, eliminating painful cuff over-tightening and delivering accurate readings up to 40% faster.',
      color: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
      image: '/images/2.png'
    },
    {
      icon: Heart,
      title: 'IHB Arrhythmia Alert',
      subtitle: 'Smart Heart Rhythm Scan',
      desc: 'Integrated clinical sensor algorithms continuously analyze arterial pulses, alerting you instantly if an irregular heartbeat or potential arrhythmia is detected.',
      color: 'bg-rose-500/10 border-rose-500/20 text-rose-300',
      image: '/images/3.png'
    },
    {
      icon: Layers,
      title: '360° Rigid Cuff',
      subtitle: 'Circumferential Capture',
      desc: 'Eliminates inaccurate sensor misalignment. The pre-formed cylindrical structure wraps effortlessly around the arm for true 360° arterial coverage.',
      color: 'bg-teal-500/10 border-teal-500/20 text-teal-300',
      image: '/images/1.png'
    },
    {
      icon: Zap,
      title: 'Dual-Action TENS + Heat',
      subtitle: 'Electrothermal Relief',
      desc: 'Simultaneous transcutaneous nerve stimulation and targeted thermal therapy to disrupt pain signals while deeply soothing tense muscle fibers.',
      color: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
      image: '/images/4.png'
    }
  ];

  return (
    <section id="technology" className="py-20 bg-[#06050f] border-y border-violet-950/50 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
            Canadian Engineering Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
            Intelligent architecture. Clinical integrity.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Medical devices should be effortless to operate without compromising diagnostic reliability. Explore the proprietary technologies engineered into Kingston instruments.
          </p>
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="group rounded-3xl bg-[#0d0a20] border border-violet-900/40 hover:border-violet-600/60 overflow-hidden flex flex-col "
              >
                {/* Visual Image Showcase */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#070512]">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle ambient gradient overlay */}
                  <div className="absolute inset-0 " />

                  {/* Floating Icon Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <div className={`w-9 h-9 rounded-xl border backdrop-blur-md flex items-center justify-center shadow-lg ${tech.color} bg-[#0d0a20]/80`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono tracking-wider uppercase text-violet-400 font-medium">
                      {tech.subtitle}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-violet-200 transition-colors">
                      {tech.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {tech.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
