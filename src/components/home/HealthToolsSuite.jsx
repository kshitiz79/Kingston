import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Heart,
  Droplet,
  AlertCircle,
  Trash2,
  Info,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import HealthReadingGuide from '../health/HealthReadingGuide';

export default function HealthToolsSuite({ showGuide = true, initialTool = 'bmi' }) {
  const [activeTool, setActiveTool] = useState(initialTool);
  const [guideCategory, setGuideCategory] = useState('bp');
  
  // BMI Tool State
  const [bmiUnit, setBmiUnit] = useState('metric');
  const [heightCm, setHeightCm] = useState(172);
  const [weightKg, setWeightKg] = useState(68);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(8);
  const [weightLb, setWeightLb] = useState(150);

  // Blood Pressure Tracker State
  const [bpSys, setBpSys] = useState('');
  const [bpDia, setBpDia] = useState('');
  const [bpPulse, setBpPulse] = useState('');
  const [bpError, setBpError] = useState('');
  const [bpLogs, setBpLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('kingston_bp_logs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 1, sys: 118, dia: 78, pulse: 68, time: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 2, sys: 124, dia: 82, pulse: 74, time: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, sys: 120, dia: 80, pulse: 71, time: new Date().toISOString() },
    ];
  });

  // Glucose Converter State
  const [glucMmol, setGlucMmol] = useState('5.5');
  const [glucMg, setGlucMg] = useState('99');

  // Save BP Logs
  useEffect(() => {
    try {
      localStorage.setItem('kingston_bp_logs', JSON.stringify(bpLogs));
    } catch (e) {}
  }, [bpLogs]);

  // BMI Calculation
  const calculateBMI = () => {
    let hM = 0;
    let wK = 0;
    if (bmiUnit === 'metric') {
      hM = parseFloat(heightCm) / 100;
      wK = parseFloat(weightKg);
    } else {
      hM = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 0.0254;
      wK = (parseFloat(weightLb) || 0) * 0.453592;
    }

    if (!hM || !wK || hM <= 0.5 || hM > 2.8 || wK <= 10 || wK > 400) return null;
    const bmiVal = wK / (hM * hM);
    let category = '';
    let color = '';
    let percent = Math.max(0, Math.min(100, ((bmiVal - 15) / 25) * 100));

    if (bmiVal < 18.5) {
      category = 'Underweight';
      color = 'text-sky-400';
    } else if (bmiVal < 25) {
      category = 'Normal / Healthy Weight';
      color = 'text-emerald-400';
    } else if (bmiVal < 30) {
      category = 'Overweight';
      color = 'text-amber-400';
    } else {
      category = 'Obesity Range';
      color = 'text-rose-400';
    }

    return { val: bmiVal.toFixed(1), category, color, percent };
  };

  const bmiResult = calculateBMI();

  // Handle BP Log Add
  const handleAddBpLog = (e) => {
    e.preventDefault();
    const s = parseInt(bpSys, 10);
    const d = parseInt(bpDia, 10);
    const p = parseInt(bpPulse, 10);

    if (isNaN(s) || isNaN(d) || s < 60 || s > 260 || d < 30 || d > 160) {
      setBpError('Please enter valid systolic (60-260) and diastolic (30-160) numbers.');
      return;
    }
    if (s <= d) {
      setBpError('Systolic pressure must be higher than diastolic pressure.');
      return;
    }

    setBpError('');
    const newEntry = {
      id: Date.now(),
      sys: s,
      dia: d,
      pulse: !isNaN(p) && p > 30 ? p : 72,
      time: new Date().toISOString()
    };
    setBpLogs([newEntry, ...bpLogs]);
    setBpSys('');
    setBpDia('');
    setBpPulse('');
  };

  const handleDeleteBp = (id) => {
    setBpLogs(bpLogs.filter(item => item.id !== id));
  };

  // Glucose Math
  const handleMmolChange = (val) => {
    setGlucMmol(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setGlucMg((num * 18.016).toFixed(0));
    } else {
      setGlucMg('');
    }
  };

  const handleMgChange = (val) => {
    setGlucMg(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setGlucMmol((num / 18.016).toFixed(1));
    } else {
      setGlucMmol('');
    }
  };

  return (
    <section id="health-tools" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
            Interactive Clinical Health Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-1">
            Tools & Clinical Guides you can use today.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Free, private calculators, trend loggers, and educational reading guides. Your medical numbers stay securely inside your browser and never leave your device.
          </p>
        </div>

        {/* Tools Container */}
        <div className="bg-[#0e0b20] border border-violet-900/50 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-violet-900/40">
            
            {/* Tool Selection Sidebar */}
            <div className="lg:col-span-4 p-4 sm:p-6 bg-[#090716] space-y-2">
              <div className="text-[11px] font-mono uppercase text-slate-500 px-3 py-1 flex items-center justify-between">
                <span>Select Health Tool</span>
                {showGuide && <span className="text-[9px] text-violet-400 font-bold">GUIDES INCLUDED</span>}
              </div>

              <button
                onClick={() => setActiveTool('bmi')}
                className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all ${
                  activeTool === 'bmi'
                    ? 'bg-[#181335] border border-violet-600/40 shadow-lg text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTool === 'bmi' ? 'bg-violet-600/30 text-violet-300' : 'bg-white/5 text-slate-400'}`}>
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">BMI Calculator</div>
                  <div className="text-xs text-slate-400 mt-0.5">Evaluate healthy body mass index range</div>
                </div>
              </button>

              <button
                onClick={() => setActiveTool('bp')}
                className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all ${
                  activeTool === 'bp'
                    ? 'bg-[#181335] border border-violet-600/40 shadow-lg text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTool === 'bp' ? 'bg-rose-600/30 text-rose-300' : 'bg-white/5 text-slate-400'}`}>
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Blood Pressure Tracker</div>
                  <div className="text-xs text-slate-400 mt-0.5">Log readings & visualize pressure trends</div>
                </div>
              </button>

              <button
                onClick={() => setActiveTool('glucose')}
                className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all ${
                  activeTool === 'glucose'
                    ? 'bg-[#181335] border border-violet-600/40 shadow-lg text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTool === 'glucose' ? 'bg-teal-600/30 text-teal-300' : 'bg-white/5 text-slate-400'}`}>
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Glucose Converter</div>
                  <div className="text-xs text-slate-400 mt-0.5">Convert mmol/L & mg/dL with target guide</div>
                </div>
              </button>

              {/* Health Reading & Terminology Guide Tab (Exclusively in Health Tools Section) */}
              {showGuide && (
                <div className="pt-2 border-t border-violet-900/40">
                  <button
                    onClick={() => {
                      setActiveTool('guide');
                      setGuideCategory('bp');
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl flex items-start gap-3 transition-all ${
                      activeTool === 'guide'
                        ? 'bg-gradient-to-r from-violet-900/50 to-indigo-900/50 border border-violet-500/50 shadow-lg text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-violet-900/30'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${activeTool === 'guide' ? 'bg-violet-600 text-white' : 'bg-violet-900/40 text-violet-300'}`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-1.5">
                        <span>Reading & Terminology Guide</span>
                        <span className="text-[9px] font-mono bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded border border-violet-500/30">NEW</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        How to read BP & Glucose + clinical glossary
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Tool Interactive Panel */}
            <div className="lg:col-span-8 p-6 sm:p-8">
              
              {/* 1. BMI CALCULATOR */}
              {activeTool === 'bmi' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Body Mass Index (BMI)</h3>
                    
                    <div className="flex items-center p-1 rounded-xl bg-[#090715] border border-white/10 text-xs">
                      <button
                        onClick={() => setBmiUnit('metric')}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          bmiUnit === 'metric' ? 'bg-violet-600 text-white font-medium' : 'text-slate-400'
                        }`}
                      >
                        Metric (cm/kg)
                      </button>
                      <button
                        onClick={() => setBmiUnit('imperial')}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          bmiUnit === 'imperial' ? 'bg-violet-600 text-white font-medium' : 'text-slate-400'
                        }`}
                      >
                        Imperial (ft/lb)
                      </button>
                    </div>
                  </div>

                  {bmiUnit === 'metric' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                          Height (cm)
                        </label>
                        <input 
                          type="number" 
                          value={heightCm}
                          onChange={(e) => setHeightCm(e.target.value)}
                          className="w-full h-12 rounded-xl bg-[#080614] border border-violet-900/50 px-4 text-white text-base focus:border-violet-500 focus:outline-none"
                          placeholder="172"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                          Weight (kg)
                        </label>
                        <input 
                          type="number" 
                          value={weightKg}
                          onChange={(e) => setWeightKg(e.target.value)}
                          className="w-full h-12 rounded-xl bg-[#080614] border border-violet-900/50 px-4 text-white text-base focus:border-violet-500 focus:outline-none"
                          placeholder="68"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                          Feet (ft)
                        </label>
                        <input 
                          type="number" 
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                          className="w-full h-12 rounded-xl bg-[#080614] border border-violet-900/50 px-4 text-white text-base focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                          Inches (in)
                        </label>
                        <input 
                          type="number" 
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          className="w-full h-12 rounded-xl bg-[#080614] border border-violet-900/50 px-4 text-white text-base focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                          Weight (lbs)
                        </label>
                        <input 
                          type="number" 
                          value={weightLb}
                          onChange={(e) => setWeightLb(e.target.value)}
                          className="w-full h-12 rounded-xl bg-[#080614] border border-violet-900/50 px-4 text-white text-base focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-6 rounded-2xl bg-[#090715] border border-violet-900/40">
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-mono font-bold text-white">
                        {bmiResult ? bmiResult.val : '—'}
                      </span>
                      <span className="text-sm font-mono text-slate-400 uppercase">BMI Score</span>
                    </div>

                    <div className={`mt-2 font-medium text-sm ${bmiResult ? bmiResult.color : 'text-slate-400'}`}>
                      {bmiResult ? bmiResult.category : 'Please enter your dimensions above'}
                    </div>

                    <div className="mt-5">
                      <div className="relative h-2 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 via-amber-400 to-rose-500 overflow-visible">
                        {bmiResult && (
                          <div 
                            className="absolute -top-1.5 w-5 h-5 rounded-full bg-white border-2 border-slate-900 shadow-md transform -translate-x-1/2 transition-all duration-300"
                            style={{ left: `${bmiResult.percent}%` }}
                          />
                        )}
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                        <span>&lt; 18.5 (Under)</span>
                        <span>18.5 - 24.9 (Normal)</span>
                        <span>25 - 29.9 (Over)</span>
                        <span>30+ (Obese)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Note: BMI is a screening indicator rather than a direct clinical diagnosis of body fatness or health. Factors like muscle mass and bone structure may influence readings.
                  </p>
                </div>
              )}

              {/* 2. BLOOD PRESSURE TRACKER */}
              {activeTool === 'bp' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Blood Pressure Logger & Trends</h3>
                      <span className="text-xs font-mono text-slate-400">Stored privately on your device</span>
                    </div>

                    {showGuide && (
                      <button
                        onClick={() => {
                          setActiveTool('guide');
                          setGuideCategory('bp');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-violet-950/60 hover:bg-violet-900/60 text-violet-300 border border-violet-800/40 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>How to Read BP Guide</span>
                      </button>
                    )}
                  </div>

                  {/* Inline Explainer Banner */}
                  {showGuide && (
                    <div className="p-3.5 rounded-2xl bg-[#120e29] border border-violet-800/40 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span className="text-slate-300">
                          Need help understanding <strong>SYS (Systolic)</strong>, <strong>DIA (Diastolic)</strong>, or <strong>mmHg</strong>?
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTool('guide');
                          setGuideCategory('bp');
                        }}
                        className="text-violet-300 hover:text-white font-semibold text-[11px] whitespace-nowrap flex items-center gap-1"
                      >
                        <span>View Terminology</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleAddBpLog} className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                          SYS (mmHg)
                        </label>
                        <input 
                          type="number" 
                          value={bpSys}
                          onChange={(e) => setBpSys(e.target.value)}
                          placeholder="120"
                          className="w-full h-11 rounded-xl bg-[#080614] border border-violet-900/50 px-3 text-white text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                          DIA (mmHg)
                        </label>
                        <input 
                          type="number" 
                          value={bpDia}
                          onChange={(e) => setBpDia(e.target.value)}
                          placeholder="80"
                          className="w-full h-11 rounded-xl bg-[#080614] border border-violet-900/50 px-3 text-white text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                          Pulse (bpm)
                        </label>
                        <input 
                          type="number" 
                          value={bpPulse}
                          onChange={(e) => setBpPulse(e.target.value)}
                          placeholder="72"
                          className="w-full h-11 rounded-xl bg-[#080614] border border-violet-900/50 px-3 text-white text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {bpError && (
                      <div className="text-xs text-rose-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{bpError}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Save Reading to Log</span>
                      </button>
                      {bpLogs.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setBpLogs([])}
                          className="px-3 py-2 text-xs text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          Clear All Logs
                        </button>
                      )}
                    </div>
                  </form>

                  {bpLogs.length > 0 ? (
                    <div className="p-4 rounded-2xl bg-[#090715] border border-violet-900/40 space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>RECENT PRESSURE TREND</span>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-violet-400" /> Systolic
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Diastolic
                          </span>
                        </div>
                      </div>

                      <div className="h-28 w-full">
                        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                          <polyline
                            fill="none"
                            stroke="#a78bfa"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={bpLogs.slice(0, 10).map((log, idx, arr) => {
                              const x = (idx / Math.max(1, arr.length - 1)) * 380 + 10;
                              const y = 90 - ((log.sys - 60) / 140) * 80;
                              return `${x},${y}`;
                            }).join(' ')}
                          />
                          <polyline
                            fill="none"
                            stroke="#34d399"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={bpLogs.slice(0, 10).map((log, idx, arr) => {
                              const x = (idx / Math.max(1, arr.length - 1)) * 380 + 10;
                              const y = 90 - ((log.dia - 40) / 120) * 80;
                              return `${x},${y}`;
                            }).join(' ')}
                          />
                        </svg>
                      </div>

                      <div className="max-h-40 overflow-y-auto divide-y divide-white/5">
                        {bpLogs.map((entry) => (
                          <div key={entry.id} className="py-2.5 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-mono font-bold text-white text-sm">
                                {entry.sys} / {entry.dia}
                              </span>
                              <span className="text-slate-400 font-mono ml-2">
                                {entry.pulse} bpm
                              </span>
                              <span className="text-slate-500 text-[11px] block mt-0.5">
                                {new Date(entry.time).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <button 
                              onClick={() => handleDeleteBp(entry.id)}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-white/10 rounded-2xl">
                      No blood pressure readings saved yet. Use the fields above to add your first reading.
                    </div>
                  )}

                </div>
              )}

              {/* 3. GLUCOSE CONVERTER */}
              {activeTool === 'glucose' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Blood Glucose Unit Converter</h3>
                      <span className="text-xs font-mono text-teal-400">1 mmol/L ≈ 18.016 mg/dL</span>
                    </div>

                    {showGuide && (
                      <button
                        onClick={() => {
                          setActiveTool('guide');
                          setGuideCategory('glucose');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-teal-950/60 hover:bg-teal-900/60 text-teal-300 border border-teal-800/40 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>How to Read Glucose Guide</span>
                      </button>
                    )}
                  </div>

                  {/* Inline Explainer Banner */}
                  {showGuide && (
                    <div className="p-3.5 rounded-2xl bg-[#091520] border border-teal-800/40 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-teal-400 flex-shrink-0" />
                        <span className="text-slate-300">
                          Wondering what <strong>mmol/L vs. mg/dL</strong>, <strong>Fasting</strong>, or <strong>Postprandial</strong> mean?
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTool('guide');
                          setGuideCategory('glucose');
                        }}
                        className="text-teal-300 hover:text-white font-semibold text-[11px] whitespace-nowrap flex items-center gap-1"
                      >
                        <span>View Terminology</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#090715] border border-teal-500/20 space-y-2">
                      <label className="text-xs font-mono uppercase text-teal-300 block">
                        Canadian Standard (mmol/L)
                      </label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={glucMmol}
                        onChange={(e) => handleMmolChange(e.target.value)}
                        className="w-full h-14 rounded-xl bg-[#06040e] border border-teal-500/30 px-4 text-2xl font-mono font-bold text-white focus:outline-none focus:border-teal-400"
                      />
                      <span className="text-[11px] text-slate-400 block">Used across Canada & UK</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#090715] border border-teal-500/20 space-y-2">
                      <label className="text-xs font-mono uppercase text-teal-300 block">
                        US & International (mg/dL)
                      </label>
                      <input 
                        type="number" 
                        value={glucMg}
                        onChange={(e) => handleMgChange(e.target.value)}
                        className="w-full h-14 rounded-xl bg-[#06040e] border border-teal-500/30 px-4 text-2xl font-mono font-bold text-white focus:outline-none focus:border-teal-400"
                      />
                      <span className="text-[11px] text-slate-400 block">Used in USA & global clinics</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-900/30 space-y-2 text-xs">
                    <div className="font-semibold text-teal-300 flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      <span>General Target Guidelines for Adults with Diabetes</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-slate-300 pt-1">
                      <div className="p-2.5 rounded-xl bg-[#090715]">
                        <div className="font-medium text-white">Fasting / Pre-Meal</div>
                        <div className="font-mono text-teal-400 mt-1">4.0 to 7.0 mmol/L</div>
                        <div className="text-slate-400 text-[10px]">72 to 126 mg/dL</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#090715]">
                        <div className="font-medium text-white">2 Hours Post-Meal</div>
                        <div className="font-mono text-teal-400 mt-1">5.0 to 10.0 mmol/L</div>
                        <div className="text-slate-400 text-[10px]">90 to 180 mg/dL</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      * Always consult your healthcare provider or endocrinologist for your individualized glycemic targets.
                    </div>
                  </div>

                </div>
              )}

              {/* 4. CLINICAL READING & TERMINOLOGY GUIDE (EXCLUSIVELY IN HEALTH TOOLS) */}
              {activeTool === 'guide' && showGuide && (
                <div className="space-y-4">
                  <HealthReadingGuide defaultCategory={guideCategory} />
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
