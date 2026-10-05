import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProductShowcase from '../components/home/ProductShowcase';
import TechnologySection from '../components/home/TechnologySection';
import HealthToolsSuite from '../components/home/HealthToolsSuite';
import WhyKingstonSection from '../components/home/WhyKingstonSection';
import DealerLocatorSection from '../components/home/DealerLocatorSection';
import CatalogueBanner from '../components/home/CatalogueBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080711] text-[#edeaf8] selection:bg-violet-500/30">
      <HeroSection />
      <ProductShowcase />
      <TechnologySection />
      <HealthToolsSuite />
      <WhyKingstonSection />
      {/* <DealerLocatorSection />
      <CatalogueBanner /> */}
    </div>
  );
}
