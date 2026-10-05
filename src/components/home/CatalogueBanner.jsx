import React from 'react';

export default function CatalogueBanner() {
  return (
    <section id="catalogue" className="py-16 border-t border-white/5 bg-[#05040d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono text-violet-400 uppercase tracking-widest">
              Official R-Biomeds Canada Release
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Official Product Catalogue 2026
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Contains complete clinical device listings: FDBP-A2, FDBP-A1, FDBP-A14 Tubeless, GLM-72 Glucose Meter, FDES-106 TENS + Heat, and V-12 Infrared Thermometer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#products"
              className="px-5 py-2.5 rounded-xl bg-white text-[#080711] font-semibold text-xs hover:bg-violet-100 transition-colors shadow-md"
            >
              Browse Full Catalog
            </a>
            <a 
              href="#dealer"
              className="px-5 py-2.5 rounded-xl bg-violet-950/40 border border-violet-800/40 text-violet-200 font-medium text-xs hover:bg-violet-900/40 transition-colors"
            >
              Distributor Inquiries
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
