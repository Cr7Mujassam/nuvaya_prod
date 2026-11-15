import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = ({ setCurrentView, onViewDetails }) => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in min-h-[70vh]">
      
      <div className="mb-8 border-b border-[#EBE5DD] pb-6 flex items-center justify-between">
        <div>
          <div className="text-xs text-[#8A8580] uppercase tracking-widest mb-1">Saved Items</div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2A29]">My Wishlist ({wishlist.length})</h1>
        </div>
        <button 
          onClick={() => setCurrentView('shop')}
          className="text-xs font-bold tracking-widest uppercase text-[#6B705C] hover:text-[#2C2A29] flex items-center gap-1"
        >
          Continue Shopping <ArrowRight size={14} />
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white p-16 rounded-xl border border-[#EBE5DD] text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-[#F3EFEA] rounded-full flex items-center justify-center mx-auto text-[#6B705C]">
            <Heart size={32} />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#2C2A29]">Your wishlist is empty</h3>
          <p className="text-xs text-[#8A8580]">Save your favorite hijabs and abayas by clicking the heart icon on any product card.</p>
          <button 
            onClick={() => setCurrentView('shop')}
            className="bg-[#6B705C] text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#58654E] transition-colors shadow"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}

    </div>
  );
};
