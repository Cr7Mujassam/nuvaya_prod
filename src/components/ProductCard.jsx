import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

export const ProductCard = ({ product, onViewDetails }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setSelectedProductForModal } = useProducts();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden border border-[#EBE5DD] transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image & Badges Container */}
      <div className="relative aspect-[3/4] bg-[#F3EFEA] overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img 
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#6B705C] text-[#F9F6F0] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
            {product.discount}% OFF
          </span>
        )}

        {/* New Arrival Badge */}
        {product.isNewArrival && !product.discount && (
          <span className="absolute top-3 left-3 bg-[#C5A880] text-[#F9F6F0] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
            NEW
          </span>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${isWishlisted ? 'bg-[#6B705C] text-white' : 'bg-white/80 text-[#2C2A29] hover:bg-white'}`}
          aria-label="Wishlist"
        >
          <Heart size={18} className={isWishlisted ? "fill-white" : ""} />
        </button>

        {/* Quick View / Details Hover Overlay Buttons */}
        <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            className="flex-1 bg-white/90 hover:bg-white text-[#2C2A29] py-2 px-3 text-xs font-semibold rounded tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow"
          >
            <Eye size={14} /> QUICK VIEW
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="flex-1 bg-[#6B705C] hover:bg-[#58654E] text-white py-2 px-3 text-xs font-semibold rounded tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow"
          >
            <ShoppingBag size={14} /> DETAILS
          </button>
        </div>
      </div>

      {/* Product Meta Information */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="text-[11px] tracking-widest text-[#8A8580] uppercase mb-1">
            {product.category}
          </div>
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-serif text-sm sm:text-base font-semibold text-[#2C2A29] hover:text-[#6B705C] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-[#F3EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#2C2A29]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8A8580] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Swatches Preview */}
          <div className="flex items-center gap-1">
            {product.colors && product.colors.slice(0, 3).map((c, i) => (
              <span 
                key={i} 
                className="w-3 h-3 rounded-full border border-gray-300 shadow-2xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
