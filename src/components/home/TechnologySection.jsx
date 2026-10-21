import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders,
  Heart,
  Layers,
  Zap,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Info,
  X,
  HeartPulse,
  Flame,
  ShoppingBag,
  Activity
} from 'lucide-react';

export default function TechnologySection() {
  const [activeTechId, setActiveTechId] = useState('tens-women');
  const [selectedTechModal, setSelectedTechModal] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const technologies = [
    {
      id: 'tens-women',
      category: "Women's Health & Pain Therapy",
      icon: Zap,
      badge: "Women's Health & Pelvic Care",
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      glowColor: 'from-amber-600/20 via-rose-600/10 to-transparent',
      borderColor: 'border-amber-500/40',
      activeRing: 'ring-amber-500/50',
      title: 'Dual-Action TENS + Soothing Heat',
      subtitle: 'Electrothermal Neuro-Modulation for Women’s Care',
      tagline: '100% Drug-Free Relief for Menstrual Dysmenorrhea & Pelvic Cramps',
      desc: 'Engineered specifically for women’s wellness, primary dysmenorrhea, pelvic tension, and endometriosis discomfort. Kingston’s FDES technology merges bi-phasic TENS neuro-stimulation with gentle 43°C thermal therapy. Fast micro-electrical pulses stimulate cutaneous A-beta nerve fibers, closing the neural pain gate in the spinal cord to block cramping signals before reaching the brain—while therapeutic heat dilates pelvic micro-vessels to relax tight uterine smooth muscles.',
      image: '/images/4.png',
      stat: '100% Drug-Free',
      statLabel: 'Zero NSAID stomach irritation',
      accentColor: 'text-amber-400',
      productLink: '/products?category=tens',
      productLabel: 'View FDES-106 TENS Device ($47.99 CAD)',
      animationType: 'thermal-pulse',
      highlights: [
        { label: 'Gate Control Pain Block', desc: 'A-beta stimulation shuts spinal dorsal horn gate' },
        { label: '43°C Thermal Vasodilation', desc: 'Relaxes myometrial spasms & boosts blood flow' },
        { label: 'Cordless Discreet Wear', desc: 'Fits invisibly beneath clothing with hydrogel pads' }
      ],
      clinicalScience: {
        physiologicalMechanism: 'Bi-phasic micro-electrical currents stimulate cutaneous tactile afferent fibers (A-beta), which activate inhibitory interneurons in the substantia gelatinosa of the dorsal horn. This effectively suppresses the transmission of slow C-fiber and A-delta nociceptive pain signals from uterine and abdominal tissues. Simultaneously, steady thermal therapy stimulates cutaneous thermoreceptors to promote pelvic vasodilation and trigger central release of natural beta-endorphins.',
        targetPatients: 'Women suffering from painful menstrual cramps (primary dysmenorrhea), pelvic tension, postpartum lower back ache, muscle soreness, and active individuals seeking drug-free pain relief without gastrointestinal irritation.',
        advantagesOverConventional: [
          'Immediate non-invasive relief without pharmaceutical dependency or systemic toxicity',
          'Dual therapeutic action: electrical nerve blocking + soothing thermal heat',
          '20 fine-tuned intensity levels to match individual pain sensitivity',
          'Skin-friendly reusable hydrogel pads and USB-C rechargeable portability'
        ],
        relatedProducts: [
          { name: 'Kingston FDES-106 Wireless TENS + Heat Device', link: '/products?category=tens' }
        ]
      }
    },
    {
      id: 'mwi',
      category: 'Cardiovascular Hemodynamics',
      icon: Sliders,
      badge: 'Up-Curve Hemodynamics',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      glowColor: 'from-violet-600/20 via-indigo-600/10 to-transparent',
      borderColor: 'border-violet-500/40',
      activeRing: 'ring-violet-500/50',
      title: 'MWI Technology',
      subtitle: 'Measurement While Inflating',
      tagline: 'Gentle Up-Curve Sensing Without Squeezing Pain',
      desc: 'Conventional blood pressure monitors painfully over-inflate the cuff up to 180–200+ mmHg before slowly deflating, causing bruising and white-coat hypertensive spikes. Kingston’s proprietary MWI (Measurement While Inflating) technology analyzes arterial pulse harmonics in real time on the gentle rising inflation edge, completing measurement in ~25 seconds with clinical ±3 mmHg accuracy.',
      image: '/images/2.png',


      accentColor: 'text-violet-400',
      productLink: '/products?category=bp',
      productLabel: 'Browse MWI Monitors (A1, A2, A13)',
      animationType: 'wave-scan',
      highlights: [
        { label: 'Zero Over-Pressurization', desc: 'Stops inflating the instant systolic pressure is verified' },
        { label: 'Elderly & Maternal Safe', desc: 'Prevents vascular trauma and bruising in frail arms' },
        { label: 'Mitigates White-Coat Spikes', desc: 'Painless operation reduces reflex anxiety surges' }
      ],
      clinicalScience: {
        physiologicalMechanism: 'Unlike traditional deflation-step auscultation, MWI monitors the micro-vibrations in the brachial artery wall as air pressure gradually rises. The systolic inflection point and diastolic baseline are computed algorithmically on the rising edge, stopping inflation the exact instant target values are verified.',
        targetPatients: 'Hypertensive adults, seniors with fragile capillaries, individuals with white-coat hypertension anxiety, and pregnant women requiring frequent, comfortable blood pressure surveillance.',
        advantagesOverConventional: [
          'No overshoot inflation: Cuff stops rising as soon as systolic is detected',
          'Eliminates prolonged venous occlusion and temporary limb numbness',
          'Fast 25-second cycle promotes routine patient compliance',
          'Accredited oscillometric sensor accuracy meets ISO 81060-2 clinical protocols'
        ],
        relatedProducts: [
          { name: 'Kingston A1 Upper Arm Monitor (FDBP-A1)', link: '/products?category=bp' },
          { name: 'Kingston A2 LED Upper Arm Monitor (FDBP-A2)', link: '/products?category=bp' },
          { name: 'Kingston A13 Tubeless Monitor (FDBP-A13)', link: '/products?category=bp' }
        ]
      }
    },
    {
      id: 'ihb',
      category: 'Cardiac Surveillance',
      icon: Heart,
      badge: 'Arrhythmia Surveillance',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      glowColor: 'from-rose-600/20 via-pink-600/10 to-transparent',
      borderColor: 'border-rose-500/40',
      activeRing: 'ring-rose-500/50',
      title: 'IHB Arrhythmia Scan & WHO Profiling',
      subtitle: 'Sub-Millisecond Heart Rhythm Analysis',
      tagline: 'Instant Warning for Premature Ventricular Contractions',
      desc: 'During routine blood pressure assessment, Kingston’s high-precision sensor tracks the intervals between consecutive arterial pulses. If a variation greater than 25% from the median pulse interval is detected across the measurement cycle, the IHB alert displays alongside WHO 6-stage clinical color classification.',
      image: '/images/3.png',

      accentColor: 'text-rose-400',
      productLink: '/products?category=bp',
      productLabel: 'View IHB-Equipped Monitors',
      animationType: 'ecg-pulse',
      highlights: [
        { label: 'Early AFib Warning', desc: 'Detects irregular heartbeats before symptoms escalate' },
        { label: 'WHO 6-Stage Indicator', desc: 'Color-coded hypertension risk classification' },
        { label: 'Longitudinal Trend Memory', desc: 'Timestamped records for physician diagnostic review' }
      ],
      clinicalScience: {
        physiologicalMechanism: 'The device calculates pulse wave intervals (PWI) continuously using high-bandwidth pressure transducer signals. When arrhythmia conditions such as premature contractions or irregular sinus rhythms occur, the algorithmic variance triggers the IHB visual indicator.',
        targetPatients: 'Individuals with suspected atrial fibrillation, chronic hypertension, seniors, and patients undergoing cardiovascular surveillance.',
        advantagesOverConventional: [
          'Automatic screening during standard routine BP checks',
          'Color-coded risk categorization according to WHO/AHA guidelines',
          'Reduces reliance on isolated clinic visits for early rhythm detection'
        ],
        relatedProducts: [
          { name: 'Kingston A1 Upper Arm BP Monitor', link: '/products?category=bp' },
          { name: 'Kingston A2 High-Visibility BP Monitor', link: '/products?category=bp' }
        ]
      }
    },
    {
      id: 'cuff',
      category: 'Sensor Ergonomics',
      icon: Layers,
      badge: 'Sensor Ergonomics',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      glowColor: 'from-teal-600/20 via-emerald-600/10 to-transparent',
      borderColor: 'border-teal-500/40',
      activeRing: 'ring-teal-500/50',
      title: '360° Rigid Circumferential Cuff',
      subtitle: 'Zero-Misalignment Arterial Capture',
      tagline: 'Pre-Formed Cylindrical Core Eliminates Misplacement Errors',
      desc: 'Incorrect cuff placement is clinically proven to be the #1 contributor to erroneous home blood pressure readings. Kingston’s cylindrical cuff provides uniform 360-degree radial pressure across the arm (22–42 cm), ensuring dependable arterial pulse capture regardless of minor rotational positioning.',
      image: '/images/1.png',

      accentColor: 'text-teal-400',
      productLink: '/products?category=bp',
      productLabel: 'View Universal Cuff Devices',
      animationType: 'radar-ring',
      highlights: [
        { label: 'Zero Sensor Slippage', desc: 'Pre-formed curve hugs arm contour with one hand' },
        { label: 'Radial Uniform Seal', desc: 'Eliminates false readings caused by rotated cuffs' },
        { label: 'Universal Arm Coverage', desc: 'Fits slim to large bariatric adult arms comfortably' }
      ],
      clinicalScience: {
        physiologicalMechanism: 'Standard fabric cuffs rely on manual alignment of an internal bladder directly over the brachial artery. If rotated even 15 degrees, arterial occlusion becomes uneven, skewing pressure results by 10 mmHg or more. Kingston’s cylindrical architecture maintains uniform radial pressure throughout 360 degrees of arm contact.',
        targetPatients: 'Elderly patients living alone, individuals with varying arm circumferences (22–42 cm), and users seeking foolproof home measurement consistency.',
        advantagesOverConventional: [
          'Pre-formed curved shape eliminates slippage during placement',
          'Uniform pressure distribution avoids pinch points',
          'One universal cuff fits standard to large bariatric adult arms'
        ],
        relatedProducts: [
          { name: 'Kingston A1, A2 & A13 Series Upper Arm Monitors', link: '/products?category=bp' }
        ]
      }
    }
  ];

  const activeTech = technologies.find(t => t.id === activeTechId) || technologies[0];

  return (
    <section id="technology" className="py-16 sm:py-20 lg:py-24 bg-[#06050f] border-y border-violet-950/50 relative overflow-hidden">
      {/* Background ambient glow - smoothly responsive to active tech */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none transition-all duration-700" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none transition-all duration-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CANADIAN CLINICAL BIOMEDICAL PRINCIPLES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
            Intelligent architecture. Clinical integrity.
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Explore the proprietary engineering powering Kingston Instruments—from drug-free electrothermal neuro-modulation for women's wellness to gentle MWI blood pressure monitoring.
          </p>
        </div>

        {/* ── Sleek Interactive Technology Switcher Tabs ── */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 mb-8 scrollbar-none">
          {technologies.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === activeTechId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTechId(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all duration-300 ${isActive
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 scale-102 border border-violet-400/40'
                    : 'bg-[#100d28] text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : t.accentColor}`} />
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── Main Interactive Showcase Stage (Animated & Compact) ── */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0e0a24] via-[#100c2a] to-[#0a071a] border border-violet-800/40 shadow-2xl overflow-hidden transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">

            {/* Left Column: Visual Stage with Animated Accents */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden bg-[#070514] border border-white/10 p-5 flex items-center justify-center shadow-2xl group">

                {/* Visual Image with Smooth Micro-Animation */}
                <img
                  key={activeTech.id}
                  src={activeTech.image}
                  alt={activeTech.title}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-all duration-500 animate-in fade-in zoom-in-95"
                />

                {/* Animated Ambient Pulses based on technology */}
                {activeTech.id === 'tens-women' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono text-amber-300 backdrop-blur-md animate-pulse">
                    <Flame className="w-3 h-3 text-amber-400 animate-bounce" />
                    <span>43°C Heat Active</span>
                  </div>
                )}

                {activeTech.id === 'mwi' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-[10px] font-mono text-violet-300 backdrop-blur-md animate-pulse">
                    <Activity className="w-3 h-3 text-violet-400" />
                    <span>Up-Curve Scan</span>
                  </div>
                )}

                {activeTech.id === 'ihb' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono text-rose-300 backdrop-blur-md animate-pulse">
                    <Heart className="w-3 h-3 text-rose-400" />
                    <span>Rhythm Guard</span>
                  </div>
                )}

                {activeTech.id === 'cuff' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-[10px] font-mono text-teal-300 backdrop-blur-md animate-pulse">
                    <Layers className="w-3 h-3 text-teal-400" />
                    <span>360° Radial Seal</span>
                  </div>
                )}

                {/* Quick Metric Ribbon */}

              </div>
            </div>

            {/* Right Column: Architectural Clinical Details */}
            <div className="lg:col-span-7 space-y-4">

              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[11px] font-mono px-3 py-0.5 rounded-full border ${activeTech.badgeColor}`}>
                  {activeTech.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {activeTech.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeTech.title}
                </h3>
                <p className={`text-xs sm:text-sm font-medium ${activeTech.accentColor}`}>
                  {activeTech.tagline}
                </p>
              </div>

              {/* Concise Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {activeTech.desc}
              </p>

              {/* 3 Animated Highlight Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {activeTech.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all space-y-1"
                  >
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${activeTech.accentColor} flex-shrink-0`} />
                      <span className="truncate">{h.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions: Science Modal & Product Link */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedTechModal(activeTech)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-violet-400" />
                  <span>Explore Clinical Science</span>
                </button>

                <Link
                  to={activeTech.productLink}
                  className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-violet-600/30"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{activeTech.productLabel}</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* ── Compact 4-Card Selector Grid Below ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {technologies.map((t) => {
            const Icon = t.icon;
            const isCurrent = t.id === activeTechId;
            return (
              <div
                key={t.id}
                onClick={() => setActiveTechId(t.id)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex items-center gap-3 ${isCurrent
                    ? 'bg-[#181238] border-violet-500/60 shadow-lg shadow-violet-950/40 ring-1 ring-violet-500/40 scale-[1.01]'
                    : 'bg-[#0d0a20] border-violet-900/40 hover:border-violet-700/50 hover:bg-[#120e2e]'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${isCurrent ? 'bg-violet-600/30 border-violet-500/40 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                      {t.title}
                    </h4>
                    <span className="text-[10px] font-mono font-semibold text-emerald-400 flex-shrink-0">
                      {t.stat}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {t.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Technical Science Deep-Dive Modal ── */}
      {selectedTechModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#100d23] border border-violet-700/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedTechModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-32 h-32 sm:w-36 sm:h-36 aspect-square bg-[#080614] rounded-2xl border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <img
                  src={selectedTechModal.image}
                  alt={selectedTechModal.title}
                  className="max-h-full max-w-full object-contain p-2"
                />
              </div>

              <div className="space-y-1.5 text-center sm:text-left flex-grow">
                <span className="text-xs font-mono font-bold text-violet-400">{selectedTechModal.subtitle}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedTechModal.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedTechModal.tagline}</p>
                <div className="pt-1 inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Clinical Standard: FDA 510(k) & CE MDR Compliant</span>
                </div>
              </div>
            </div>

            {/* Physiological Mechanism */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-violet-300">
                Physiological Mechanism & Biomechanical Science
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 bg-[#080614] p-4 rounded-2xl border border-white/5 leading-relaxed">
                {selectedTechModal.clinicalScience.physiologicalMechanism}
              </p>
            </div>

            {/* Target Patients & Clinical Applications */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Recommended Clinical Applications
              </h4>
              <p className="text-xs text-slate-300 bg-white/[0.02] p-3.5 rounded-xl border border-white/5 leading-relaxed">
                {selectedTechModal.clinicalScience.targetPatients}
              </p>
            </div>

            {/* Key Clinical Advantages */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Core Clinical Advantages
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedTechModal.clinicalScience.advantagesOverConventional.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Devices */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Kingston Devices Featuring This Architecture:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTechModal.clinicalScience.relatedProducts.map((prod, idx) => (
                  <Link
                    key={idx}
                    to={prod.link}
                    onClick={() => setSelectedTechModal(null)}
                    className="text-xs text-violet-300 hover:text-white bg-violet-950/50 hover:bg-violet-900/50 px-3 py-1.5 rounded-xl border border-violet-800/40 transition-colors flex items-center gap-1.5"
                  >
                    <span>{prod.name}</span>
                    <ArrowRight className="w-3 h-3 text-violet-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTechModal(null)}
                className="py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
