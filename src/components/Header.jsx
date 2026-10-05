import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Sparkles,
  HeartPulse,
  Droplet,
  Zap,
  Thermometer
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#products', hasDropdown: true },
    { name: 'Technology', href: '#technology' },
    { name: 'Health Tools', href: '#health-tools', badge: 'Interactive' },
    { name: 'Why Kingston', href: '#why-kingston' },
    { name: 'Catalogue Specs', href: '#catalogue' },
  ];

  const productCategories = [
    {
      title: 'Blood Pressure Monitors',
      desc: 'FDBP-A2, FDBP-A1 & Tubeless A14',
      icon: HeartPulse,
      href: '#products',
      color: 'text-violet-400 bg-violet-500/10'
    },
    {
      title: 'Blood Glucose Meter',
      desc: 'GLM-72 Rapid 5s with Voice Aid',
      icon: Droplet,
      href: '#products',
      color: 'text-teal-400 bg-teal-500/10'
    },
    {
      title: 'Wireless TENS + Heat Therapy',
      desc: 'FDES-106 Targeted Pain Relief',
      icon: Zap,
      href: '#products',
      color: 'text-amber-400 bg-amber-500/10'
    },
    {
      title: 'Infrared Thermometer',
      desc: 'High Precision Contactless Clinical V-12',
      icon: Thermometer,
      href: '#products',
      color: 'text-rose-400 bg-rose-500/10'
    }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080711]/90 backdrop-blur-md border-b border-violet-950/50 shadow-lg shadow-black/40 py-3.5' 
          : 'bg-[#080711]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Canadian Pride */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <img 
                src="/logoKingston_White.png" 
                alt="Kingston Instruments" 
                className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                onError={(e) => {
                  // Fallback if image path fails
                  e.currentTarget.style.display = 'none';
                  const fb = document.getElementById('logo-fallback');
                  if (fb) fb.classList.remove('hidden');
                }}
              />
              <div id="logo-fallback" className="hidden flex-col">
                <span className="font-extrabold text-lg tracking-[0.2em] text-white">KINGSTON</span>
                <span className="text-[10px] tracking-[0.35em] text-violet-300 font-mono">INSTRUMENTS</span>
              </div>
            </a>

            {/* Canadian Badge */}
            <div className="hidden sm:flex items-center gap-1.5 pl-3.5 border-l border-white/10 text-[11px] font-mono tracking-wider text-slate-300 uppercase">
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" 
                aria-hidden="true"
              >
                <path d="M12 1.5l2.2 4.3 2.6-1.3-.9 6.1 3.2-2.2 1 2.2 3.6-.8-1.3 4.4 1.5 1-5.8 5-.5 1.9-6.3-1.3-.2 5.8h-1.2l-.2-5.8-6.3 1.3-.5-1.9L.7 14.1l1.5-1-1.3-4.4 3.6.8 1-2.2 3.2 2.2-.9-6.1 2.6 1.3z"/>
              </svg>
              <div className="leading-tight">
                <span className="block font-semibold text-white">PROUDLY</span>
                <span className="text-[9px] text-slate-400">CANADIAN</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  onMouseEnter={() => link.hasDropdown && setProductsDropdown(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg transition-colors hover:bg-white/5"
                >
                  {link.name}
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono border border-violet-500/30 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </a>

                {/* Dropdown Menu for Products */}
                {link.hasDropdown && (
                  <div 
                    onMouseEnter={() => setProductsDropdown(true)}
                    onMouseLeave={() => setProductsDropdown(false)}
                    className="absolute top-full left-0 w-80 pt-2 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0"
                  >
                    <div className="p-3 bg-[#110e24] border border-violet-900/40 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                        Kingston Device Portfolio
                      </div>
                      {productCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <a
                            key={cat.title}
                            href={cat.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item"
                          >
                            <div className={`p-2 rounded-lg ${cat.color} group-hover/item:scale-110 transition-transform`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white group-hover/item:text-violet-300 transition-colors">
                                {cat.title}
                              </div>
                              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                                {cat.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="#health-tools" 
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white border border-violet-900/60 hover:border-violet-500/50 rounded-full transition-all bg-violet-950/20 hover:bg-violet-900/30"
            >
              <Activity className="w-3.5 h-3.5 text-violet-400" />
              <span>Free Health Tools</span>
            </a>

            <a 
              href="#dealer" 
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#090715] bg-gradient-to-r from-violet-200 via-indigo-100 to-white hover:from-white hover:to-violet-100 rounded-full shadow-[0_0_20px_-3px_rgba(199,187,255,0.4)] hover:shadow-[0_0_25px_-1px_rgba(199,187,255,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MapPin className="w-3.5 h-3.5 text-[#090715]" />
              <span>Find a Dealer</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a 
              href="#dealer" 
              className="px-2.5 py-1.5 text-xs font-medium text-[#090715] bg-violet-200 rounded-full"
            >
              Find Dealer
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-violet-950/40 rounded-lg transition-colors"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
              <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-400">Featured Devices</div>
              <div className="grid grid-cols-2 gap-2 px-1">
                <a 
                  href="#products" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">FDBP-A2</div>
                  <div className="text-[10px] text-slate-400">Large LCD Monitor</div>
                </a>
                <a 
                  href="#products" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">FDBP-A14</div>
                  <div className="text-[10px] text-slate-400">Tubeless 360° Cuff</div>
                </a>
                <a 
                  href="#products" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">GLM-72</div>
                  <div className="text-[10px] text-slate-400">Glucose Meter</div>
                </a>
                <a 
                  href="#products" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">FDES-106</div>
                  <div className="text-[10px] text-slate-400">TENS + Heat Relief</div>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between px-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                R-Biomeds Canada
              </span>
              <span>Kitchener, ON</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
