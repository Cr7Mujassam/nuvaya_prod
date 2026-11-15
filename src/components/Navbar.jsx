import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

export const Navbar = ({ currentView, setCurrentView }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery, setSelectedCategory, setSortBy } = useProducts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (view, category = 'All', sort = 'featured') => {
    setCurrentView(view);
    setSelectedCategory(category);
    setSortBy(sort);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#EBE5DD] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#2C2A29] hover:text-[#6B705C] transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 ml-1 text-[#2C2A29] hover:text-[#6B705C] transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 cursor-pointer text-center" onClick={() => handleNavClick('home')}>
            <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-[#2C2A29] font-bold">
              NUVAYA
            </h1>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B705C] -mt-1 font-medium">
              Elegance in Every Layer
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wider text-[#2C2A29]">
            <button 
              onClick={() => handleNavClick('home')} 
              className={`hover:text-[#6B705C] transition-colors py-2 border-b-2 ${currentView === 'home' ? 'border-[#6B705C]' : 'border-transparent'}`}
            >
              HOME
            </button>
            <button 
              onClick={() => handleNavClick('shop', 'All')} 
              className={`hover:text-[#6B705C] transition-colors py-2 border-b-2 ${currentView === 'shop' && currentView !== 'wishlist' && currentView !== 'admin' ? 'border-[#6B705C]' : 'border-transparent'}`}
            >
              COLLECTION
            </button>
            <button 
              onClick={() => handleNavClick('shop', 'Chiffon Hijabs')} 
              className="hover:text-[#6B705C] transition-colors py-2 border-b-2 border-transparent"
            >
              HIJABS
            </button>
            <button 
              onClick={() => handleNavClick('shop', 'Open Abayas')} 
              className="hover:text-[#6B705C] transition-colors py-2 border-b-2 border-transparent"
            >
              ABAYAS
            </button>
            <button 
              onClick={() => handleNavClick('shop', 'Scarves and Accessories')} 
              className="hover:text-[#6B705C] transition-colors py-2 border-b-2 border-transparent"
            >
              SCARVES
            </button>
            <button 
              onClick={() => handleNavClick('shop', 'All', 'newest')} 
              className="hover:text-[#6B705C] transition-colors py-2 border-b-2 border-transparent text-[#C5A880] font-semibold"
            >
              NEW ARRIVALS
            </button>
            <button 
              onClick={() => handleNavClick('admin')} 
              className={`flex items-center gap-1 hover:text-[#6B705C] transition-colors py-2 border-b-2 ${currentView === 'admin' ? 'border-[#6B705C]' : 'border-transparent'}`}
            >
              <ShieldCheck size={16} /> ADMIN
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search luxury modest wear..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'shop') setCurrentView('shop');
                }}
                className="w-48 lg:w-64 pl-9 pr-4 py-1.5 text-xs bg-[#F3EFEA] border border-[#EBE5DD] rounded-full focus:outline-none focus:border-[#6B705C] transition-all text-[#2C2A29] placeholder-[#8A8580]"
              />
              <Search size={16} className="absolute left-3 text-[#8A8580]" />
            </div>

            {/* Wishlist Button */}
            <button 
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2 text-[#2C2A29] hover:text-[#6B705C] transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={22} className={wishlist.length > 0 ? "fill-[#6B705C] text-[#6B705C]" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#6B705C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#2C2A29] hover:text-[#6B705C] transition-colors flex items-center gap-1.5"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={22} />
              <span className="hidden sm:inline text-xs font-semibold tracking-wider">BAG</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 sm:top-0 right-0 sm:right-1 w-5 h-5 bg-[#C5A880] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Mobile Search Input */}
        {isSearchOpen && (
          <div className="md:hidden py-3 px-2 border-t border-[#EBE5DD] animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search hijabs, abayas..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'shop') setCurrentView('shop');
                }}
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#F3EFEA] border border-[#EBE5DD] rounded-lg focus:outline-none focus:border-[#6B705C]"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-[#8A8580]" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F9F6F0] border-b border-[#EBE5DD] px-6 py-6 space-y-4 animate-fade-in shadow-lg">
          <button 
            onClick={() => handleNavClick('home')}
            className="block w-full text-left font-serif text-lg py-2 border-b border-[#EBE5DD] text-[#2C2A29]"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('shop', 'All')}
            className="block w-full text-left font-serif text-lg py-2 border-b border-[#EBE5DD] text-[#2C2A29]"
          >
            All Collections
          </button>
          <button 
            onClick={() => handleNavClick('shop', 'Chiffon Hijabs')}
            className="block w-full text-left font-serif text-lg py-2 border-b border-[#EBE5DD] text-[#2C2A29]"
          >
            Chiffon & Premium Hijabs
          </button>
          <button 
            onClick={() => handleNavClick('shop', 'Open Abayas')}
            className="block w-full text-left font-serif text-lg py-2 border-b border-[#EBE5DD] text-[#2C2A29]"
          >
            Open & Everyday Abayas
          </button>
          <button 
            onClick={() => handleNavClick('shop', 'Scarves and Accessories')}
            className="block w-full text-left font-serif text-lg py-2 border-b border-[#EBE5DD] text-[#2C2A29]"
          >
            Scarves & Accessories
          </button>
          <button 
            onClick={() => handleNavClick('shop', 'All', 'newest')}
            className="block w-full text-left font-serif text-lg py-2 border-b border-[#EBE5DD] text-[#C5A880] font-semibold"
          >
            New Arrivals
          </button>
          <button 
            onClick={() => handleNavClick('admin')}
            className="flex items-center gap-2 w-full text-left font-serif text-lg py-2 text-[#6B705C]"
          >
            <ShieldCheck size={20} /> Admin Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
