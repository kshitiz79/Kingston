import React from 'react';
import { Sliders, Heart, Layers, Zap } from 'lucide-react';

export default function TechnologySection() {
  const technologies = [
    {
      icon: Sliders,
      title: 'MWI Technology',
      desc: 'Measurement While Inflating measures blood pressure on the gentle up-curve, eliminating painful tight arm constriction and delivering faster readings.',
      color: 'bg-violet-500/10 border-violet-500/20 text-violet-300'
    },
    {
      icon: Heart,
      title: 'IHB Arrhythmia Alert',
      desc: 'Integrated sensor algorithms scan heart rhythms during each test and instantly flash an alert icon if irregular beats or potential arrhythmias are detected.',
      color: 'bg-rose-500/10 border-rose-500/20 text-rose-300'
    },
    {
      icon: Layers,
      title: '360° Rigid Cuff',
      desc: 'Eliminates inaccurate sensor placement. The self-wrapping cylindrical cuff wraps comfortably around your upper arm with full 360-degree arterial capture.',
      color: 'bg-teal-500/10 border-teal-500/20 text-teal-300'
    },
    {
      icon: Zap,
      title: 'Dual-Action TENS + Heat',
      desc: 'Simultaneous neuro-stimulation and thermal therapy that blocks pain receptors while relaxing muscular spasms for drug-free comfort.',
      color: 'bg-amber-500/10 border-amber-500/20 text-amber-300'
    }
  ];

  return (
    <section id="technology" className="py-20 bg-[#06050f] border-y border-violet-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-3xl bg-[#0f0c23] border border-violet-900/30 space-y-3 hover:border-violet-700/50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${tech.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{tech.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
