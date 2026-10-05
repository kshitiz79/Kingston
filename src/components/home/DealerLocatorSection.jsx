import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { dealersData } from '../../data/productsData';

export default function DealerLocatorSection() {
  const [dealerQuery, setDealerQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All Canada');

  const filteredDealers = dealersData.filter(d => {
    const matchQuery = d.name.toLowerCase().includes(dealerQuery.toLowerCase()) || 
                       d.city.toLowerCase().includes(dealerQuery.toLowerCase()) ||
                       d.address.toLowerCase().includes(dealerQuery.toLowerCase());
    const matchProv = selectedProvince === 'All Canada' || d.prov === selectedProvince;
    return matchQuery && matchProv;
  });

  return (
    <section id="dealer" className="py-20 bg-gradient-to-b from-[#06050f] via-[#0d0922] to-[#06050e] border-t border-violet-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#100d28] border border-violet-800/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
                Where to Buy & Distribute
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Find a dealer near you.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Kingston Instruments devices are available through licensed pharmacies, medical supply partners, and authorized distributor networks across Canada.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    value={dealerQuery}
                    onChange={(e) => setDealerQuery(e.target.value)}
                    placeholder="Search city, pharmacy or street..."
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
                
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="h-11 px-4 rounded-xl bg-[#080616] border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="All Canada">All Canada</option>
                  <option value="ON">Ontario (ON)</option>
                  <option value="BC">British Columbia (BC)</option>
                  <option value="QC">Quebec (QC)</option>
                  <option value="AB">Alberta (AB)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#090718] border border-white/10 rounded-2xl p-4 divide-y divide-white/5 max-h-72 overflow-y-auto">
                {filteredDealers.length > 0 ? (
                  filteredDealers.map((d, i) => (
                    <div key={i} className="py-3 flex items-start justify-between gap-3 first:pt-1 last:pb-1">
                      <div>
                        <div className="font-semibold text-sm text-white">{d.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-violet-400" />
                          <span>{d.address}, {d.city}, {d.prov}</span>
                        </div>
                        <div className="text-[10px] text-violet-300 font-mono mt-1">
                          {d.type}
                        </div>
                      </div>
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-200 text-xs font-medium border border-violet-500/20 whitespace-nowrap"
                      >
                        Directions
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No dealers found matching your search. Contact our Kitchener headquarters for direct inquiry.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
