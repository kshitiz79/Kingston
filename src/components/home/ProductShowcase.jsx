import React, { useState } from 'react';
import { Check, Info, MapPin } from 'lucide-react';
import { productsData } from '../../data/productsData';

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [modalImageView, setModalImageView] = useState('hover');

  const categories = [
    { id: 'all', label: 'All Devices' },
    { id: 'bp', label: 'Blood Pressure' },
    { id: 'glucose', label: 'Glucose Meter' },
    { id: 'tens', label: 'TENS Therapy' },
    { id: 'thermo', label: 'Thermometer' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-violet-400 mb-2">
              Precision Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Clinical instruments for modern care.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Every Kingston device is engineered around dependable sensor technology, intuitive displays, and consistent performance across diverse healthcare environments.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#100d23] border border-violet-900/40 rounded-2xl overflow-x-auto">
            {categories.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-[#0e0b20] border border-violet-900/40 rounded-3xl p-6 flex flex-col justify-between hover:border-violet-500/50 hover:bg-[#140f2e] transition-all duration-300 group shadow-xl hover:shadow-2xl hover:shadow-violet-950/40"
            >
              <div>
                
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                    {prod.code}
                  </span>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${prod.badgeColor}`}>
                    {prod.badge}
                  </span>
                </div>

                {/* Product Pack Imagery with Exact Fit */}
                <div className="w-full aspect-square flex items-center justify-center bg-[#090715] rounded-2xl border border-white/5 relative overflow-hidden group/img cursor-pointer">
                  {/* Default Image */}
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className={`w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-all duration-500 ease-in-out ${
                      prod.id === 'fdbp-a14' ? 'object-contain p-6' : 'object-cover'
                    } ${
                      prod.hoverImage && prod.hoverImage !== prod.image
                        ? 'group-hover/img:opacity-0 group-hover/img:scale-95'
                        : 'group-hover/img:scale-105'
                    }`}
                    loading="lazy"
                  />

                  {/* After-Hover Image from /Product_Pack/ - exactly fitted */}
                  {prod.hoverImage && prod.hoverImage !== prod.image && (
                    <img 
                      src={prod.hoverImage} 
                      alt={`${prod.name} showcase`} 
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/img:opacity-100 transition-all duration-500 ease-in-out"
                      loading="lazy"
                    />
                  )}

                  {/* Hover Tag */}
                  {prod.hoverImage && prod.hoverImage !== prod.image && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono text-slate-300 group-hover/img:text-violet-200 group-hover/img:border-violet-500/40 transition-all pointer-events-none flex items-center gap-1.5 shadow-lg z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover/img:animate-pulse" />
                      <span className="group-hover/img:hidden">Hover to inspect</span>
                      <span className="hidden group-hover/img:inline font-semibold">Studio Showcase</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-5 space-y-2">
                  <div className="text-xs font-mono uppercase text-violet-400 tracking-wider">
                    {prod.tag}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-violet-200 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {prod.subtitle}
                  </p>
                </div>

                {/* Key Features Bullet List */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5">
                  {prod.keySpecs.slice(0, 3).map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedProductModal(prod);
                    setModalImageView(prod.hoverImage ? 'hover' : 'pack');
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-violet-950/50 hover:bg-violet-900/50 text-violet-200 border border-violet-800/40 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Specifications</span>
                </button>

                <a
                  href="#dealer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  title="Find Dealer for this item"
                >
                  <MapPin className="w-4 h-4 text-violet-300" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Technical Specifications Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#100d23] border border-violet-700/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <button 
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
            >
              ✕
            </button>

            {/* Modal Image & Header with View Toggle */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-36 h-36 sm:w-44 sm:h-44 aspect-square bg-[#080614] rounded-2xl border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <img 
                  src={modalImageView === 'hover' && selectedProductModal.hoverImage ? selectedProductModal.hoverImage : selectedProductModal.image} 
                  alt={selectedProductModal.name} 
                  className={`w-full h-full transition-all duration-300 ${
                    modalImageView === 'hover' ? 'object-cover' : 'object-contain p-3'
                  }`}
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span className="text-xs font-mono uppercase text-violet-400">
                  {selectedProductModal.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedProductModal.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedProductModal.subtitle}
                </p>

                {/* Pack vs Showcase Toggle in Modal */}
                {selectedProductModal.hoverImage && selectedProductModal.hoverImage !== selectedProductModal.image && (
                  <div className="mt-3 inline-flex items-center p-1 rounded-xl bg-[#090715] border border-white/10 text-[11px] font-mono">
                    <button
                      onClick={() => setModalImageView('pack')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        modalImageView === 'pack' ? 'bg-violet-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Packaging Box
                    </button>
                    <button
                      onClick={() => setModalImageView('hover')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        modalImageView === 'hover' ? 'bg-violet-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Studio Display
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-violet-950/20 border border-violet-900/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedProductModal.description}
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Technical Specifications
              </h4>
              <div className="border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden text-xs">
                {Object.entries(selectedProductModal.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-3 bg-white/[0.01] hover:bg-white/[0.03]">
                    <div className="font-semibold text-slate-300">{key}</div>
                    <div className="col-span-2 text-slate-400">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProductModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
              >
                Close
              </button>
              <a
                href="#dealer"
                onClick={() => setSelectedProductModal(null)}
                className="px-5 py-2 rounded-xl bg-white text-[#080711] text-xs font-semibold hover:bg-violet-100 transition-colors"
              >
                Inquire With Dealer
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
