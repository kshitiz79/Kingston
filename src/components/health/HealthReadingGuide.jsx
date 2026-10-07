import React, { useState } from 'react';
import {
  Heart,
  Droplet,
  BookOpen,
  HelpCircle,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function HealthReadingGuide({ defaultCategory = 'bp' }) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory); // 'bp' | 'glucose'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState('how-to-read'); // 'how-to-read' | 'stages' | 'protocol' | 'terminology'

  // Blood Pressure Terminology Glossary
  const bpTerms = [
    {
      term: 'Systolic Blood Pressure (SYS)',
      tag: 'Top Number',
      normal: '< 120 mmHg',
      definition: 'The peak pressure in your arteries when the heart contracts (beats) and forcefully pumps oxygenated blood into the aorta and systemic circulatory system.'
    },
    {
      term: 'Diastolic Blood Pressure (DIA)',
      tag: 'Bottom Number',
      normal: '< 80 mmHg',
      definition: 'The baseline residual pressure in your arteries when the heart muscle relaxes and refills with blood between beats.'
    },
    {
      term: 'Pulse / Heart Rate (BPM)',
      tag: 'Beats per Minute',
      normal: '60 – 100 bpm',
      definition: 'The number of complete heart contractions per minute. Resting rates below 60 in non-athletes (bradycardia) or above 100 (tachycardia) warrant clinical review.'
    },
    {
      term: 'Pulse Pressure (PP)',
      tag: 'SYS minus DIA',
      normal: 'approx. 40 mmHg',
      definition: 'Calculated as Systolic minus Diastolic. A pulse pressure persistently greater than 60 mmHg is a clinical marker of stiffening large arteries and increased cardiovascular risk.'
    },
    {
      term: 'Mean Arterial Pressure (MAP)',
      tag: 'Perfusion Metric',
      normal: '70 – 100 mmHg',
      definition: 'The average arterial pressure across a single cardiac cycle, calculated as [(2 × DIA) + SYS] / 3. A minimum MAP of 65 mmHg is critical to ensure vital organ (kidney, brain) perfusion.'
    },
    {
      term: 'Arrhythmia / IHB Detection',
      tag: 'Irregular Rhythm',
      normal: 'Regular Sinus',
      definition: 'Kingston monitors automatically evaluate heart rhythm consistency. If heartbeat intervals fluctuate by more than 25% from the average during testing, the IHB indicator flashes to flag potential arrhythmias like Atrial Fibrillation (AFib).'
    },
    {
      term: 'MWI (Measurement While Inflating)',
      tag: 'Kingston Technology',
      normal: 'Gentle Inflation',
      definition: 'Patented oscillometric algorithm that calculates systolic and diastolic readings gently while the cuff is inflating, avoiding high over-pressurization and arm pain.'
    },
    {
      term: 'White-Coat Hypertension',
      tag: 'Clinical Variance',
      normal: 'Home Normalized',
      definition: 'A temporary rise in blood pressure that occurs in a clinic or doctors office caused by situational anxiety, despite normal blood pressure during daily home life.'
    },
    {
      term: 'Masked Hypertension',
      tag: 'Clinical Variance',
      normal: 'Clinic Normalized',
      definition: 'Blood pressure that tests within normal ranges in a medical office, but is elevated during daily life at home or work. Detectable only via routine home monitoring.'
    },
    {
      term: 'Oscillometric Method',
      tag: 'Diagnostic Principle',
      normal: 'Clinical Standard',
      definition: 'The sensor methodology utilized in digital blood pressure monitors that measures the microscopic pressure oscillations produced by blood flow pulses against an inflated arm cuff.'
    }
  ];

  // Blood Glucose Terminology Glossary
  const glucoseTerms = [
    {
      term: 'mmol/L (Millimoles per Litre)',
      tag: 'Canadian Standard',
      normal: 'Standard in CA & UK',
      definition: 'Molar concentration unit measuring how many thousandths of a mole of glucose exist per litre of blood. Standard metric across Canadian healthcare, hospitals, and pharmacies.'
    },
    {
      term: 'mg/dL (Milligrams per Decilitre)',
      tag: 'US Standard',
      normal: 'Standard in USA',
      definition: 'Mass concentration unit measuring the weight in milligrams of glucose per 100 millilitres of blood. Commonly used in American medical literature. Formula: mmol/L × 18.016 = mg/dL.'
    },
    {
      term: 'Fasting Blood Glucose (FBG)',
      tag: 'Basal Glycemia',
      normal: '3.9 – 5.5 mmol/L',
      definition: 'Blood sugar tested first thing in the morning after a minimum of 8 to 10 hours without caloric food or drink. Primary clinical screening test for pre-diabetes and diabetes.'
    },
    {
      term: 'Postprandial Glucose (PPG / Post-Meal)',
      tag: '2-Hour Post-Meal',
      normal: '< 7.8 mmol/L (Non-diabetic)',
      definition: 'Blood sugar tested exactly 1 to 2 hours after the start of a meal. Evaluates how effectively the pancreas secretes insulin and how readily body cells clear dietary carbohydrates.'
    },
    {
      term: 'Pre-prandial Blood Glucose',
      tag: 'Pre-Meal Reading',
      normal: '4.0 – 7.0 mmol/L',
      definition: 'Blood sugar tested immediately prior to eating a meal to establish basal requirements or calculate mealtime insulin boluses.'
    },
    {
      term: 'HbA1c (Glycated Hemoglobin)',
      tag: '3-Month Average',
      normal: '< 5.7% (Target < 7.0%)',
      definition: 'A laboratory blood test measuring the percentage of hemoglobin proteins coated with sugar. Provides a 90-day comprehensive historical window of blood glucose control.'
    },
    {
      term: 'Hypoglycemia ("Hypo" / Low Blood Sugar)',
      tag: 'Critical Low',
      normal: '≥ 4.0 mmol/L',
      definition: 'Blood sugar dropping below 4.0 mmol/L (70 mg/dL). Symptoms include shakiness, cold sweat, palpitations, and confusion. Treat immediately with the Rule of 15 (15g fast-acting sugar).'
    },
    {
      term: 'Hyperglycemia ("Hyper" / High Blood Sugar)',
      tag: 'Elevated Glucose',
      normal: '< 10.0 mmol/L',
      definition: 'Abnormally high blood glucose exceeding safe target thresholds (often > 11.0 mmol/L or > 200 mg/dL). Symptoms include frequent urination, excessive thirst, and lethargy.'
    },
    {
      term: 'Ketones & DKA',
      tag: 'Metabolic Byproduct',
      normal: 'Negative (< 0.6 mmol/L)',
      definition: 'Acidic chemical compounds produced when body cells cannot access glucose due to insulin deficiency and are forced to burn fat for fuel. High ketones can cause Diabetic Ketoacidosis (DKA).'
    },
    {
      term: 'Capillary Whole Blood vs. Venous Plasma',
      tag: 'Diagnostic Fluid',
      normal: 'Plasma-Calibrated',
      definition: 'Home meters analyze micro-drops of capillary blood from the fingertip, but Kingston biosensors calibrate results to match laboratory venous plasma values for direct doctor comparability.'
    }
  ];

  const currentTerms = activeCategory === 'bp' ? bpTerms : glucoseTerms;
  const filteredTerms = currentTerms.filter(t =>
    t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0e0b20] border border-violet-900/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
      
      {/* Header & Category Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-violet-900/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-violet-400" />
            <span>CLINICAL EDUCATION & GLOSSARY (HEALTH TOOLS EXCLUSIVE)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            How to Read Your Readings & Terminology Guide
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            Understand exactly what the numbers on your diagnostic devices mean, master accurate self-monitoring protocols, and demystify clinical cardiovascular and glycemic terms.
          </p>
        </div>

        {/* Category Tabs: BP vs Glucose */}
        <div className="flex items-center p-1.5 rounded-2xl bg-[#080614] border border-violet-900/60 shadow-lg self-start md:self-auto">
          <button
            onClick={() => setActiveCategory('bp')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeCategory === 'bp'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-300 fill-current" />
            <span>Blood Pressure Guide</span>
          </button>

          <button
            onClick={() => setActiveCategory('glucose')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeCategory === 'glucose'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Droplet className="w-4 h-4 text-teal-300 fill-current" />
            <span>Blood Glucose Guide</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: BLOOD PRESSURE SPECIFIC GUIDE */}
      {activeCategory === 'bp' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Card: How to Read a Blood Pressure Reading */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#130f2c] via-[#0d091e] to-[#080614] border border-violet-800/40 space-y-5">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>Decoding the Reading: What 120 / 80 mmHg Means</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Systolic Card */}
              <div className="p-4 rounded-xl bg-[#090716] border border-violet-500/20 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-400">First / Top Number</div>
                <div className="text-3xl font-mono font-bold text-violet-300">120 <span className="text-xs font-normal text-slate-400">mmHg</span></div>
                <div className="text-xs font-semibold text-white">Systolic Pressure (SYS)</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Measures the pressure in blood vessels when your heart muscle contracts and pumps blood out to the body.
                </p>
              </div>

              {/* Diastolic Card */}
              <div className="p-4 rounded-xl bg-[#090716] border border-emerald-500/20 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-400">Second / Bottom Number</div>
                <div className="text-3xl font-mono font-bold text-emerald-400">80 <span className="text-xs font-normal text-slate-400">mmHg</span></div>
                <div className="text-xs font-semibold text-white">Diastolic Pressure (DIA)</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Measures the arterial pressure when your heart rests between beats, allowing ventricles to refill with blood.
                </p>
              </div>

              {/* Pulse Card */}
              <div className="p-4 rounded-xl bg-[#090716] border border-amber-500/20 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-400">Third Number</div>
                <div className="text-3xl font-mono font-bold text-amber-400">72 <span className="text-xs font-normal text-slate-400">bpm</span></div>
                <div className="text-xs font-semibold text-white">Heart Rate (Pulse)</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  The frequency of heart contractions per minute. Normal adult resting heart rate typically spans 60 to 100 bpm.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-800/30 text-xs text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>What does mmHg stand for?</strong> Millimeters of Mercury. Historically, blood pressure was measured by how high blood pressure could push a column of liquid mercury in a glass tube. Modern digital monitors use oscillometric sensors calibrated to this precise clinical standard.
              </span>
            </div>
          </div>

          {/* Clinical Classification Stages Table (Hypertension Canada & AHA) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Hypertension Canada & AHA Clinical Classification Categories</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Adult Standard (At Rest)</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-violet-900/40 bg-[#090716]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#120e29] border-b border-violet-900/40 text-[11px] font-mono uppercase text-slate-400">
                  <tr>
                    <th className="p-3.5">Blood Pressure Category</th>
                    <th className="p-3.5">Systolic (SYS)</th>
                    <th className="p-3.5"></th>
                    <th className="p-3.5">Diastolic (DIA)</th>
                    <th className="p-3.5">Clinical Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-sky-400">Hypotension (Low BP)</td>
                    <td className="p-3.5">&lt; 90 mmHg</td>
                    <td className="p-3.5 text-slate-500 font-sans">and/or</td>
                    <td className="p-3.5">&lt; 60 mmHg</td>
                    <td className="p-3.5 font-sans text-slate-400">Check for dizziness, dehydration, or medication effects.</td>
                  </tr>
                  <tr className="bg-emerald-950/10 hover:bg-emerald-950/20">
                    <td className="p-3.5 font-bold text-emerald-400">Optimal / Normal</td>
                    <td className="p-3.5">&lt; 120 mmHg</td>
                    <td className="p-3.5 text-emerald-500 font-sans font-bold">and</td>
                    <td className="p-3.5">&lt; 80 mmHg</td>
                    <td className="p-3.5 font-sans text-emerald-300">Ideal range. Maintain heart-healthy nutrition and exercise.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-amber-400">Elevated (Pre-hypertension)</td>
                    <td className="p-3.5">120 – 129 mmHg</td>
                    <td className="p-3.5 text-amber-500 font-sans font-bold">and</td>
                    <td className="p-3.5">&lt; 80 mmHg</td>
                    <td className="p-3.5 font-sans text-slate-400">Adopt dietary sodium moderation; monitor trends weekly.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-orange-400">Stage 1 Hypertension</td>
                    <td className="p-3.5">130 – 139 mmHg</td>
                    <td className="p-3.5 text-orange-500 font-sans font-bold">or</td>
                    <td className="p-3.5">80 – 89 mmHg</td>
                    <td className="p-3.5 font-sans text-slate-400">Clinical evaluation recommended; lifestyle interventions.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-rose-400">Stage 2 Hypertension</td>
                    <td className="p-3.5">≥ 140 mmHg</td>
                    <td className="p-3.5 text-rose-500 font-sans font-bold">or</td>
                    <td className="p-3.5">≥ 90 mmHg</td>
                    <td className="p-3.5 font-sans text-slate-400">Prescription therapy evaluation; physician follow-up.</td>
                  </tr>
                  <tr className="bg-rose-950/20 hover:bg-rose-950/30">
                    <td className="p-3.5 font-bold text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Hypertensive Crisis</span>
                    </td>
                    <td className="p-3.5">&gt; 180 mmHg</td>
                    <td className="p-3.5 text-red-500 font-sans font-bold">and/or</td>
                    <td className="p-3.5">&gt; 120 mmHg</td>
                    <td className="p-3.5 font-sans text-red-300 font-bold">Emergency alert! Contact healthcare immediately if symptomatic.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Seven Golden Rules for Accurate BP Measurement */}
          <div className="p-6 rounded-2xl bg-[#090716] border border-violet-900/40 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>Clinical Protocol: How to Measure Blood Pressure Correctly</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-violet-400 font-bold text-[11px]">1. Rest for 5 Minutes</span>
                <p className="text-slate-300">Sit quietly in a comfortable chair for 5 full minutes prior to pressing start. Avoid rushing into a reading.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-violet-400 font-bold text-[11px]">2. Arm at Heart Level</span>
                <p className="text-slate-300">Rest your bare arm on a table with the cuff positioned at exact heart level. An arm hanging too low adds 5-10 mmHg falsely.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-violet-400 font-bold text-[11px]">3. Correct Sitting Posture</span>
                <p className="text-slate-300">Keep back supported, shoulders relaxed, and both feet flat on the floor. Do not cross your legs or ankles.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-violet-400 font-bold text-[11px]">4. Empty Your Bladder</span>
                <p className="text-slate-300">A full bladder stimulates the sympathetic nervous system and can elevate your systolic reading by 10 to 15 mmHg.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-violet-400 font-bold text-[11px]">5. Avoid Stimulants (30 mins)</span>
                <p className="text-slate-300">Refrain from caffeine, tobacco, nicotine vaping, alcohol, and vigorous physical exercise for 30 minutes prior.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-violet-400 font-bold text-[11px]">6. Double-Read & Average</span>
                <p className="text-slate-300">Take 2 consecutive readings spaced 1-2 minutes apart. Discard the first if elevated from cuff surprise, and average them.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: BLOOD GLUCOSE SPECIFIC GUIDE */}
      {activeCategory === 'glucose' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Card: How to Read Blood Glucose Numbers */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1824] via-[#09111c] to-[#080614] border border-teal-800/40 space-y-5">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Droplet className="w-4 h-4 fill-current" />
              <span>Decoding the Reading: mmol/L vs. mg/dL & Test Timing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Canadian mmol/L */}
              <div className="p-4 rounded-xl bg-[#090716] border border-teal-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-teal-400 font-bold">Canadian Standard</span>
                  <span className="text-[10px] font-mono text-slate-400">Used in CA & UK</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white">5.5 <span className="text-sm font-normal text-teal-400">mmol/L</span></div>
                <div className="text-xs font-semibold text-white">Millimoles per Litre</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Measures the molar concentration of glucose molecules per litre of blood. Standard metric utilized across Canadian doctors, clinics, and pharmacies.
                </p>
              </div>

              {/* US mg/dL */}
              <div className="p-4 rounded-xl bg-[#090716] border border-violet-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-violet-400 font-bold">US & Global Standard</span>
                  <span className="text-[10px] font-mono text-slate-400">Used in USA</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white">99 <span className="text-sm font-normal text-violet-400">mg/dL</span></div>
                <div className="text-xs font-semibold text-white">Milligrams per Decilitre</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Measures the weight (mass) of glucose in milligrams per decilitre (100 mL) of blood. Universal in American medicine and glucometers.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-800/30 text-xs text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Quick Conversion Rule:</strong> To convert Canadian mmol/L to US mg/dL, multiply by <strong>18</strong> (e.g. 5.5 × 18 = 99 mg/dL). To convert mg/dL to mmol/L, divide by <strong>18</strong> (e.g. 180 ÷ 18 = 10.0 mmol/L).
              </span>
            </div>
          </div>

          {/* Clinical Glycemic Targets Table (Diabetes Canada & WHO) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Clinical Glycemic Targets (Diabetes Canada Clinical Practice Guidelines)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Plasma-Calibrated</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-teal-900/40 bg-[#090716]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b1722] border-b border-teal-900/40 text-[11px] font-mono uppercase text-slate-400">
                  <tr>
                    <th className="p-3.5">Testing State & Timing</th>
                    <th className="p-3.5">Non-Diabetic Adult</th>
                    <th className="p-3.5">Target with Diabetes</th>
                    <th className="p-3.5">US Equivalent (mg/dL)</th>
                    <th className="p-3.5">Clinical Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white font-sans">Fasting (Before Breakfast)</td>
                    <td className="p-3.5 text-emerald-400">3.9 – 5.5 mmol/L</td>
                    <td className="p-3.5 text-teal-300">4.0 – 7.0 mmol/L</td>
                    <td className="p-3.5 text-slate-400">72 – 126 mg/dL</td>
                    <td className="p-3.5 font-sans text-slate-400">Overnight basal glucose production by the liver.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white font-sans">Pre-Meal (Lunch / Dinner)</td>
                    <td className="p-3.5 text-emerald-400">4.0 – 6.0 mmol/L</td>
                    <td className="p-3.5 text-teal-300">4.0 – 7.0 mmol/L</td>
                    <td className="p-3.5 text-slate-400">72 – 126 mg/dL</td>
                    <td className="p-3.5 font-sans text-slate-400">Baseline level before consuming a meal.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white font-sans">2 Hours Post-Meal (Postprandial)</td>
                    <td className="p-3.5 text-emerald-400">&lt; 7.8 mmol/L</td>
                    <td className="p-3.5 text-teal-300">5.0 – 10.0 mmol/L</td>
                    <td className="p-3.5 text-slate-400">90 – 180 mg/dL</td>
                    <td className="p-3.5 font-sans text-slate-400">Carbohydrate clearance and mealtime insulin peak.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white font-sans">Bedtime</td>
                    <td className="p-3.5 text-emerald-400">4.0 – 6.0 mmol/L</td>
                    <td className="p-3.5 text-teal-300">6.0 – 8.0 mmol/L</td>
                    <td className="p-3.5 text-slate-400">108 – 144 mg/dL</td>
                    <td className="p-3.5 font-sans text-slate-400">Provides overnight cushion against nocturnal hypoglycemia.</td>
                  </tr>
                  <tr className="bg-amber-950/20 hover:bg-amber-950/30">
                    <td className="p-3.5 font-bold text-amber-400 font-sans flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Hypoglycemia (&quot;Hypo&quot;)</span>
                    </td>
                    <td className="p-3.5 text-amber-400">&lt; 4.0 mmol/L</td>
                    <td className="p-3.5 text-amber-400">&lt; 4.0 mmol/L</td>
                    <td className="p-3.5 text-amber-300">&lt; 70 mg/dL</td>
                    <td className="p-3.5 font-sans text-amber-300 font-bold">Critical Low! Apply Rule of 15 (15g fast sugar, wait 15m).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Testing Best Practices for Blood Glucose */}
          <div className="p-6 rounded-2xl bg-[#090716] border border-teal-900/40 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Clinical Protocol: How to Test Blood Glucose with Maximum Accuracy</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-teal-400 font-bold text-[11px]">1. Wash & Dry Thoroughly</span>
                <p className="text-slate-300">Wash hands with warm soap and water. Microscopic sugar residue on fingertips (even from fruit peeling hours ago) causes massive false spikes.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-teal-400 font-bold text-[11px]">2. Side of the Fingertip</span>
                <p className="text-slate-300">Lance the soft side of your fingertip rather than the center pad. The sides have fewer pain receptors and capillaries bleed more smoothly.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-teal-400 font-bold text-[11px]">3. Do Not &quot;Milk&quot; Finger</span>
                <p className="text-slate-300">Squeezing your finger forcefully dilutes the capillary blood with interstitial tissue fluid, yielding artificially lowered readings.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-teal-400 font-bold text-[11px]">4. Micro 0.8 µL Sample</span>
                <p className="text-slate-300">Kingston GLM-72 requires only a pinhead-sized 0.8 µL droplet. Let the strip automatically sip the sample via capillary action.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-teal-400 font-bold text-[11px]">5. Protect Test Strips</span>
                <p className="text-slate-300">Keep test strips tightly sealed in their original desiccant vial. Moisture, humidity, and heat degrade the sensitive biosensor enzymes.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-teal-400 font-bold text-[11px]">6. Mark Your Meals</span>
                <p className="text-slate-300">Always tag readings as Fasting, Pre-Meal, or Post-Meal. An 8.5 mmol/L reading is normal after a hearty pasta dinner, but high if fasting.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 3: INTERACTIVE TERMINOLOGY GLOSSARY SEARCH */}
      <div className="pt-6 border-t border-violet-900/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>{activeCategory === 'bp' ? 'Blood Pressure' : 'Blood Glucose'} Clinical Terminology Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive medical definitions explained in everyday language.
            </p>
          </div>

          {/* Search filter for terminology */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeCategory === 'bp' ? 'BP' : 'glucose'} terms...`}
              className="w-full h-9 pl-8 pr-3 rounded-xl bg-[#080614] border border-violet-900/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Terminology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#090716] border border-violet-900/30 hover:border-violet-600/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-white group-hover:text-violet-200 transition-colors">
                  {item.term}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-violet-950/60 text-violet-300 border border-violet-800/40 flex-shrink-0">
                  {item.tag}
                </span>
              </div>

              <div className="text-[11px] font-mono text-emerald-400">
                Clinical Benchmark: <span className="text-slate-300">{item.normal}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-0.5">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-white/10 rounded-2xl">
            No terms found matching &quot;{searchQuery}&quot;. Try clearing your search.
          </div>
        )}
      </div>

    </div>
  );
}
