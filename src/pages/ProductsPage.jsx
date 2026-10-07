import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Check,
  Info,
  ShoppingBag,
  Store,
  ExternalLink,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Droplet,
  Zap,
  Thermometer,
  X
} from 'lucide-react';
import { productsData } from '../data/productsData';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [modalImageView, setModalImageView] = useState('pack');

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = [
    { id: 'all', label: 'All Devices', icon: Sparkles },
    { id: 'bp', label: 'Blood Pressure', icon: HeartPulse },
    { id: 'glucose', label: 'Glucose Diagnostics', icon: Droplet },
    { id: 'tens', label: 'TENS + Heat', icon: Zap },
    { id: 'thermo', label: 'Thermometers', icon: Thermometer }
  ];

  const filteredProducts = productsData.filter(prod => {
    const matchCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.keySpecs.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#080711] text-[#edeaf8] selection:bg-violet-500/30">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-violet-950/50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-600/15 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CLINICAL DIAGNOSTIC PORTFOLIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
            Precision Diagnostic Instruments
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Engineered under Canadian clinical oversight for dependable home health tracking, long-term stability, and intuitive patient comfort.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, technology (e.g. FDBP-A2, MWI, glucose, tens)..."
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#100d28] border border-violet-900/40 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                      activeCategory === cat.id
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                        : 'bg-[#100d28] text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-mono text-slate-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> devices
            </span>

            <Link
              to="/where-to-buy"
              className="text-xs font-medium text-violet-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View buying options (FB & Retail)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#0e0b24] border border-violet-900/40 rounded-3xl p-6 flex flex-col justify-between hover:border-violet-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-950/40 group relative"
              >
                <div>
                  {/* Badge & Model */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold text-violet-400">
                      {prod.code}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${prod.badgeColor}`}>
                      {prod.badge}
                    </span>
                  </div>

                  {/* Image container */}
                  <div className="relative aspect-square w-full bg-[#080614] rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden mb-5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Tag */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
                      {prod.tag}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-violet-200 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {prod.subtitle}
                    </p>
                  </div>

                  {/* Key Specs */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5">
                    {prod.keySpecs.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing info */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">FB & Web Deal</div>
                      <div className="text-xl font-bold text-white">
                        ${prod.fbPrice ? prod.fbPrice.toFixed(2) : '49.99'} <span className="text-xs font-normal text-slate-400">CAD</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">MSRP</div>
                      <div className="text-xs text-slate-400 line-through">
                        ${prod.msrp ? prod.msrp.toFixed(2) : '69.99'} CAD
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductModal(prod);
                      setModalImageView(prod.hoverImage ? 'hover' : 'pack');
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-violet-950/50 hover:bg-violet-900/50 text-violet-200 border border-violet-800/40 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Specs</span>
                  </button>

                  <Link
                    to={`/where-to-buy?product=${prod.id}`}
                    className="py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-violet-600/30"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Where to Buy</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center bg-[#0d0a20] rounded-3xl border border-white/5 space-y-3">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="text-white font-medium">No diagnostic devices found matching your criteria.</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try clearing your search term or selecting another category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Specifications Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#100d23] border border-violet-700/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-36 h-36 sm:w-44 sm:h-44 aspect-square bg-[#080614] rounded-2xl border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <img
                  src={modalImageView === 'hover' && selectedProductModal.hoverImage ? selectedProductModal.hoverImage : selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="max-h-full max-w-full object-contain p-2"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-grow">
                <span className="text-xs font-mono font-bold text-violet-400">{selectedProductModal.code}</span>
                <h3 className="text-xl font-bold text-white">{selectedProductModal.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedProductModal.description}</p>
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">${selectedProductModal.fbPrice?.toFixed(2)} CAD</span>
                  <span className="text-xs text-slate-400 line-through">${selectedProductModal.msrp?.toFixed(2)} CAD</span>
                  <span className="text-[11px] font-mono text-emerald-400 ml-2">{selectedProductModal.savings}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-violet-300 mb-3">Clinical Specifications</h4>
              <div className="bg-[#080614] rounded-2xl border border-white/5 divide-y divide-white/5 text-xs">
                {selectedProductModal.specs && Object.entries(selectedProductModal.specs).map(([k, v]) => (
                  <div key={k} className="p-3 flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-slate-400">{k}</span>
                    <span className="text-white font-medium sm:text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/where-to-buy?product=${selectedProductModal.id}`}
                onClick={() => setSelectedProductModal(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Now (Facebook Marketplace or Website)</span>
              </Link>

              <button
                onClick={() => setSelectedProductModal(null)}
                className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Matrix Teaser */}
      <section className="py-16 bg-[#06050e] border-t border-violet-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
              Direct Channels & Retail Availability
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
              Ready to purchase or test in-store?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Find special discounts via Facebook Marketplace ads, order with fast Canadian shipping, or visit licensed retail pharmacies.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              to="/where-to-buy"
              className="px-6 py-3.5 rounded-full bg-white text-[#090715] font-semibold text-xs hover:bg-violet-100 transition-all shadow-lg flex items-center gap-2"
            >
              <span>Visit Where to Buy Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/about"
              className="px-6 py-3.5 rounded-full bg-violet-950/50 hover:bg-violet-900/50 text-violet-200 border border-violet-800/40 text-xs font-medium transition-all"
            >
              <span>About Kingston Instruments</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
