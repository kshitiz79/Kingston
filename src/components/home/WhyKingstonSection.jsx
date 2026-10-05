import React from 'react';
import { ShieldCheck, Sliders, Layers, Sparkles } from 'lucide-react';

export default function WhyKingstonSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Precision & Accuracy',
      desc: 'Dependable measurement sensors engineered to deliver consistent readings in clinical environments and at home.',
      color: 'text-emerald-400'
    },
    {
      icon: Sliders,
      title: 'User-Focused Design',
      desc: 'Large high-contrast displays, intuitive single-button operations, and ergonomic cuffs accessible to all age groups.',
      color: 'text-violet-400'
    },
    {
      icon: Layers,
      title: 'Expanding Ecosystem',
      desc: 'Evolving portfolio spanning cardiovascular monitoring, diabetes management, non-contact infrared diagnostics, and electro-therapy.',
      color: 'text-indigo-400'
    },
    {
      icon: Sparkles,
      title: 'Global Relevance',
      desc: 'Trusted across pharmacies, hospital supply chains, and individual home care networks worldwide.',
      color: 'text-amber-400'
    }
  ];

  return (
    <section id="why-kingston" className="py-20 lg:py-28 bg-[#06050f] border-t border-violet-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-300">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-red-500" aria-hidden="true">
                <path d="M12 1.5l2.2 4.3 2.6-1.3-.9 6.1 3.2-2.2 1 2.2 3.6-.8-1.3 4.4 1.5 1-5.8 5-.5 1.9-6.3-1.3-.2 5.8h-1.2l-.2-5.8-6.3 1.3-.5-1.9L.7 14.1l1.5-1-1.3-4.4 3.6.8 1-2.2 3.2 2.2-.9-6.1 2.6 1.3z"/>
              </svg>
              <span>R-BIOMEDS CANADA HERITAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Rooted in Canadian ingenuity. Built for global health.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Inspired by the city of Kingston known for its strong industrial heritage and contribution to technical innovation, the brand reflects a foundation of discipline, reliability, and purposeful design.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Developed under the strategic direction of <span className="text-white font-medium">R-Biomeds Canada</span>, Kingston Instruments combines Canadian-led vision with international expertise and scalable innovation. This enables us to deliver premium quality devices with the consistency expected in today’s evolving healthcare landscape.
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">99 × 2</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Dual Memory Banks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400">&lt; 0.8 µL</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Micro Blood Sample</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-400">20 Levels</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">TENS Neuro Intensity</div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-3xl bg-[#0f0c24] border border-violet-900/40 space-y-3 hover:border-violet-700/50 transition-colors"
                >
                  <Icon className={`w-8 h-8 ${pillar.color}`} />
                  <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
