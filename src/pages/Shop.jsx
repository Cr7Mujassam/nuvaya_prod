import React from 'react';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const Shop = ({ onViewDetails }) => {
  const { 
    filteredProducts, 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange, 
    sortBy, 
    setSortBy,
    searchQuery,
    setSearchQuery 
  } = useProducts();

  const categories = [
    "All",
    "Premium Hijabs",
    "Everyday Hijabs",
    "Chiffon Hijabs",
    "Jersey Hijabs",
    "Modal Hijabs",
    "Premium Abayas",
    "Everyday Abayas",
    "Open Abayas",
    "Scarves and Accessories"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Breadcrumb & Title */}
      <div className="mb-8 border-b border-[#EBE5DD] pb-6">
        <div className="text-xs text-[#8A8580] uppercase tracking-widest mb-1">
          Collection / <span className="text-[#6B705C] font-semibold">{selectedCategory}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2A29]">
          {selectedCategory === 'All' ? 'Complete Luxury Collection' : selectedCategory}
        </h1>
        <p className="text-xs text-[#6B6560] mt-1">
          Showing {filteredProducts.length} handcrafted modest fashion pieces
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Filter Sidebar */}
        <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
          
          {/* Categories Filter */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DD] shadow-2xs">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#2C2A29] mb-4 pb-2 border-b border-[#F3EFEA]">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between ${selectedCategory === cat ? 'bg-[#6B705C] text-white font-semibold' : 'text-[#6B6560] hover:bg-[#F3EFEA] hover:text-[#2C2A29]'}`}
                  >
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DD] shadow-2xs">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#2C2A29] mb-4 pb-2 border-b border-[#F3EFEA]">
              Max Price: ₹{priceRange.toLocaleString('en-IN')}
            </h3>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="200"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#6B705C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8A8580] mt-2">
              <span>₹500</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* Search filter in sidebar */}
          <div className="bg-white p-6 rounded-xl border border-[#EBE5DD] shadow-2xs">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#2C2A29] mb-4 pb-2 border-b border-[#F3EFEA]">
              Search Catalog
            </h3>
            <div className="relative">
              <input 
                type="text"
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
              />
              <Search size={14} className="absolute left-2.5 top-3 text-[#8A8580]" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-3 text-[#8A8580] hover:text-[#2C2A29]">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

        </aside>

        {/* Main Product Grid Area */}
        <main className="flex-1 space-y-6">
          
          {/* Sorting Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#EBE5DD] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-[#8A8580]">
              <SlidersHorizontal size={16} className="text-[#6B705C]" />
              <span>Filters active: <strong className="text-[#2C2A29]">{selectedCategory}</strong></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2C2A29] whitespace-nowrap">Sort By:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F9F6F0] border border-[#EBE5DD] text-xs py-2 px-3 rounded text-[#2C2A29] focus:outline-none focus:border-[#6B705C]"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-16 rounded-xl border border-[#EBE5DD] text-center space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#2C2A29]">No luxury items found</h3>
              <p className="text-xs text-[#8A8580]">Try adjusting your search criteria, price filter, or category selection.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceRange(10000); }}
                className="bg-[#6B705C] text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#58654E] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
              ))}
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
