import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Globe,
  Heart,
  Cpu,
  Layers,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Activity,
  Users,
  Compass,
  Building2,
  Stethoscope,
  Clock
} from 'lucide-react';

export default function AboutPage() {
  const corePillars = [
    {
      icon: ShieldCheck,
      title: 'Clinical Precision First',
      desc: 'We engineer devices with tight laboratory tolerances (±3 mmHg oscillometric accuracy, <0.8 µL enzymatic glucose sensors) so patients and clinicians can make decisions with complete confidence.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: Users,
      title: 'Accessible & Human-Centered',
      desc: 'Medical equipment should never intimidate. We prioritize spoken voice aid, giant backlit screens, one-touch memory recall, and effortless cuffs for seniors and everyday families.',
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
    },
    {
      icon: Award,
      title: 'Strict Quality Standards',
      desc: 'Operating under ISO 13485 medical device manufacturing protocols and rigorous multi-stage calibration to ensure zero drift over thousands of test cycles.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: Cpu,
      title: 'Continuous Innovation',
      desc: 'From Measurement While Inflating (MWI) that eliminates painful squeezing, to cordless 360° tubeless monitors and dual-action TENS heat therapy.',
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
    }
  ];

  const milestones = [
    {
      year: 'Heritage',
      title: 'Canadian Engineering Vision',
      desc: 'Established with the mission to elevate everyday health diagnostics through disciplined Canadian industrial standards.'
    },
    {
      year: 'R-Biomeds Hub',
      title: 'HQ in Kitchener, Ontario',
      desc: 'Anchor distribution, product testing, and clinical customer service located at 63 Meadowridge St in Ontario’s tech corridor.'
    },
    {
      year: 'Clinical Expansion',
      title: 'Retail & Global Presence',
      desc: 'Products made available through trusted pharmacies, retail health stores, direct Facebook Marketplace channels, and regional international offices.'
    },
    {
      year: 'Next Generation',
      title: 'Smart Health Diagnostics',
      desc: 'Evolving diagnostic portfolio spanning cardiovascular, diabetes, drug-free pain relief, and non-contact clinical optics.'
    }
  ];

  const internationalOffices = [
    { country: 'Canada (Global HQ)', city: 'Kitchener, Ontario', flag: '🇨🇦', role: 'Engineering, Supply & Operations' },
    { country: 'Singapore', city: 'Thomson View', flag: '🇸🇬', role: 'Southeast Asia Hub' },
    { country: 'Myanmar', city: 'Yangon', flag: '🇲🇲', role: 'Regional Clinical Distribution' },
    { country: 'Cambodia', city: 'Phnom Penh', flag: '🇰🇭', role: 'Medical Supply Liaison' },
    { country: 'India', city: 'New Delhi', flag: '🇮🇳', role: 'Regional Diagnostics Center' },
    { country: 'Nepal', city: 'Birgunj', flag: '🇳🇵', role: 'Community Health Partner' }
  ];

  return (
    <div className="min-h-screen bg-[#080711] text-[#edeaf8] selection:bg-violet-500/30">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-violet-950/50 overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-violet-600/15 via-rose-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-300">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-red-500" aria-hidden="true">
                <path d="M12 1.5l2.2 4.3 2.6-1.3-.9 6.1 3.2-2.2 1 2.2 3.6-.8-1.3 4.4 1.5 1-5.8 5-.5 1.9-6.3-1.3-.2 5.8h-1.2l-.2-5.8-6.3 1.3-.5-1.9L.7 14.1l1.5-1-1.3-4.4 3.6.8 1-2.2 3.2 2.2-.9-6.1 2.6 1.3z"/>
              </svg>
              <span>PROUD CANADIAN IDENTITY • R-BIOMEDS CANADA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Precision with Care.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-rose-300">
                Engineering Health for Life.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              At Kingston Instruments, we believe that tracking vital health markers should be effortless, dignified, and clinically uncompromising. We bring Canadian manufacturing discipline and empathetic healthcare technology into households and clinics worldwide.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/products"
                className="px-6 py-3 rounded-full bg-white text-[#090715] font-semibold text-xs hover:bg-violet-100 transition-all shadow-lg shadow-white/10 flex items-center gap-2"
              >
                <span>View Device Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/where-to-buy"
                className="px-6 py-3 rounded-full bg-violet-950/40 hover:bg-violet-900/40 text-violet-200 border border-violet-800/50 text-xs font-medium transition-all"
              >
                <span>Where to Buy (FB & Retail)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Origin */}
      <section className="py-20 border-b border-violet-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
                Our Heritage & Origins
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
                Inspired by Canadian industrial discipline, built for everyday health.
              </h2>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  The name <strong className="text-white">Kingston Instruments</strong> draws inspiration from the historic Canadian city of Kingston — renowned for its deep industrial legacy, educational excellence, and rigorous technical integrity.
                </p>
                <p>
                  Developed under the strategic guidance of <strong className="text-white">R-Biomeds Canada</strong> with corporate headquarters situated at 63 Meadowridge St in Kitchener, Ontario, we operate at the intersection of Canadian medical research ideals and modern consumer electronics usability.
                </p>
                <p>
                  Whether it is a daughter checking her mother’s blood pressure after dinner, an expectant mother monitoring gestational trends, or an athlete managing muscle recovery, our mission is to ensure their reading is exact, calm, and clinically meaningful.
                </p>
              </div>

              {/* Stats Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">±3 mmHg</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Clinical Tolerance</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-violet-400 tracking-tight">5 Seconds</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Glucose Test Time</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">6 Countries</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Global Presence</div>
                </div>
              </div>
            </div>

            {/* Story Right: Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#100d28] border border-violet-800/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-red-500" aria-hidden="true">
                        <path d="M12 1.5l2.2 4.3 2.6-1.3-.9 6.1 3.2-2.2 1 2.2 3.6-.8-1.3 4.4 1.5 1-5.8 5-.5 1.9-6.3-1.3-.2 5.8h-1.2l-.2-5.8-6.3 1.3-.5-1.9L.7 14.1l1.5-1-1.3-4.4 3.6.8 1-2.2 3.2 2.2-.9-6.1 2.6 1.3z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase">Headquarters</div>
                      <div className="text-base font-semibold text-white">Kitchener, Ontario, Canada</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#09071a] border border-white/5 space-y-2 text-xs text-slate-300">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-violet-400" />
                      <span>R-Biomeds Canada Facility</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      63 Meadowridge St, Kitchener, ON N2P 0E2. Central hub for Canadian device distribution, warranty validation, pharmacy wholesale coordination, and customer care.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>ISO 13485 Quality Management Protocols</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Medical-Grade Oscillometric & Infrared Sensors</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Direct Canadian 2-Year Manufacturer Warranty</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Distributed in Retail Pharmacies & Community Hubs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 bg-[#06050e] border-b border-violet-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              The four pillars behind every Kingston device.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              From our flagship blood pressure monitors to micro-sample glucose meters, these commitments guide our engineering and clinical testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-[#0f0c24] border border-violet-900/30 hover:border-violet-700/50 transition-all duration-300 space-y-3 group"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${p.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-white pt-1">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Innovation Spotlight */}
      <section className="py-20 border-b border-violet-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                Proprietary Technologies
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Engineering designed for human comfort.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Traditional diagnostic instruments are frequently clunky, complicated, and uncomfortable. We rethink medical form factors from the ground up:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#100d26] border border-white/5 space-y-1">
                  <div className="font-semibold text-violet-300">MWI (Measurement While Inflating)</div>
                  <div className="text-slate-400">Captures pulse signals during gentle inflation, eliminating that painful over-squeezing arm sensation.</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#100d26] border border-white/5 space-y-1">
                  <div className="font-semibold text-teal-300">Spoken Voice Feedback for Seniors</div>
                  <div className="text-slate-400">Our GLM-72 Glucose Meter speaks readings aloud, making self-care accessible for patients with low vision.</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#100d26] border border-white/5 space-y-1">
                  <div className="font-semibold text-indigo-300">360° Tubeless Wireless Architecture</div>
                  <div className="text-slate-400">Eliminates dangling tubes and messy cables with integrated pump, sensor, and LED screen directly on cuff.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#0f0c24] border border-violet-900/40 relative overflow-hidden"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold block mb-2">
                      {m.year}
                    </span>
                    <h3 className="text-base font-semibold text-white mb-2">{m.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Global Clinical Reach */}
      <section className="py-20 bg-[#06050e] border-b border-violet-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
              International Footprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Headquartered in Canada, serving patients globally.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Supported by R-Biomeds Canada, Kingston Instruments products are backed by certified offices and regional distribution partners across North America and Asia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {internationalOffices.map((office, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0d0922] border border-violet-900/30 flex items-start gap-4 hover:border-violet-700/40 transition-colors"
              >
                <span className="text-3xl flex-shrink-0" role="img" aria-label={office.country}>
                  {office.flag}
                </span>
                <div className="space-y-1">
                  <div className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold">
                    {office.country}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {office.city}
                  </div>
                  <div className="text-xs text-slate-400">
                    {office.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>EMPOWER YOUR HEALTH JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight">
            Ready to explore our clinical devices?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Discover our complete lineup of blood pressure monitors, glucose diagnostics, TENS pain therapy, and contactless thermometry.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-full bg-white text-[#090715] font-semibold text-xs hover:bg-violet-100 transition-all shadow-xl shadow-white/10 flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/where-to-buy"
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
            >
              <span>Where to Buy (FB & Retail)</span>
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-all"
            >
              <span>Contact Kitchener HQ</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
