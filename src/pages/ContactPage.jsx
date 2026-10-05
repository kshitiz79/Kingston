import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Globe,
  Building2,
  Clock,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

const offices = [
  {
    country: 'Canada',
    flag: '🇨🇦',
    role: 'HEAD OFFICE',
    roleColor: 'from-violet-500 to-indigo-500',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    glowColor: 'hover:shadow-violet-900/40',
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-800/40',
    address: '63 Meadowridge St, Kitchener, ON N2P 0E2, Canada',
    phone: '+1 519-998-6325',
    mapUrl:
      'https://www.google.com/maps?q=63+Meadowridge+St,+Kitchener,+ON+N2P+0E2,+Canada',
  },
  {
    country: 'Singapore',
    flag: '🇸🇬',
    role: 'REGIONAL OFFICE',
    roleColor: 'from-teal-500 to-cyan-500',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    glowColor: 'hover:shadow-teal-900/40',
    accentColor: 'text-teal-400',
    borderColor: 'border-teal-800/40',
    address: '11G Bright Hill Drive, Thomson View, Singapore 579615',
    phone: '+65 9127 6706',
    mapUrl:
      'https://www.google.com/maps?q=11G+Bright+Hill+Drive,+Thomson+View,+Singapore+579615',
  },
  {
    country: 'Myanmar',
    flag: '🇲🇲',
    role: 'REGIONAL OFFICE',
    roleColor: 'from-amber-500 to-orange-500',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    glowColor: 'hover:shadow-amber-900/40',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-800/40',
    address:
      'No. 002, Shwe Than Lwin Condo, Bahan Township, Yangon, Myanmar 11201',
    phone: '+95 9430 40374 / +95 9798 45393',
    mapUrl:
      'https://www.google.com/maps?q=Bahan+Township,+Yangon,+Myanmar',
  },
  {
    country: 'Cambodia',
    flag: '🇰🇭',
    role: 'REGIONAL OFFICE',
    roleColor: 'from-rose-500 to-pink-500',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    glowColor: 'hover:shadow-rose-900/40',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-800/40',
    address:
      '#1911–1912, 19th Floor, The Peak Offices (Shangri-La Hotel Tower), 06 Samdech Hun Sen Street, Phnom Penh 120101, Cambodia',
    phone: null,
    mapUrl:
      'https://www.google.com/maps?q=The+Peak+Offices,+Phnom+Penh,+Cambodia',
  },
  {
    country: 'India',
    flag: '🇮🇳',
    role: 'REGIONAL OFFICE',
    roleColor: 'from-orange-500 to-yellow-500',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    glowColor: 'hover:shadow-orange-900/40',
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-800/40',
    address: '105, Sagar Complex, Pitampura, New Delhi 110034, India',
    phone: '+91 98713 3044',
    mapUrl:
      'https://www.google.com/maps?q=105+Sagar+Complex,+Pitampura,+New+Delhi+110034',
  },
  {
    country: 'Nepal',
    flag: '🇳🇵',
    role: 'REGIONAL OFFICE',
    roleColor: 'from-sky-500 to-blue-500',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    glowColor: 'hover:shadow-sky-900/40',
    accentColor: 'text-sky-400',
    borderColor: 'border-sky-800/40',
    address: '24, Birgunj 44300, Nepal',
    phone: null,
    mapUrl: 'https://www.google.com/maps?q=Birgunj+44300,+Nepal',
  },
];

const inquiryTypes = [
  'General Inquiry',
  'Product Information',
  'Dealer / Distribution Partnership',
  'Technical Support',
  'Bulk / OEM Order',
  'Warranty & Service',
  'Media & Press',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [activeOffice, setActiveOffice] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const headOffice = offices[0];
  const activeOff = offices[activeOffice];

  return (
    <div className="min-h-screen bg-[#080711] text-[#edeaf8]">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono mb-6">
            <Globe className="w-3.5 h-3.5" />
            Global Presence · 6 Countries
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Get in </span>
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you're a distributor, clinic, or individual — our global
            team is ready to assist. Reach us at any of our regional offices.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { label: 'Countries', value: '6' },
              { label: 'Offices', value: '6' },
              { label: 'Head Office', value: 'Canada 🇨🇦' },
            ].map((s) => (
              <div
                key={s.label}
                className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Office Cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offices.map((office, idx) => (
            <div
              key={office.country}
              onClick={() => setActiveOffice(idx)}
              className={`relative group cursor-pointer rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl ${office.borderColor} ${office.glowColor} bg-white/[0.02] hover:bg-white/[0.04] ${
                activeOffice === idx ? 'ring-1 ring-white/10 bg-white/[0.04]' : ''
              }`}
            >
              {/* Role badge */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${office.badgeColor}`}
                >
                  {office.role}
                </span>
                <span className="text-2xl">{office.flag}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                {office.country}
              </h3>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-2.5 text-slate-400">
                  <MapPin
                    className={`w-4 h-4 ${office.accentColor} flex-shrink-0 mt-0.5`}
                  />
                  <span className="leading-relaxed">{office.address}</span>
                </div>

                {office.phone ? (
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Phone className={`w-4 h-4 ${office.accentColor} flex-shrink-0`} />
                    <a
                      href={`tel:${office.phone.split('/')[0].trim()}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-white transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 text-slate-500 text-xs italic">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>Contact via form</span>
                  </div>
                )}
              </div>

              {/* Map link */}
              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-1.5 mt-4 text-xs font-medium ${office.accentColor} hover:opacity-80 transition-opacity`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on Map
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Map + Form ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Map Embed Panel */}
          <div className="sticky top-24">
            <div className="rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02]">
              {/* Map header */}
              <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{activeOff.flag}</span>
                    <span className="font-semibold text-white">{activeOff.country}</span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${activeOff.badgeColor}`}
                    >
                      {activeOff.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {activeOff.address}
                  </p>
                </div>
              </div>

              {/* Google Maps iframe */}
              <div className="relative w-full h-[380px] bg-[#0d0b1e]">
                <iframe
                  key={activeOffice}
                  title={`${activeOff.country} office map`}
                  className="absolute inset-0 w-full h-full"
                  style={{ filter: 'invert(90%) hue-rotate(200deg) saturate(0.8) brightness(0.85)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeOff.address)}&output=embed&z=15`}
                  allowFullScreen
                />
              </div>

              {/* Office selector tabs */}
              <div className="flex gap-1 flex-wrap p-3 border-t border-white/8">
                {offices.map((o, i) => (
                  <button
                    key={o.country}
                    onClick={() => setActiveOffice(i)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeOffice === i
                        ? 'bg-violet-500/20 text-violet-200 border border-violet-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {o.flag} {o.country}
                  </button>
                ))}
              </div>
            </div>

            {/* Head office quick info */}
            <div className="mt-4 p-4 rounded-2xl bg-violet-950/30 border border-violet-800/30">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-violet-300">
                  Head Office — Canada
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <a href="tel:+15199986325" className="hover:text-white transition-colors">
                    +1 519-998-6325
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <span className="text-xs leading-relaxed">Kitchener, ON, Canada</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1.5">
                    Send us a message
                  </h2>
                  <p className="text-sm text-slate-400">
                    We'll get back to you within 1–2 business days from our
                    nearest regional office.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      focused={focusedField === 'name'}
                      required
                    />
                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      focused={focusedField === 'email'}
                      required
                    />
                  </div>

                  {/* Phone + Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Phone (optional)"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      focused={focusedField === 'phone'}
                    />
                    <FormField
                      label="Country"
                      name="country"
                      type="text"
                      placeholder="Your country"
                      value={formData.country}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('country')}
                      onBlur={() => setFocusedField(null)}
                      focused={focusedField === 'country'}
                      required
                    />
                  </div>

                  {/* Inquiry type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Inquiry Type <span className="text-violet-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('inquiryType')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full appearance-none bg-[#0e0c1e] text-sm text-slate-200 px-4 py-3 rounded-xl border outline-none transition-all pr-10
                          ${focusedField === 'inquiryType' ? 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]' : 'border-white/10 hover:border-white/20'}
                        `}
                      >
                        <option value="" disabled className="text-slate-500">
                          Select inquiry type
                        </option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t} className="bg-[#0e0c1e]">
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message <span className="text-violet-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      placeholder="Tell us about your inquiry, product interest, or partnership opportunity..."
                      className={`w-full resize-none bg-[#0e0c1e] text-sm text-slate-200 placeholder-slate-600 px-4 py-3 rounded-xl border outline-none transition-all
                        ${focusedField === 'message' ? 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]' : 'border-white/10 hover:border-white/20'}
                      `}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-sm text-[#090715] bg-gradient-to-r from-violet-200 via-indigo-100 to-white hover:from-white hover:to-violet-100 shadow-[0_0_20px_-3px_rgba(199,187,255,0.4)] hover:shadow-[0_0_25px_-1px_rgba(199,187,255,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                  Thank you for reaching out. Our team will respond within 1–2
                  business days from the nearest Kingston regional office.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      country: '',
                      inquiryType: '',
                      message: '',
                    });
                  }}
                  className="mt-2 px-5 py-2.5 text-sm font-medium text-violet-300 border border-violet-500/30 rounded-xl hover:bg-violet-500/10 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* Reusable form field */
function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
  required,
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-300 mb-1.5">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-[#0e0c1e] text-sm text-slate-200 placeholder-slate-600 px-4 py-3 rounded-xl border outline-none transition-all
          ${focused ? 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]' : 'border-white/10 hover:border-white/20'}
        `}
      />
    </div>
  );
}
