import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  HeartPulse,
  Droplet,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Check,
  Info,
  ChevronRight,
  Layers,
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';
import BloodPressureMonitor from '../home/BloodPressureMonitor';
import BloodGlucoseSimulator from './BloodGlucoseSimulator';
import { productsData } from '../../data/productsData';

export default function ProductSimulatorsSection({ initialDevice = 'bp' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const simParam = searchParams.get('simulator');

  const [activeDevice, setActiveDevice] = useState(
    simParam === 'glucose' ? 'glucose' : (initialDevice || 'bp')
  );

  useEffect(() => {
    if (simParam === 'glucose' || simParam === 'bp') {
      setActiveDevice(simParam);
    }
  }, [simParam]);

  const bpProduct = productsData.find(p => p.id === 'fdbp-a2') || productsData[0];
  const glucoseProduct = productsData.find(p => p.id === 'glm-72') || productsData[3];

  const currentProduct = activeDevice === 'bp' ? bpProduct : glucoseProduct;

  const handleDeviceChange = (dev) => {
    setActiveDevice(dev);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('simulator', dev);
    setSearchParams(newParams, { replace: true });
  };

  return (
    <section id="simulators" className="py-12 lg:py-16 bg-[#090717] border-y border-violet-950/50 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>LIVE INTERACTIVE CLINICAL LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Experience the Devices Before You Buy
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Interact with functional digital twins of our diagnostic monitors. Test cuff inflation, pulse wave monitoring, and 5-second blood glucose readings right next to full technical specifications.
            </p>
          </div>

          {/* Device Switcher Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[#120e29] border border-violet-900/50 shadow-xl self-start md:self-auto">
            <button
              onClick={() => handleDeviceChange('bp')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeDevice === 'bp'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Upper Arm BP (FDBP-A2)</span>
            </button>

            <button
              onClick={() => handleDeviceChange('glucose')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeDevice === 'glucose'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Droplet className="w-4 h-4 text-teal-300" />
              <span>Glucose Meter (GLM-72)</span>
            </button>
          </div>
        </div>

        {/* Main Side-by-Side Grid: Simulator + Product Information */}
        <div className="bg-[#0e0b22] border border-violet-900/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Interactive Working Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#070514] rounded-2xl border border-violet-950/80 shadow-inner relative">
              
              {/* Simulator Header & Status Indicator */}
              <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-white/5 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Virtual Device</span>
                </span>
                <span className="text-violet-300 bg-violet-950/60 border border-violet-800/40 px-2 py-0.5 rounded-full text-[10px]">
                  {activeDevice === 'bp' ? 'Click START Button' : 'Click Insert Test Strip'}
                </span>
              </div>

              {/* Render Active Simulator */}
              {activeDevice === 'bp' ? (
                <div className="w-full flex justify-center py-2">
                  <BloodPressureMonitor />
                </div>
              ) : (
                <div className="w-full flex justify-center py-2">
                  <BloodGlucoseSimulator />
                </div>
              )}

              {/* Quick Simulator Instructions */}
              <div className="w-full mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-violet-400" />
                  <span>How to test this simulator:</span>
                </div>
                {activeDevice === 'bp' ? (
                  <p className="leading-relaxed">
                    Press <strong className="text-violet-300">START</strong> to begin simulated cuff inflation. Watch the real-time oscillometric pulse wave canvas and systolic/diastolic calculation. Press <strong className="text-violet-300">MEM</strong> to recall stored user records.
                  </p>
                ) : (
                  <p className="leading-relaxed">
                    Click <strong className="text-teal-300">1. Insert Test Strip</strong>, then click <strong className="text-rose-300">2. Apply Blood Sample</strong>. The biosensor counts down from 5s and returns clinical results in Canadian mmol/L or US mg/dL.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Complete Product Information & Clinical Specs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Title, Model Code & Badges */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-violet-400 bg-violet-950/80 border border-violet-800/60 px-3 py-1 rounded-lg">
                    {currentProduct.code}
                  </span>
                  <span className={`text-xs font-mono px-3 py-1 rounded-lg border ${currentProduct.badgeColor}`}>
                    {currentProduct.badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1 rounded-lg">
                    {currentProduct.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {currentProduct.name}
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>

              {/* Pricing & FB Direct Deal Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 to-indigo-950/30 border border-violet-800/40 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Direct Special Price (Facebook Marketplace & Web)
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-white">
                      ${currentProduct.fbPrice ? currentProduct.fbPrice.toFixed(2) : '49.99'}
                    </span>
                    <span className="text-xs text-slate-400">CAD</span>
                    <span className="text-xs text-slate-400 line-through ml-2">
                      ${currentProduct.msrp ? currentProduct.msrp.toFixed(2) : '69.99'} CAD
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold ml-2">
                      {currentProduct.savings || 'Save $20.00'}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/where-to-buy?product=${currentProduct.id}`}
                  className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Where to Buy (FB & Retail)</span>
                </Link>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-violet-300">
                  Key Diagnostic Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentProduct.keySpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#090716] border border-white/5 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Clinical Specifications Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-violet-300">
                  Clinical Hardware Specifications
                </h4>
                <div className="bg-[#090716] rounded-2xl border border-white/5 divide-y divide-white/5 text-xs">
                  {currentProduct.specs && Object.entries(currentProduct.specs).map(([key, val]) => (
                    <div key={key} className="p-3 flex flex-col sm:flex-row justify-between gap-1">
                      <span className="text-slate-400 font-medium">{key}</span>
                      <span className="text-white font-mono sm:text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Contents & Purchase CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/where-to-buy?product=${currentProduct.id}`}
                  className="px-6 py-3 rounded-xl bg-white text-[#080614] font-semibold text-xs hover:bg-violet-100 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Purchase {currentProduct.code} Now</span>
                </Link>

                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition-colors flex items-center gap-2"
                >
                  <span>Browse Full Device Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
