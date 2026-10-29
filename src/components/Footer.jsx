import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Mail, 
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
          <div className="lg:col-span-2 space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Link to="/" className="group inline-block">
                <img 
                  src="/logoKingston_White.png" 
                  alt="Kingston Instruments" 
                  className="h-11 sm:h-12 md:h-13 lg:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)] brightness-105 mx-auto sm:mx-0"
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

            <p className="text-sm text-slate-400 max-w-md mx-auto sm:mx-0 leading-relaxed text-center sm:text-left">
              Precision with Care. Developed under <span className="text-white font-medium">R-Biomeds Canada</span>, Kingston Instruments combines Canadian engineering rigor with intelligent design to elevate everyday home and clinical health monitoring.
            </p>

            <div className="pt-2 flex flex-col items-center sm:items-start gap-2 text-xs text-slate-400 text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span>63 Meadowridge St, Kitchener, ON, N2P 0E2, Canada</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>ISO & Clinical Grade Measurement Standards</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 w-full">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-red-500" aria-hidden="true">
                  <path d="M12 1.5l2.2 4.3 2.6-1.3-.9 6.1 3.2-2.2 1 2.2 3.6-.8-1.3 4.4 1.5 1-5.8 5-.5 1.9-6.3-1.3-.2 5.8h-1.2l-.2-5.8-6.3 1.3-.5-1.9L.7 14.1l1.5-1-1.3-4.4 3.6.8 1-2.2 3.2 2.2-.9-6.1 2.6 1.3z"/>
                </svg>
                Proudly Canadian Heritage
              </span>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2.5 w-full">
              <span className="text-xs font-mono text-slate-400 mr-1">Follow Us:</span>
              <a
                href="https://www.facebook.com/share/19UTSnwfi4/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Kingston Instruments on Facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-violet-950/40 hover:bg-[#1877f2]/20 border border-violet-800/40 hover:border-[#1877f2]/60 text-slate-300 hover:text-[#1877f2] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/kingston_instruments/"
                target="_blank"
                rel="noopener noreferrer"
                title="Kingston Instruments on Instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-violet-950/40 hover:bg-gradient-to-tr hover:from-amber-500/20 hover:via-rose-500/20 hover:to-purple-500/20 border border-violet-800/40 hover:border-pink-500/60 text-slate-300 hover:text-pink-400 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/kingston-instruments/"
                target="_blank"
                rel="noopener noreferrer"
                title="Kingston Instruments on LinkedIn"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-violet-950/40 hover:bg-[#0a66c2]/20 border border-violet-800/40 hover:border-[#0a66c2]/60 text-slate-300 hover:text-[#0a66c2] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Device Portfolio */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-semibold text-center sm:text-left">
              Device Portfolio
            </h3>
            <ul className="space-y-2.5 text-sm flex flex-col items-center sm:items-start">
              <li>
                <Link to="/products?category=bp" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1 group">
                  <span>FDBP-A2 Monitor</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-violet-400">(Large LCD)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=bp" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1 group">
                  <span>FDBP-A1 Monitor</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-violet-400">(Dual-User)</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=bp" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1 group">
                  <span>FDBP-A13 Monitor</span>
                  <span className="text-[10px] text-violet-400 font-mono">LED Panel</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=glucose" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1 group">
                  <span>HL-568 Meter</span>
                  <span className="text-[10px] text-teal-400 font-mono">Glucose</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=tens" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1 group">
                  <span>FDES-106 Device</span>
                  <span className="text-[10px] text-amber-400 font-mono">TENS + Heat</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=thermo" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1 group">
                  <span>Infrared Thermometer</span>
                  <span className="text-[10px] text-slate-500">FDIR-V11</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Care */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-semibold text-center sm:text-left">
              Health Tools & Company
            </h3>
            <ul className="space-y-2.5 text-sm flex flex-col items-center sm:items-start">
              <li>
                <Link to="/health-tools" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-violet-400" />
                  <span>Interactive Health Calculators</span>
                </Link>
              </li>
              <li>
                <Link to="/where-to-buy" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1.5">
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
                <Link to="/where-to-buy" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1.5">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authorized Pharmacy Locator</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-violet-300 transition-colors flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                  <span>Contact Kitchener HQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Inquiries & Distribution */}
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-semibold text-center sm:text-left">
              Distributors & Clinics
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed text-center sm:text-left max-w-sm sm:max-w-none mx-auto sm:mx-0">
              Looking to stock Kingston diagnostic solutions in your clinic, pharmacy, or distribution network?
            </p>
            <Link 
              to="/where-to-buy"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-200 border border-violet-500/30 text-xs font-medium transition-colors"
            >
              <span>Partner Inquiry</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>

            <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5 text-xs text-slate-400 text-center sm:text-left w-full sm:w-auto">
              <div className="font-medium text-white">R-Biomeds Canada</div>
              <div>Supply & Distribution Hub</div>
              <div>Ontario, Canada</div>
            </div>
          </div>

        </div>

        {/* Medical Regulatory Notice */}
        <div className="py-6 border-b border-white/5 text-[11px] leading-relaxed text-slate-400 text-center sm:text-left">
          <p className="max-w-5xl mx-auto sm:mx-0">
            <span className="font-semibold text-slate-400 uppercase tracking-wide">Medical Disclaimer:</span> Kingston Instruments devices, including blood pressure monitors, glucose monitoring meters, and TENS therapy devices, are designed to support personal and clinical health tracking. They are not intended to replace professional medical diagnosis, prescription, or clinical guidance. Always review your readings with a licensed physician or healthcare professional.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {currentYear} Kingston Instruments. R-Biomeds Canada. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
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