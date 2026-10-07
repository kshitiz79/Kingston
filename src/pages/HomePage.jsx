import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BannerCarousel from '../components/home/BannerCarousel';
import WhereToBuyBanner from '../components/home/WhereToBuyBanner';
import ProductShowcase from '../components/home/ProductShowcase';
import TechnologySection from '../components/home/TechnologySection';
import HealthToolsSuite from '../components/home/HealthToolsSuite';
import WhyKingstonSection from '../components/home/WhyKingstonSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080711] text-[#edeaf8] selection:bg-violet-500/30">
      <HeroSection />
      <WhereToBuyBanner />
      <BannerCarousel />
      <ProductShowcase />
      <TechnologySection />
      <HealthToolsSuite />
      <WhyKingstonSection />
    </div>
  );
}
