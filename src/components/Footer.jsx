import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  ExternalLink,
  Activity,
  HeartPulse,
  Sparkles,
  ShoppingBag,
  Store
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06050e] border-t border-violet-950/60 pt-16 pb-12 text-slate-300 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-violet-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/5">
          
          {/* Brand & Canadian Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="group inline-block">
                <img 
                  src="/logoKingston_White.png" 
                  alt="Kingston Instruments" 
                  className="h-11 sm:h-12 md:h-13 lg:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)] brightness-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fb = document.getElementById('footer-logo-fallback');
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
              </Link>
              <div id="footer-logo-fallback" className="hidden flex-col">
                <span className="font-extrabold text-xl md:text-2xl tracking-[0.2em] text-white">KINGSTON</span>
                <span className="text-xs md:text-sm tracking-[0.35em] text-violet-300 font-mono">INSTRUMENTS</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Precision with Care. Developed under <span className="text-white font-medium">R-Biomeds Canada</span>, Kingston Instruments combines Canadian engineering rigor with intelligent design to elevate everyday home and clinical health monitoring.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span>63 Meadowridge St, Kitchener, ON, N2P 0E2, Canada</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>ISO & Clinical Grade Measurement Standards</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-red-500" aria-hidden="true">
                  <path d="M12 1.5l2.2 4.3 2.6-1.3-.9 6.1 3.2-2.2 1 2.2 3.6-.8-1.3 4.4 1.5 1-5.8 5-.5 1.9-6.3-1.3-.2 5.8h-1.2l-.2-5.8-6.3 1.3-.5-1.9L.7 14.1l1.5-1-1.3-4.4 3.6.8 1-2.2 3.2 2.2-.9-6.1 2.6 1.3z"/>
                </svg>
                Proudly Canadian Heritage
              </span>
            </div>
          </div>

          {/* Device Portfolio */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-semibold">
              Device Portfolio
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products?category=bp" className="hover:text-violet-300 transition-colors flex items-center gap-1 group">
                  <span>FDBP-A2 Monitor</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-violet-400">(Large LCD)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=bp" className="hover:text-violet-300 transition-colors flex items-center gap-1 group">
                  <span>FDBP-A1 Monitor</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-violet-400">(Dual-User)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=bp" className="hover:text-violet-300 transition-colors flex items-center gap-1 group">
                  <span>FDBP-A14 Monitor</span>
                  <span className="text-[10px] text-violet-400 font-mono">Tubeless</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=glucose" className="hover:text-violet-300 transition-colors flex items-center gap-1 group">
                  <span>GLM-72 Meter</span>
                  <span className="text-[10px] text-teal-400 font-mono">Glucose</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=tens" className="hover:text-violet-300 transition-colors flex items-center gap-1 group">
                  <span>FDES-106 Device</span>
                  <span className="text-[10px] text-amber-400 font-mono">TENS + Heat</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=thermo" className="hover:text-violet-300 transition-colors flex items-center gap-1 group">
                  <span>Infrared Thermometer</span>
                  <span className="text-[10px] text-slate-500">V-12 Clinical</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Care */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-semibold">
              Health Tools & Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/health-tools" className="hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-violet-400" />
                  <span>Interactive Health Calculators</span>
                </Link>
              </li>
              <li>
                <Link to="/where-to-buy" className="hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Where to Buy (FB & Retail)</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-violet-300 transition-colors">
                  About Kingston Instruments
                </Link>
              </li>
              <li>
                <Link to="/where-to-buy" className="hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authorized Pharmacy Locator</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  <span>Contact Kitchener HQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Inquiries & Distribution */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-semibold">
              Distributors & Clinics
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Looking to stock Kingston diagnostic solutions in your clinic, pharmacy, or distribution network?
            </p>
            <Link 
              to="/where-to-buy"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-200 border border-violet-500/30 text-xs font-medium transition-colors"
            >
              <span>Partner Inquiry</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>

            <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5 text-xs text-slate-400">
              <div className="font-medium text-white">R-Biomeds Canada</div>
              <div>Supply & Distribution Hub</div>
              <div>Ontario, Canada</div>
            </div>
          </div>

        </div>

        {/* Medical Regulatory Notice */}
        <div className="py-6 border-b border-white/5 text-[11px] leading-relaxed text-slate-400">
          <p className="max-w-5xl">
            <span className="font-semibold text-slate-400 uppercase tracking-wide">Medical Disclaimer:</span> Kingston Instruments devices, including blood pressure monitors, glucose monitoring meters, and TENS therapy devices, are designed to support personal and clinical health tracking. They are not intended to replace professional medical diagnosis, prescription, or clinical guidance. Always review your readings with a licensed physician or healthcare professional.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} Kingston Instruments. R-Biomeds Canada. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/products" className="hover:text-white transition-colors">Product Catalogue</Link>
            <Link to="/where-to-buy" className="hover:text-white transition-colors">Where to Buy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
