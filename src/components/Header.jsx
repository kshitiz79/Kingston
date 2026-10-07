import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Store,
  ShieldCheck,
  HeartPulse,
  Droplet,
  Zap,
  Thermometer,
  Activity,
  Info,
  Mail,
  Home
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', hasDropdown: true },
    { name: 'Where to Buy', href: '/where-to-buy', badge: 'FB & Stores', highlight: true },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Health Tools', href: '/health-tools', icon: Activity },
    { name: 'Contact Us', href: '/contact', icon: Mail },
  ];

  const productCategories = [
    {
      title: 'Blood Pressure Monitors',
      desc: 'FDBP-A2, FDBP-A1 & Tubeless A14',
      icon: HeartPulse,
      href: '/products?category=bp',
      color: 'text-violet-400 bg-violet-500/10'
    },
    {
      title: 'Blood Glucose Meter',
      desc: 'GLM-72 Rapid 5s with Voice Aid',
      icon: Droplet,
      href: '/products?category=glucose',
      color: 'text-teal-400 bg-teal-500/10'
    },
    {
      title: 'Wireless TENS + Heat Therapy',
      desc: 'FDES-106 Targeted Pain Relief',
      icon: Zap,
      href: '/products?category=tens',
      color: 'text-amber-400 bg-amber-500/10'
    },
    {
      title: 'Infrared Thermometer',
      desc: 'High Precision Contactless Clinical V-12',
      icon: Thermometer,
      href: '/products?category=thermo',
      color: 'text-rose-400 bg-rose-500/10'
    }
  ];

  const isLinkActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#080711]/90 backdrop-blur-md border-b border-violet-950/50 shadow-lg shadow-black/40 py-3'
        : 'bg-[#080711]/60 backdrop-blur-sm border-b border-white/5 py-3.5 sm:py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo & Canadian Pride */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logoKingston_White.png"
                alt="Kingston Instruments"
                className="h-12 sm:h-14 md:h-8 lg:h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)] brightness-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = document.getElementById('logo-fallback');
                  if (fb) fb.classList.remove('hidden');
                }}
              />
              <div id="logo-fallback" className="hidden flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-[0.2em] text-white">KINGSTON</span>
                <span className="text-xs tracking-[0.35em] text-violet-300 font-mono">INSTRUMENTS</span>
              </div>
            </Link>

            {/* Canadian Badge */}
            {/* <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/15 text-[11px] font-mono tracking-wider text-slate-300 uppercase py-1">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                aria-hidden="true"
              >
                <path d="M12 1.5l2.2 4.3 2.6-1.3-.9 6.1 3.2-2.2 1 2.2 3.6-.8-1.3 4.4 1.5 1-5.8 5-.5 1.9-6.3-1.3-.2 5.8h-1.2l-.2-5.8-6.3 1.3-.5-1.9L.7 14.1l1.5-1-1.3-4.4 3.6.8 1-2.2 3.2 2.2-.9-6.1 2.6 1.3z" />
              </svg>
              <div className="leading-tight">
                <span className="block font-semibold text-white">PROUDLY</span>
                <span className="text-[9px] text-slate-400">CANADIAN</span>
              </div>
            </div> */}
          </div>

          {/* Desktop Navigation - ALL REAL PAGES, NO HASH LINKS */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.href}
                    onMouseEnter={() => link.hasDropdown && setProductsDropdown(true)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl transition-all ${active
                      ? 'text-white bg-violet-600/20 border border-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                      } ${link.highlight ? 'text-violet-200 hover:text-white' : ''}`}
                  >
                    <span>{link.name}</span>

                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono border border-violet-500/30">
                        {link.badge}
                      </span>
                    )}

                    {link.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu for Products */}
                  {link.hasDropdown && (
                    <div
                      onMouseEnter={() => setProductsDropdown(true)}
                      onMouseLeave={() => setProductsDropdown(false)}
                      className="absolute top-full left-0 w-80 pt-2 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0"
                    >
                      <div className="p-3 bg-[#110e24] border border-violet-900/40 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl">
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                          <span>Kingston Categories</span>
                          <Link to="/products" className="text-violet-400 hover:underline">
                            View All →
                          </Link>
                        </div>
                        {productCategories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <Link
                              key={cat.title}
                              to={cat.href}
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
                            </Link>
                          );
                        })}

                        <div className="mt-2 pt-2 border-t border-white/5 px-2">
                          <Link
                            to="/where-to-buy"
                            className="flex items-center justify-between p-2 rounded-lg bg-violet-600/10 hover:bg-violet-600/20 text-xs text-violet-300 font-medium transition-colors"
                          >
                            <span>Where to Buy (FB & Retail)</span>
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action CTAs & Mobile Toggle */}
          <div className="flex items-center gap-3">

            {/* Desktop "Where to Buy" Primary Button */}
            <Link
              to="/where-to-buy"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-full shadow-md shadow-violet-700/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Where to Buy</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer - ALL REAL PAGES, NO HASH LINKS */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${active
                      ? 'text-white bg-violet-600/20 border border-violet-500/30 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-violet-950/40'
                      }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Quick Buy CTA in mobile menu */}
            <div className="mt-3 px-1">
              <Link
                to="/where-to-buy"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-violet-600/30"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Where to Buy (FB Marketplace & Retailers)</span>
              </Link>
            </div>

            {/* Quick Links to Featured Categories */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
              <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-400">Featured Devices</div>
              <div className="grid grid-cols-2 gap-2 px-1">
                <Link
                  to="/products?category=bp"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">FDBP-A2</div>
                  <div className="text-[10px] text-slate-400">Large LCD Monitor</div>
                </Link>
                <Link
                  to="/products?category=bp"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">FDBP-A14</div>
                  <div className="text-[10px] text-slate-400">Tubeless 360° Cuff</div>
                </Link>
                <Link
                  to="/products?category=glucose"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">GLM-72</div>
                  <div className="text-[10px] text-slate-400">Glucose Meter</div>
                </Link>
                <Link
                  to="/products?category=tens"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-violet-950/30 border border-violet-900/30 rounded-xl text-xs text-slate-200 hover:text-white"
                >
                  <div className="font-semibold">FDES-106</div>
                  <div className="text-[10px] text-slate-400">TENS + Heat Relief</div>
                </Link>
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
