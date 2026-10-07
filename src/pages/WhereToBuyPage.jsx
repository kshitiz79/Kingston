import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Store,
  MapPin,
  Phone,
  ExternalLink,
  ShieldCheck,
  Truck,
  Tag,
  Sparkles,
  CheckCircle2,
  Search,
  MessageCircle,
  CreditCard,
  Building2,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { productsData, retailersData } from '../data/productsData';

export default function WhereToBuyPage() {
  const [searchParams] = useSearchParams();
  const initialProduct = searchParams.get('product') || 'fdbp-a2';

  // Navigation Filter
  const [activeChannel, setActiveChannel] = useState('all'); // 'all', 'fb', 'website', 'retail'

  // Retailer Search State
  const [retailSearch, setRetailSearch] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedRetailType, setSelectedRetailType] = useState('All');

  // Website Order Form State
  const [orderProduct, setOrderProduct] = useState(initialProduct);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('etransfer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    province: 'ON',
    postalCode: '',
    notes: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  // Update order product if URL param changes
  useEffect(() => {
    const pParam = searchParams.get('product');
    if (pParam && productsData.some(p => p.id === pParam)) {
      setOrderProduct(pParam);
    }
  }, [searchParams]);

  // Selected product object
  const selectedProdObj = productsData.find(p => p.id === orderProduct) || productsData[0];
  const unitPrice = selectedProdObj.fbPrice || selectedProdObj.msrp;
  const discountMultiplier = appliedPromo ? 0.9 : 1.0;
  const subtotal = unitPrice * orderQuantity * discountMultiplier;
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const estimatedTotal = subtotal + shippingCost;

  // Filter Retailers
  const filteredRetailers = retailersData.filter(ret => {
    const matchSearch =
      ret.name.toLowerCase().includes(retailSearch.toLowerCase()) ||
      ret.city.toLowerCase().includes(retailSearch.toLowerCase()) ||
      ret.address.toLowerCase().includes(retailSearch.toLowerCase()) ||
      ret.postal.toLowerCase().includes(retailSearch.toLowerCase()) ||
      ret.inStock.some(item => item.toLowerCase().includes(retailSearch.toLowerCase()));

    const matchProv = selectedProvince === 'All' || ret.prov === selectedProvince;
    const matchType =
      selectedRetailType === 'All' ||
      (selectedRetailType === 'Pharmacy' && ret.category.toLowerCase().includes('pharmacy')) ||
      (selectedRetailType === 'Supply' && ret.category.toLowerCase().includes('supply')) ||
      (selectedRetailType === 'Depot' && ret.category.toLowerCase().includes('distribution'));

    return matchSearch && matchProv && matchType;
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FB10' || promoCode.trim().toUpperCase() === 'SPECIAL') {
      setAppliedPromo(true);
    } else {
      alert('Code not recognized. Try "FB10" for a 10% Facebook Ad discount!');
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.street || !formData.city) {
      alert('Please fill in your name, contact phone, and delivery address.');
      return;
    }
    const randRef = `KI-FB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(randRef);
    setOrderSubmitted(true);
  };

  const handleSelectProductForWebsiteOrder = (prodId) => {
    setOrderProduct(prodId);
    setActiveChannel('website');
    const el = document.getElementById('website-order-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080711] text-[#edeaf8] selection:bg-violet-500/30">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-violet-950/50 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-violet-600/15 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>OFFICIAL BUYING & RETAIL CHANNELS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              Where to Buy Kingston Instruments
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Shop directly from our <span className="text-white font-medium">Facebook Marketplace ads</span> with special launch pricing, order online with guaranteed Canadian manufacturer warranty, or visit an authorized retail pharmacy near you.
            </p>

            {/* Quick Channel Filter Pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setActiveChannel('all')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeChannel === 'all'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-[#120f29] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                All Buying Options
              </button>
              <button
                onClick={() => setActiveChannel('fb')}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                  activeChannel === 'fb'
                    ? 'bg-[#1877F2] text-white shadow-lg shadow-blue-600/30'
                    : 'bg-[#120f29] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook Marketplace & Ads</span>
              </button>
              <button
                onClick={() => setActiveChannel('website')}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                  activeChannel === 'website'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-[#120f29] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Website Direct Order</span>
              </button>
              <button
                onClick={() => setActiveChannel('retail')}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                  activeChannel === 'retail'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-[#120f29] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Authorized Retailers & Pharmacies</span>
              </button>
            </div>
          </div>

          {/* 3 Pillars Banner */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#0f0c23]/80 border border-violet-900/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">FB Marketplace Ad Deals</div>
                <div className="text-[11px] text-slate-400">Exclusive bundles & ad promo discounts</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0c23]/80 border border-violet-900/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Direct Canadian Dispatch</div>
                <div className="text-[11px] text-slate-400">Kitchener ON depot with 1-3 day delivery</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0c23]/80 border border-violet-900/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Official 2-Year Warranty</div>
                <div className="text-[11px] text-slate-400">Full clinical replacement & local support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FACEBOOK MARKETPLACE & SOCIAL AD SHOP */}
      {(activeChannel === 'all' || activeChannel === 'fb') && (
        <section id="fb-section" className="py-16 border-b border-violet-950/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* FB Header Banner */}
            <div className="bg-gradient-to-r from-[#1877F2]/15 via-[#101935] to-[#0d0a22] border border-blue-500/30 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-blue-300 font-semibold">
                      Featured On Facebook Marketplace & Meta Ads
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                    Saw our ad on Facebook? Order directly or message us.
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    We run daily promotional campaigns across Facebook Marketplace with bundled accessories, free local pickup in the Waterloo Region, and flat-rate tracked parcel shipping across Canada. Message our official page for quick responses!
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Visit Facebook Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://m.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span>Chat on Messenger</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Product Cards Tailored for FB Marketplace */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Featured Products on FB Marketplace
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click to purchase via Facebook Marketplace or lock in the same promotional rate directly through our website.
                </p>
              </div>
              <span className="hidden sm:inline-flex text-xs font-mono text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Promo Code: FB10
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsData.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#0e0b24] border border-violet-900/40 hover:border-blue-500/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/20 group relative overflow-hidden"
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      FB Ad Featured
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {prod.savings || 'Special Deal'}
                    </span>
                  </div>

                  {/* Image container */}
                  <div className="relative aspect-square w-full bg-[#080614] rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-violet-400 font-semibold">{prod.code}</span>
                      <span className="text-[11px] text-slate-400 font-mono">2-Yr Warranty</span>
                    </div>

                    <h4 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {prod.name}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {prod.subtitle}
                    </p>

                    {/* Promo perk */}
                    <div className="pt-2 text-[11px] text-blue-200/90 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{prod.fbPromoBadge || 'Includes clinical carrying case & accessories'}</span>
                    </div>

                    {/* Price display */}
                    <div className="pt-3 border-t border-white/5 flex items-baseline gap-2.5">
                      <span className="text-2xl font-bold text-white">
                        ${prod.fbPrice ? prod.fbPrice.toFixed(2) : '49.99'}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ${prod.msrp ? prod.msrp.toFixed(2) : '69.99'} CAD
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">CAD</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                    <a
                      href={prod.fbMarketplaceUrl || 'https://www.facebook.com/marketplace'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Buy on FB</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => handleSelectProductForWebsiteOrder(prod.id)}
                      className="py-2.5 px-3 rounded-xl bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-800/50 text-xs font-medium transition-all flex items-center justify-center gap-1"
                    >
                      <span>Order on Website</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* SECTION 2: OFFICIAL WEBSITE DIRECT ORDER */}
      {(activeChannel === 'all' || activeChannel === 'website') && (
        <section id="website-order-section" className="py-16 border-b border-violet-950/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Official Web Store Checkout
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-1">
                Order directly from our Canadian headquarters.
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Prefer not to use Facebook? Place your order directly below. Each device ships sealed from our Kitchener, ON facility with official 2-year warranty and expedited parcel tracking.
              </p>
            </div>

            {orderSubmitted ? (
              /* Success confirmation state */
              <div className="max-w-2xl mx-auto bg-[#0d1624] border border-emerald-500/40 rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Order Request Received
                </span>
                <h3 className="text-2xl font-semibold text-white mt-2">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Your order for <span className="text-white font-medium">{orderQuantity}× {selectedProdObj.name} ({selectedProdObj.code})</span> has been logged.
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-[#080d17] border border-white/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Reference ID:</span>
                    <span className="font-mono text-emerald-400 font-semibold">{orderReference}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Address:</span>
                    <span className="text-white">{formData.street}, {formData.city}, {formData.province} {formData.postalCode}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Selected:</span>
                    <span className="text-white uppercase font-mono">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 border-t border-white/5 pt-2 font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-emerald-300 text-sm">${estimatedTotal.toFixed(2)} CAD</span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-slate-400">
                  Our Kitchener support team will email you at <span className="text-white">{formData.email || 'your email'}</span> and SMS your phone at <span className="text-white">{formData.phone}</span> with tracking & payment instructions.
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setOrderSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        street: '',
                        city: '',
                        province: 'ON',
                        postalCode: '',
                        notes: ''
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                  >
                    Place Another Order
                  </button>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
                  >
                    Contact Kitchener Hub
                  </Link>
                </div>
              </div>
            ) : (
              /* Order Form Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Device Selection & Order Info */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Selected Product Card */}
                  <div className="bg-[#100d28] border border-violet-800/40 rounded-3xl p-6 relative overflow-hidden shadow-xl">
                    <div className="text-xs font-mono uppercase tracking-wider text-violet-400 mb-3">
                      Selected Clinical Device
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-[#080614] rounded-2xl border border-white/10 p-2 flex items-center justify-center flex-shrink-0">
                        <img
                          src={selectedProdObj.image}
                          alt={selectedProdObj.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">{selectedProdObj.code}</span>
                        <h4 className="text-base font-semibold text-white leading-snug">{selectedProdObj.name}</h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xl font-bold text-white">${unitPrice.toFixed(2)}</span>
                          <span className="text-xs text-slate-400 line-through">${selectedProdObj.msrp?.toFixed(2)} CAD</span>
                        </div>
                      </div>
                    </div>

                    {/* Change Device Dropdown */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <label className="text-xs text-slate-400 block mb-1.5 font-medium">Switch Model:</label>
                      <select
                        value={orderProduct}
                        onChange={(e) => setOrderProduct(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-[#080616] border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
                      >
                        {productsData.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.code} - {p.name} (${(p.fbPrice || p.msrp).toFixed(2)} CAD)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-300">Quantity:</span>
                      <div className="flex items-center gap-2 bg-[#080616] border border-white/10 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-semibold text-white">
                          {orderQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setOrderQuantity(orderQuantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Promo Code Input */}
                    <form onSubmit={handleApplyPromo} className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code (e.g. FB10)"
                          className="flex-1 h-10 px-3 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                        <button
                          type="submit"
                          className="px-3.5 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedPromo && (
                        <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>10% FB Ad Promo Applied (-${(unitPrice * orderQuantity * 0.1).toFixed(2)})</span>
                        </div>
                      )}
                    </form>

                    {/* Order Breakdown */}
                    <div className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span className="text-white">${subtotal.toFixed(2)} CAD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Canada Shipping:</span>
                        <span className={shippingCost === 0 ? "text-emerald-400 font-semibold" : "text-white"}>
                          {shippingCost === 0 ? 'FREE (Orders > $50)' : '$9.99 CAD'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-white border-t border-white/5 pt-2">
                        <span>Estimated Total:</span>
                        <span className="text-violet-300">${estimatedTotal.toFixed(2)} CAD</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust guarantees */}
                  <div className="p-4 rounded-2xl bg-[#090718] border border-white/5 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2 text-slate-300 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>R-Biomeds Canada Quality Assurance</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Every order includes full manufacturer warranty registration, pre-calibrated sensor certificate, and direct access to our Kitchener clinical technical support line.
                    </p>
                  </div>
                </div>

                {/* Right: Checkout Shipping & Payment Form */}
                <div className="lg:col-span-7 bg-[#100d28] border border-violet-800/40 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <h3 className="text-lg font-semibold text-white">Shipping & Contact Information</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Please provide your delivery destination across Canada.</p>
                  </div>

                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Sarah Miller"
                          className="w-full h-11 px-3.5 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Phone Number (for Courier SMS) *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 519-555-0192"
                          className="w-full h-11 px-3.5 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Email Address (for Receipt & Tracking) *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@example.ca"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        placeholder="e.g. 124 King Street West, Unit 4B"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-300 block mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Kitchener"
                          className="w-full h-11 px-3.5 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Province *</label>
                        <select
                          value={formData.province}
                          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#080616] border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500"
                        >
                          <option value="ON">Ontario (ON)</option>
                          <option value="BC">British Columbia (BC)</option>
                          <option value="AB">Alberta (AB)</option>
                          <option value="QC">Quebec (QC)</option>
                          <option value="MB">Manitoba (MB)</option>
                          <option value="SK">Saskatchewan (SK)</option>
                          <option value="NS">Nova Scotia (NS)</option>
                          <option value="NB">New Brunswick (NB)</option>
                          <option value="Other">Other Canadian Territory</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Postal Code *</label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          placeholder="e.g. N2G 1A6"
                          className="w-full h-11 px-3.5 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>

                    {/* Payment Preference Selector */}
                    <div className="pt-2">
                      <label className="text-xs text-slate-300 block mb-2 font-medium">Payment Preference:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <label
                          className={`p-3 rounded-xl border cursor-pointer flex flex-col gap-1 transition-all ${
                            paymentMethod === 'etransfer'
                              ? 'bg-violet-600/20 border-violet-500 text-white'
                              : 'bg-[#080616] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="pay"
                            value="etransfer"
                            checked={paymentMethod === 'etransfer'}
                            onChange={() => setPaymentMethod('etransfer')}
                            className="hidden"
                          />
                          <span className="text-xs font-semibold text-white">Interac e-Transfer</span>
                          <span className="text-[10px] text-slate-400">Fastest Canada processing</span>
                        </label>

                        <label
                          className={`p-3 rounded-xl border cursor-pointer flex flex-col gap-1 transition-all ${
                            paymentMethod === 'card'
                              ? 'bg-violet-600/20 border-violet-500 text-white'
                              : 'bg-[#080616] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="pay"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="hidden"
                          />
                          <span className="text-xs font-semibold text-white">Credit Card Invoice</span>
                          <span className="text-[10px] text-slate-400">Secure link via email</span>
                        </label>

                        <label
                          className={`p-3 rounded-xl border cursor-pointer flex flex-col gap-1 transition-all ${
                            paymentMethod === 'pickup'
                              ? 'bg-violet-600/20 border-violet-500 text-white'
                              : 'bg-[#080616] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="pay"
                            value="pickup"
                            checked={paymentMethod === 'pickup'}
                            onChange={() => setPaymentMethod('pickup')}
                            className="hidden"
                          />
                          <span className="text-xs font-semibold text-white">Local Pickup / COD</span>
                          <span className="text-[10px] text-slate-400">Kitchener Hub pickup</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Delivery Instructions or Notes (Optional)</label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Leave at front porch, buzzer code #204, or saw FB ad about FDBP-A14"
                        className="w-full p-3 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-700/40 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirm & Submit Order Request (${estimatedTotal.toFixed(2)} CAD)</span>
                    </button>

                    <div className="text-center text-[11px] text-slate-400 mt-2">
                      No immediate credit card charge required right now. We confirm stock and send invoice/tracking instructions.
                    </div>
                  </form>
                </div>

              </div>
            )}

          </div>
        </section>
      )}

      {/* SECTION 3: AUTHORIZED RETAILERS & PHARMACIES */}
      {(activeChannel === 'all' || activeChannel === 'retail') && (
        <section id="retail-section" className="py-16 border-b border-violet-950/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                In-Store Availability
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mt-1">
                Authorized Retailers & Pharmacy Partners
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Visit a licensed pharmacy or medical equipment store to consult with a pharmacist and test Kingston Instruments in person.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-[#100d26] border border-violet-900/40 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                
                {/* Search query */}
                <div className="md:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={retailSearch}
                    onChange={(e) => setRetailSearch(e.target.value)}
                    placeholder="Search pharmacy name, city, street, or model (e.g. FDBP-A2, Toronto)..."
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#080616] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Province filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#080616] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="All">All Canadian Provinces</option>
                    <option value="ON">Ontario (ON)</option>
                    <option value="BC">British Columbia (BC)</option>
                    <option value="QC">Quebec (QC)</option>
                    <option value="AB">Alberta (AB)</option>
                  </select>
                </div>

                {/* Type filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedRetailType}
                    onChange={(e) => setSelectedRetailType(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#080616] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="All">All Store Types</option>
                    <option value="Pharmacy">Retail Pharmacies</option>
                    <option value="Supply">Medical Supply Centers</option>
                    <option value="Depot">Primary Depots</option>
                  </select>
                </div>

              </div>

              {/* Active search counter */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-2">
                <span>Showing <strong className="text-white">{filteredRetailers.length}</strong> authorized locations</span>
                {retailSearch && (
                  <button
                    onClick={() => setRetailSearch('')}
                    className="text-amber-400 hover:underline text-[11px]"
                  >
                    Clear search query
                  </button>
                )}
              </div>
            </div>

            {/* Retailer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRetailers.map((ret) => (
                <div
                  key={ret.id}
                  className="bg-[#0e0b24] border border-violet-900/40 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {ret.badge || ret.category}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {ret.status}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {ret.name}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-300 pt-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                        <span>{ret.address}, {ret.city}, {ret.prov} {ret.postal}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <a href={`tel:${ret.phone}`} className="hover:text-white transition-colors">
                          {ret.phone}
                        </a>
                      </div>

                      {ret.hours && (
                        <div className="flex items-start gap-2 text-slate-400 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                          <span>{ret.hours}</span>
                        </div>
                      )}
                    </div>

                    {/* In-Stock Device Badges */}
                    {ret.inStock && ret.inStock.length > 0 && (
                      <div className="pt-3 border-t border-white/5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                          Carries Models:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {ret.inStock.map(item => (
                            <span
                              key={item}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                    <a
                      href={ret.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-200 border border-violet-500/20 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={`tel:${ret.phone}`}
                      className="py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredRetailers.length === 0 && (
              <div className="p-12 text-center bg-[#0d0a20] rounded-3xl border border-white/5 space-y-3">
                <Store className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-white font-medium">No stores matched your current search filters.</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try searching for another city, or contact our Kitchener headquarters directly to order with Canada-wide doorstep delivery.
                </p>
                <button
                  onClick={() => {
                    setRetailSearch('');
                    setSelectedProvince('All');
                    setSelectedRetailType('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* SECTION 4: WHOLESALE & RETAIL PARTNER INQUIRY */}
      <section className="py-16 bg-[#06050f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#120e2e] via-[#150f38] to-[#110c29] border border-violet-700/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                B2B Distribution & Pharmacy Partnerships
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                Are you a pharmacy owner, clinic, or medical distributor?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Expand your retail inventory with Kingston Instruments. We offer attractive wholesale margins, retail display marketing collateral, staff training resources, and reliable distribution fulfillment across all Canadian provinces.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-white text-[#090715] font-semibold text-xs hover:bg-violet-100 transition-colors flex items-center gap-2"
                >
                  <span>Apply for Wholesale Account</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+15199986325"
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-violet-400" />
                  <span>Call Kitchener B2B Desk (+1 519-998-6325)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
