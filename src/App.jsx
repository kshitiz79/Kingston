import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import WhereToBuyPage from './pages/WhereToBuyPage';
import AboutPage from './pages/AboutPage';
import HealthToolsPage from './pages/HealthToolsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#080711] text-[#edeaf8]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/where-to-buy" element={<WhereToBuyPage />} />
            <Route path="/buy" element={<WhereToBuyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/health-tools" element={<HealthToolsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
