import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders,
  Heart,
  Layers,
  Zap,
  ShieldCheck,
  Check,
  Sparkles,
  Clock,
  ArrowRight,
  Info,
  X,
  HeartPulse,
  Activity,
  Flame,
  ShoppingBag
} from 'lucide-react';

export default function TechnologySection() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTechModal, setSelectedTechModal] = useState(null);

  const technologies = [
    {
      id: 'mwi',
      category: 'cardio',
      icon: Sliders,


      title: 'MWI Technology',
      subtitle: 'Measurement While Inflating',
      summary: 'Measures blood pressure gently on the inflation up-curve, eliminating painful cuff over-tightening and delivering accurate readings up to 40% faster.',
      desc: 'Conventional blood pressure monitors inflate the cuff to excessively high pressures (often exceeding 180–200 mmHg) before slowly deflating to capture readings—causing arm pinching, numbness, and transient stress spikes. Kingston’s proprietary MWI (Measurement While Inflating) technology analyzes arterial oscillation harmonics in real time as the cuff gently inflates, capturing systolic and diastolic metrics in ~25 seconds with clinical ±3 mmHg precision.',
      image: '/images/2.png',

      keyPoints: [
        'Gentle up-curve inflation prevents arm bruising & numbness',
        'Reduces "White-Coat" stress spikes triggered by painful squeezing',
        'Ideal for sensitive elderly arms and maternal gestational monitoring',
        'FDA 510(k) cleared with ±3 mmHg pressure & ±5% pulse accuracy'
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
      id: 'tens-women',
      category: 'womens-health',
      icon: Zap,


      title: 'Dual-Action TENS + Heat Therapy',
      subtitle: 'Electrothermal Neuro-Modulation for Women’s Care',
      summary: 'Synergy of transcutaneous nerve stimulation and targeted soothing thermal heat to naturally block menstrual cramps and deep pelvic pain without medication.',
      desc: 'Engineered specifically for women’s wellness, menstrual dysmenorrhea, endometriosis cramps, and lumbar tension, Kingston’s FDES technology merges bi-phasic TENS neuro-stimulation with gentle thermal therapy (up to 43°C). Based on the Gate Control Theory of pain, high-frequency micro-pulses stimulate A-beta sensory nerve fibers, closing the neural gate in the spinal cord to intercept nociceptive pain signals before they reach the brain—all while therapeutic warmth dilates pelvic micro-vessels to relax tight uterine smooth muscles.',
      image: '/images/4.png',

      keyPoints: [
        'Targeted for primary dysmenorrhea, menstrual cramps & pelvic tension',
        'Gate Control Theory blocks pain signals at the spinal dorsal horn',
        'Therapeutic 43°C heat relaxes myometrial spasms & boosts blood flow',
        'Cordless, ultra-thin wearable design fits invisibly under clothing'
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
      id: 'ihb',
      category: 'cardio',
      icon: Heart,

      title: 'IHB Arrhythmia Alert & WHO Profiling',
      subtitle: 'Sub-Millisecond Heart Rhythm Analysis',
      summary: 'Integrated clinical sensor algorithms continuously analyze arterial pulses, alerting you instantly if an irregular heartbeat or potential arrhythmia is detected.',
      desc: 'During every blood pressure measurement, Kingston’s high-precision sensor tracks the intervals between consecutive arterial pulses. If a variation greater than 25% from the median pulse interval is detected across the measurement cycle, the IHB alert icon illuminates alongside the reading. Combined with WHO 6-stage color classification, patients receive immediate visual context on their cardiac rhythm and pressure stages.',
      image: '/images/3.png',

      keyPoints: [
        'Detects premature ventricular contractions & irregular heartbeats',
        'Immediate visual warning for timely clinical consultation',
        'Integrated WHO 6-stage color-coded hypertension classification',
        'Historical memory tracking for longitudinal physician evaluation'
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
      category: 'cardio',
      icon: Layers,

      title: '360° Rigid Circumferential Cuff',
      subtitle: 'Zero-Misalignment Arterial Capture',
      summary: 'Eliminates inaccurate sensor misalignment. The pre-formed cylindrical structure wraps effortlessly around the arm for true 360° arterial coverage.',
      desc: 'Clinical studies demonstrate that incorrect cuff positioning is the #1 cause of inaccurate home blood pressure readings. Kingston’s 360° circumferential cuff features an anatomically pre-formed cylindrical core that distributes inflation pressure uniformly across the entire upper arm (22–42 cm), ensuring accurate arterial pulse capture regardless of minor rotational positioning.',
      image: '/images/1.png',

      keyPoints: [
        'Eliminates measurement inaccuracies caused by sensor rotation',
        'Effortless one-handed self-application for seniors & solitary users',
        'Uniform radial pressure prevents localized arm pinching',
        'Durable medical-grade composite fabric, easily sanitized'
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

  const filteredTechs = activeTab === 'all'
    ? technologies
    : technologies.filter(t => t.category === activeTab);

  return (
    <section id="technology" className="py-20 lg:py-28 bg-[#06050f] border-y border-violet-950/50 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CANADIAN CLINICAL BIOMEDICAL PRINCIPLES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight leading-tight">
            Intelligent architecture. Clinical integrity.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Medical technology should deliver clinical precision without patient discomfort. Explore the proprietary engineering behind Kingston Instruments—from gentle MWI blood pressure monitoring to drug-free electrothermal neuro-modulation for women’s wellness.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Technologies' },
              { id: 'womens-health', label: "Women's Health & TENS Therapy" },
              { id: 'cardio', label: 'BPM MWI & Cardiovascular Sensing' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-[#100d28] text-slate-400 hover:text-white border border-white/10'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Banner: Women's Health & Dual-Action TENS Feature */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-[#170e28] via-[#1a1236] to-[#120c24] border border-amber-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-[11px] font-mono text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>WOMEN'S HEALTH SPOTLIGHT: DRUG-FREE PELVIC THERAPY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Dual-Action TENS + Soothing Heat for Menstrual Dysmenorrhea
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Menstrual cramps and pelvic tension originate from hyperactive myometrial contractions and localized ischemia. Kingston’s FDES-106 pairs <strong className="text-white">Gate Control neuro-stimulation</strong> with <strong className="text-white">43°C thermal vasodilation</strong> to shut down pain signal transmission along the spinal cord while relaxing tight abdominal smooth muscles—giving women 100% drug-free relief without NSAID stomach irritation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-200 bg-black/30 p-3 rounded-xl border border-white/5">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span><strong>The Pain Gate Mechanism:</strong> Fast A-beta nerve pulses block slow C-fiber cramping signals from reaching the brain.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-200 bg-black/30 p-3 rounded-xl border border-white/5">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Therapeutic Heat:</strong> Dilates micro-vessels, eases uterine spasms & triggers natural endorphin release.</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedTechModal(technologies[1])}
                  className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  <span>Read Clinical Science & Mechanism</span>
                </button>
                <Link
                  to="/products?category=tens"
                  className="px-5 py-2.5 rounded-xl bg-white text-[#0a0818] hover:bg-amber-100 text-xs font-semibold transition-colors flex items-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  <span>View FDES-106 TENS Device ($47.99 CAD)</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden bg-[#0a0718] border border-amber-500/20 shadow-2xl p-4 flex items-center justify-center">
                <img
                  src="/images/4.png"
                  alt="Dual-Action TENS + Heat Device"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-center text-amber-200">
                  Cordless • 20 Intensity Levels • USB-C Fast Charge
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Technology Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTechs.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.id}
                className="group rounded-3xl bg-[#0d0a22] border border-violet-900/40 hover:border-violet-500/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-violet-950/50 relative"
              >
                <div>
                  {/* Visual Image Showcase */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#070514] border-b border-white/5">
                    <img
                      src={tech.image}
                      alt={tech.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />




                    {/* Quick Metric Ribbon */}
                    <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-right">
                      <div className="text-xs font-bold text-white">{tech.stat}</div>
                      <div className="text-[9px] font-mono text-slate-400">{tech.statLabel}</div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono tracking-wider uppercase text-violet-400 font-medium">
                        {tech.subtitle}
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors">
                        {tech.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {tech.desc}
                    </p>

                    {/* Key Clinical Bullets */}
                    <div className="pt-3 border-t border-white/5 space-y-1.5">
                      {tech.keyPoints.slice(0, 3).map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedTechModal(tech)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/40 text-violet-200 border border-violet-800/40 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Explore Clinical Science</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lower Highlight: BPM MWI Technology Deep Dive */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#100d29] via-[#120e33] to-[#0d0924] border border-violet-700/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden bg-[#070514] border border-violet-500/20 p-4 flex items-center justify-center shadow-xl">
                <img
                  src="/images/2.png"
                  alt="MWI Technology Diagram"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-center text-violet-300">
                  Oscillometric Up-Curve Detection • Eliminates Squeezing Pain
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-[11px] font-mono text-violet-300">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                <span>CARDIOVASCULAR ARCHITECTURE: MWI (MEASUREMENT WHILE INFLATING)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Up-Curve Inflation Replaces Traditional Blood Pressure Squeezing
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Conventional monitors compress the arm up to 180–200+ mmHg before deflating, causing pain that often triggers reflex hypertensive spikes. Kingston’s <strong className="text-white">MWI Technology</strong> listens to the arterial pulse wave continuously while inflating, stopping the cycle the millisecond readings are mathematically verified.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-violet-300">Traditional Deflation Method:</div>
                  <p className="text-slate-400 text-[11px]">Inflates to ~200 mmHg, cuts circulation, slow deflation, causes white-coat anxiety and bruising.</p>
                </div>
                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 space-y-1">
                  <div className="font-semibold text-emerald-300">Kingston MWI Up-Curve Method:</div>
                  <p className="text-slate-300 text-[11px]">Inflates only to systolic threshold, measures 40% faster, gentle on elderly arms and pregnancy.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedTechModal(technologies[0])}
                  className="px-5 py-2.5 rounded-xl bg-violet-600/30 hover:bg-violet-600/40 text-violet-200 border border-violet-500/40 text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  <span>Inspect MWI Clinical Data</span>
                </button>
                <Link
                  to="/products?category=bp"
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-violet-600/30"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Browse MWI Monitors (A1, A2, A13)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Technical Science Deep-Dive Modal */}
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
                <p className="text-xs text-slate-300 leading-relaxed">{selectedTechModal.summary}</p>
                <div className="pt-1 inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Clinical Standard: FDA 510(k) & CE MDR Compliant</span>
                </div>
              </div>
            </div>

            {/* Physiological Mechanism */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
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
