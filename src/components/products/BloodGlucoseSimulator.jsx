import React, { useState, useEffect, useRef } from 'react';
import { Droplet, Play, RotateCcw, Volume2, VolumeX, History, Sparkles, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function BloodGlucoseSimulator() {
  const [step, setStep] = useState('idle'); // 'idle' | 'strip_inserted' | 'testing' | 'result'
  const [countdown, setCountdown] = useState(5);
  const [unit, setUnit] = useState('mmol'); // 'mmol' | 'mg'
  const [glucoseValMmol, setGlucoseValMmol] = useState(5.4);
  const [mealMarker, setMealMarker] = useState('fasting'); // 'fasting' | 'pre_meal' | 'post_meal'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showMemory, setShowMemory] = useState(false);
  const [preset, setPreset] = useState('normal_fasting');
  const [memoryLogs, setMemoryLogs] = useState([
    { id: 1, mmol: 5.2, mg: 94, marker: 'fasting', time: 'Today, 07:15 AM' },
    { id: 2, mmol: 6.9, mg: 124, marker: 'post_meal', time: 'Yesterday, 01:30 PM' },
    { id: 3, mmol: 5.0, mg: 90, marker: 'pre_meal', time: 'Yesterday, 06:45 PM' },
    { id: 4, mmol: 7.2, mg: 130, marker: 'post_meal', time: '2 days ago, 08:15 PM' },
  ]);

  const audioCtxRef = useRef(null);

  // Play synthetic medical beeps
  const playBeep = (freq = 880, duration = 0.1, type = 'sine') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch (e) {
      // Audio not permitted or supported
    }
  };

  // Step 1: Insert Test Strip
  const handleInsertStrip = () => {
    playBeep(1200, 0.12);
    setStep('strip_inserted');
    setShowMemory(false);
  };

  // Step 2: Apply Sample & Start 5-second countdown
  const handleApplySample = (targetMmol = null) => {
    if (step !== 'strip_inserted') return;
    playBeep(950, 0.15);
    setStep('testing');
    setCountdown(5);

    // Pick test value based on preset or custom
    let val = targetMmol;
    if (val === null) {
      if (preset === 'normal_fasting') val = (4.8 + Math.random() * 0.8).toFixed(1);
      else if (preset === 'normal_post') val = (6.2 + Math.random() * 1.4).toFixed(1);
      else if (preset === 'elevated') val = (8.0 + Math.random() * 1.2).toFixed(1);
      else if (preset === 'high') val = (11.5 + Math.random() * 2.5).toFixed(1);
      else if (preset === 'low') val = (3.4 + Math.random() * 0.4).toFixed(1);
      else val = 5.4;
    }
    const finalVal = parseFloat(val);
    setGlucoseValMmol(finalVal);

    // 5-second countdown timer
    let currentCount = 5;
    const interval = setInterval(() => {
      currentCount -= 1;
      setCountdown(currentCount);
      playBeep(800, 0.08);

      if (currentCount <= 0) {
        clearInterval(interval);
        setStep('result');
        // Success double beep
        setTimeout(() => playBeep(1050, 0.12), 50);
        setTimeout(() => playBeep(1400, 0.2), 180);

        // Add to memory
        const mgVal = Math.round(finalVal * 18.016);
        const newLog = {
          id: Date.now(),
          mmol: finalVal,
          mg: mgVal,
          marker: mealMarker,
          time: 'Just now'
        };
        setMemoryLogs(prev => [newLog, ...prev.slice(0, 9)]);
      }
    }, 1000);
  };

  // Step 3: Eject Strip / Reset
  const handleEjectStrip = () => {
    playBeep(650, 0.1);
    setStep('idle');
    setCountdown(5);
    setShowMemory(false);
  };

  const currentDisplayValue = unit === 'mmol'
    ? glucoseValMmol.toFixed(1)
    : Math.round(glucoseValMmol * 18.016);

  // Status diagnosis
  const getDiagnosis = () => {
    if (glucoseValMmol < 4.0) {
      return {
        label: 'Low (Hypoglycemia Warning)',
        color: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
        desc: 'Below normal range (< 4.0 mmol/L / < 72 mg/dL). Treat with 15g fast carbs.'
      };
    }
    if (mealMarker === 'fasting') {
      if (glucoseValMmol <= 5.5) {
        return {
          label: 'Optimal Fasting Level',
          color: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          desc: 'Target range for non-diabetic fasting (3.9 – 5.5 mmol/L).'
        };
      } else if (glucoseValMmol <= 6.9) {
        return {
          label: 'Elevated Fasting (Pre-diabetes)',
          color: 'text-amber-400',
          badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
          desc: 'Higher than normal fasting threshold (5.6 – 6.9 mmol/L).'
        };
      } else {
        return {
          label: 'High (Hyperglycemia)',
          color: 'text-rose-400',
          badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
          desc: 'Exceeds clinical fasting target (≥ 7.0 mmol/L / ≥ 126 mg/dL).'
        };
      }
    } else {
      if (glucoseValMmol <= 7.8) {
        return {
          label: 'Normal Post-Meal Level',
          color: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          desc: 'Well-controlled post-prandial glucose (< 7.8 mmol/L).'
        };
      } else if (glucoseValMmol <= 10.0) {
        return {
          label: 'Target Range (Diabetic Post-Meal)',
          color: 'text-sky-400',
          badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
          desc: 'Within Diabetes Canada target guidelines (5.0 – 10.0 mmol/L).'
        };
      } else {
        return {
          label: 'High Post-Meal Spike',
          color: 'text-rose-400',
          badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
          desc: 'Exceeds 10.0 mmol/L (> 180 mg/dL). High glycemic response.'
        };
      }
    }
  };

  const diagnosis = getDiagnosis();

  return (
    <div className="w-full max-w-[360px] mx-auto select-none font-sans">
      
      {/* Top Device Toolbar */}
      <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-teal-300 font-semibold text-[11px]">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          GLM-72 Rapid 5s
        </span>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] transition-colors"
          title="Toggle Voice / Audio Beeps"
        >
          {soundEnabled ? <Volume2 className="w-3 h-3 text-teal-400" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
          <span>{soundEnabled ? 'Audio On' : 'Mute'}</span>
        </button>
      </div>

      {/* Handheld Device Body */}
      <div className="relative bg-gradient-to-b from-[#1b1736] via-[#120f26] to-[#090716] border-2 border-violet-800/50 rounded-[40px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.15)] flex flex-col items-center">
        
        {/* Test Strip Ingestion Port at Top */}
        <div className="relative -mt-7 mb-3 flex flex-col items-center z-10">
          <div className="w-14 h-4 bg-[#0a0717] rounded-full border border-violet-700/60 shadow-inner flex items-center justify-center">
            <div className="w-8 h-1.5 bg-black rounded-full" />
          </div>

          {/* Test Strip Graphic if inserted */}
          {step !== 'idle' ? (
            <div className="relative -mt-1 w-7 h-12 bg-gradient-to-b from-white via-slate-200 to-amber-200 border border-slate-400 rounded-sm shadow-md flex flex-col items-center justify-between py-1 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Sample Target Area */}
              <div className={`w-3.5 h-3.5 rounded-full border border-rose-400/80 flex items-center justify-center ${step === 'testing' || step === 'result' ? 'bg-rose-600' : 'bg-rose-100 animate-pulse'}`}>
                <Droplet className={`w-2.5 h-2.5 ${step === 'testing' || step === 'result' ? 'text-white' : 'text-rose-500'}`} />
              </div>
              <div className="text-[7px] font-mono text-slate-600 font-bold tracking-tighter">KINGSTON</div>
              <div className="w-5 h-1 bg-amber-600 rounded-xs" />
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>

        {/* Kingston Brand Stamp */}
        <div className="text-center mb-2">
          <div className="text-[12px] font-extrabold tracking-widest text-white flex items-center justify-center gap-1">
            <span>KINGSTON</span>
            <span className="text-[9px] font-mono text-teal-400 bg-teal-950/60 px-1.5 py-0.2 rounded border border-teal-800/40">GLM-72</span>
          </div>
          <div className="text-[8px] font-mono tracking-wider text-slate-400">PRECISION GLUCOSE MONITOR</div>
        </div>

        {/* High-Contrast LCD Screen */}
        <div className="w-full bg-[#9da897] rounded-2xl p-4 border-4 border-[#333045] shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)] text-[#141b14] relative overflow-hidden font-mono min-h-[160px] flex flex-col justify-between">
          
          {/* LCD Top Status Row */}
          <div className="flex items-center justify-between text-[10px] font-bold border-b border-black/15 pb-1">
            <div className="flex items-center gap-2">
              <span className={mealMarker === 'fasting' ? 'bg-black/80 text-[#9da897] px-1 rounded' : 'opacity-40'}>FASTING</span>
              <span className={mealMarker === 'pre_meal' ? 'bg-black/80 text-[#9da897] px-1 rounded' : 'opacity-40'}>PRE</span>
              <span className={mealMarker === 'post_meal' ? 'bg-black/80 text-[#9da897] px-1 rounded' : 'opacity-40'}>POST</span>
            </div>
            <div className="flex items-center gap-1.5">
              {showMemory && <span className="bg-black/80 text-[#9da897] px-1 rounded text-[9px]">MEM</span>}
              <span className="text-[11px]">{unit === 'mmol' ? 'mmol/L' : 'mg/dL'}</span>
            </div>
          </div>

          {/* LCD Main Center Content */}
          <div className="py-2 flex flex-col items-center justify-center min-h-[80px]">
            {step === 'idle' && !showMemory && (
              <div className="text-center space-y-1">
                <div className="text-2xl font-black tracking-widest opacity-30">OFF</div>
                <div className="text-[10px] tracking-wide text-black/60 font-semibold animate-pulse">INSERT TEST STRIP</div>
              </div>
            )}

            {step === 'strip_inserted' && !showMemory && (
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1 animate-bounce text-black">
                  <Droplet className="w-5 h-5 fill-current" />
                  <span className="text-xl font-black">APPLY</span>
                </div>
                <div className="text-[9px] font-bold tracking-tight text-black/70">WAITING FOR 0.8µL BLOOD DROP</div>
              </div>
            )}

            {step === 'testing' && !showMemory && (
              <div className="text-center space-y-0.5">
                <div className="text-5xl font-black tracking-tight">{countdown}</div>
                <div className="text-[9px] font-bold tracking-widest text-black/70 animate-pulse">TESTING IN PROGRESS...</div>
              </div>
            )}

            {step === 'result' && !showMemory && (
              <div className="text-center w-full">
                <div className="text-5xl font-black tracking-tighter leading-none">
                  {currentDisplayValue}
                </div>
                <div className="text-[10px] font-bold tracking-wider mt-1 text-black/80">
                  {unit === 'mmol' ? 'mmol/L' : 'mg/dL'} • {mealMarker.toUpperCase().replace('_', ' ')}
                </div>
              </div>
            )}

            {showMemory && (
              <div className="w-full text-left space-y-1 text-[10px]">
                <div className="font-bold border-b border-black/20 pb-0.5 flex justify-between">
                  <span>LAST READING</span>
                  <span>{memoryLogs[0]?.time}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-3xl font-black">
                    {unit === 'mmol' ? memoryLogs[0]?.mmol.toFixed(1) : memoryLogs[0]?.mg}
                  </span>
                  <span className="font-bold text-xs uppercase">{memoryLogs[0]?.marker}</span>
                </div>
              </div>
            )}
          </div>

          {/* LCD Bottom Row */}
          <div className="flex items-center justify-between text-[9px] font-bold border-t border-black/15 pt-1 text-black/70">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
              <span>CODE OK</span>
            </span>
            <span>KINGSTON BIO-SENSOR</span>
          </div>

        </div>

        {/* Tactile Hardware Buttons on Meter */}
        <div className="w-full grid grid-cols-3 gap-2.5 mt-4">
          {/* Meal Marker Switcher */}
          <button
            onClick={() => {
              playBeep(900, 0.08);
              setMealMarker(m => m === 'fasting' ? 'pre_meal' : m === 'pre_meal' ? 'post_meal' : 'fasting');
            }}
            className="py-2.5 px-1 rounded-xl bg-[#231e3d] hover:bg-[#2c264d] border border-white/10 text-white font-mono text-[10px] font-bold shadow-md active:translate-y-0.5 transition-all flex flex-col items-center justify-center gap-0.5"
            title="Toggle Fasting / Pre-Meal / Post-Meal"
          >
            <span>MEAL</span>
            <span className="text-[8px] text-teal-400 capitalize">{mealMarker.replace('_', ' ')}</span>
          </button>

          {/* Unit Toggle Button */}
          <button
            onClick={() => {
              playBeep(1100, 0.08);
              setUnit(u => u === 'mmol' ? 'mg' : 'mmol');
            }}
            className="py-2.5 px-1 rounded-xl bg-[#231e3d] hover:bg-[#2c264d] border border-white/10 text-white font-mono text-[10px] font-bold shadow-md active:translate-y-0.5 transition-all flex flex-col items-center justify-center gap-0.5"
            title="Switch Canadian mmol/L or US mg/dL"
          >
            <span>UNIT</span>
            <span className="text-[8px] text-violet-300 uppercase">{unit === 'mmol' ? 'mmol/L' : 'mg/dL'}</span>
          </button>

          {/* Memory Recall Button */}
          <button
            onClick={() => {
              playBeep(1000, 0.08);
              setShowMemory(!showMemory);
            }}
            className={`py-2.5 px-1 rounded-xl border text-white font-mono text-[10px] font-bold shadow-md active:translate-y-0.5 transition-all flex flex-col items-center justify-center gap-0.5 ${
              showMemory ? 'bg-teal-700 border-teal-400' : 'bg-[#231e3d] hover:bg-[#2c264d] border-white/10'
            }`}
            title="View 500 Test Memory"
          >
            <History className="w-3 h-3 text-teal-300" />
            <span>MEM</span>
          </button>
        </div>

        {/* Primary Interactive Simulation Actions */}
        <div className="w-full mt-4 space-y-2 border-t border-white/10 pt-3">
          {step === 'idle' && (
            <button
              onClick={handleInsertStrip}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>1. Insert Test Strip</span>
            </button>
          )}

          {step === 'strip_inserted' && (
            <div className="space-y-2">
              <button
                onClick={() => handleApplySample()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-semibold text-xs transition-all shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 active:scale-95 animate-pulse"
              >
                <Droplet className="w-4 h-4 fill-current" />
                <span>2. Apply Blood Sample (0.8 µL)</span>
              </button>
              <button
                onClick={handleEjectStrip}
                className="w-full py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-[11px] transition-colors"
              >
                Eject Strip
              </button>
            </div>
          )}

          {step === 'testing' && (
            <div className="w-full py-2.5 px-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-teal-300 font-mono flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>Analyzing reaction kinetics in 5s...</span>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-2">
              <div className={`p-3 rounded-2xl border text-xs ${diagnosis.badgeBg}`}>
                <div className="flex items-center gap-1.5 font-bold">
                  {glucoseValMmol < 4.0 || glucoseValMmol > 10.0 ? (
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                  <span>{diagnosis.label}</span>
                </div>
                <div className="text-[11px] mt-1 opacity-90 leading-tight">
                  {diagnosis.desc}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleApplySample()}
                  className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retest</span>
                </button>
                <button
                  onClick={handleEjectStrip}
                  className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
                >
                  Eject Strip
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Clinical Scenario Preset Switcher */}
        <div className="w-full mt-3 pt-3 border-t border-white/5">
          <div className="text-[10px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
            <span>TRY CLINICAL SCENARIOS</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px]">
            <button
              onClick={() => { setPreset('normal_fasting'); if (step === 'strip_inserted') handleApplySample(5.2); }}
              className={`p-1.5 rounded-lg text-center transition-colors border ${preset === 'normal_fasting' ? 'bg-teal-950/80 border-teal-500/50 text-teal-300' : 'bg-white/5 border-transparent text-slate-400 hover:text-white'}`}
            >
              Fasting Normal
            </button>
            <button
              onClick={() => { setPreset('normal_post'); if (step === 'strip_inserted') handleApplySample(6.8); }}
              className={`p-1.5 rounded-lg text-center transition-colors border ${preset === 'normal_post' ? 'bg-teal-950/80 border-teal-500/50 text-teal-300' : 'bg-white/5 border-transparent text-slate-400 hover:text-white'}`}
            >
              Post-Meal Target
            </button>
            <button
              onClick={() => { setPreset('low'); if (step === 'strip_inserted') handleApplySample(3.6); }}
              className={`p-1.5 rounded-lg text-center transition-colors border ${preset === 'low' ? 'bg-amber-950/80 border-amber-500/50 text-amber-300' : 'bg-white/5 border-transparent text-slate-400 hover:text-white'}`}
            >
              Hypo Alert
            </button>
          </div>
        </div>

      </div>

      {/* Simulator Footnote */}
      <div className="mt-3 text-center text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
        <span>Kingston Biosensor</span>
        <span>•</span>
        <span>Auto-Calibration (No Coding)</span>
        <span>•</span>
        <span>500 Memory Groups</span>
      </div>

    </div>
  );
}
