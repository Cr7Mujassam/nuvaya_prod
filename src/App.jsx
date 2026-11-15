import React, { useState } from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Wishlist } from './pages/Wishlist';
import { Admin } from './pages/Admin';

export function AppContent() {
  const [currentView, setCurrentView] = useState('home'); // home, shop, detail, wishlist, admin
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] font-sans selection:bg-[#6B705C] selection:text-white">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Luxury Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <Home setCurrentView={setCurrentView} onViewDetails={handleViewDetails} />
        )}
        {currentView === 'shop' && (
          <Shop onViewDetails={handleViewDetails} />
        )}
        {currentView === 'detail' && (
          <ProductDetail product={selectedProduct} setCurrentView={setCurrentView} onViewDetails={handleViewDetails} />
        )}
        {currentView === 'wishlist' && (
          <Wishlist setCurrentView={setCurrentView} onViewDetails={handleViewDetails} />
        )}
        {currentView === 'admin' && (
          <Admin />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Global Modals & Drawers */}
      <ProductModal onViewFullDetails={handleViewDetails} />
      <CartDrawer />
      <WhatsAppCheckoutModal />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
}
