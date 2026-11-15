import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Star, Check, ShieldCheck, Truck, RotateCcw, Heart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetail = ({ product, setCurrentView, onViewDetails }) => {
  const { addToCart, setIsCheckoutOpen, setDirectCheckoutItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors[0] ? product.colors[0].name : '');
      setSelectedSize(product.sizes && product.sizes[0] ? product.sizes[0] : '');
      setQuantity(1);
      setActiveImageIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Product not found</h2>
        <button onClick={() => setCurrentView('shop')} className="bg-[#6B705C] text-white px-6 py-2 rounded text-xs font-bold uppercase">
          Back to Collection
        </button>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleWhatsAppOrder = () => {
    setDirectCheckoutItem({
      product,
      selectedColor,
      selectedSize,
      quantity,
      total: product.price * quantity
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Back button */}
      <button 
        onClick={() => setCurrentView('shop')}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B705C] hover:text-[#2C2A29] mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-[#F3EFEA] rounded-xl overflow-hidden border border-[#EBE5DD] shadow-md relative">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#6B705C] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-[#6B705C] scale-105' : 'border-[#EBE5DD] opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Variant Selectors */}
        <div className="space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-[#8A8580]">{product.category}</span>
              <span className="text-xs font-mono text-[#6B705C] bg-[#F3EFEA] px-2.5 py-1 rounded font-semibold">Code: {product.productCode}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2A29] mb-3">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-[#C5A880]" : ""} />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#2C2A29]">{product.rating}</span>
              <span className="text-xs text-[#8A8580]">({product.reviewsCount} verified customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[#2C2A29]">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-base text-[#8A8580] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="text-sm text-[#6B6560] leading-relaxed mb-6">{product.description}</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-[#EBE5DD]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29]">
                Select Color: <span className="text-[#6B705C] font-bold">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === c.name ? 'border-[#6B705C] ring-2 ring-[#6B705C]/30 scale-110' : 'border-gray-300'}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && <Check size={16} className={c.hex === '#F9F6F0' || c.hex === '#F3EFEA' ? 'text-black' : 'text-white'} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-[#EBE5DD]">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29]">
                  Select Size / Fit: <span className="text-[#6B705C] font-bold">{selectedSize}</span>
                </label>
                <a href="#sizechart" className="text-[11px] text-[#6B705C] underline hover:text-[#2C2A29]">Size Guide</a>
              </div>
              <div className="flex gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-5 py-2 text-xs font-semibold rounded border transition-all ${selectedSize === s ? 'bg-[#6B705C] text-white border-[#6B705C] shadow' : 'bg-white text-[#2C2A29] border-[#EBE5DD] hover:border-[#6B705C]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2 pt-4 border-t border-[#EBE5DD]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29]">Quantity</label>
            <div className="inline-flex items-center border border-[#EBE5DD] rounded bg-[#F9F6F0]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-sm text-[#2C2A29] hover:bg-[#EBE5DD] transition-colors"
              >
                -
              </button>
              <span className="px-6 py-2 text-sm font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-sm text-[#2C2A29] hover:bg-[#EBE5DD] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions: Add to Cart & WhatsApp Order & Wishlist */}
          <div className="space-y-3 pt-6 border-t border-[#EBE5DD]">
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#2C2A29] hover:bg-[#3D3A39] text-white py-4 px-6 rounded text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded border transition-colors flex items-center justify-center ${isWishlisted ? 'bg-[#6B705C] text-white border-[#6B705C]' : 'bg-white text-[#2C2A29] border-[#EBE5DD] hover:border-[#6B705C]'}`}
                title="Save to Wishlist"
              >
                <Heart size={20} className={isWishlisted ? "fill-white" : ""} />
              </button>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-colors shadow-xl"
            >
              <MessageCircle size={22} /> Order on WhatsApp Instantly
            </button>
          </div>

          {/* Product Specifications & Care Instructions Accordion / Cards */}
          <div className="space-y-4 pt-6 border-t border-[#EBE5DD] text-xs text-[#6B6560]">
            <div className="bg-[#F3EFEA] p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-[#2C2A29] uppercase tracking-wider">Fabric & Craftsmanship</h4>
              <p><strong className="text-[#2C2A29]">Material:</strong> {product.fabric}</p>
              <p><strong className="text-[#2C2A29]">Stock Status:</strong> <span className="text-emerald-700 font-semibold">In Stock & Ready to Dispatch</span></p>
            </div>

            <div className="bg-[#F3EFEA] p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-[#2C2A29] uppercase tracking-wider">Washing & Care Instructions</h4>
              <p>{product.washingInstructions}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center">
              <div className="space-y-1">
                <ShieldCheck size={20} className="mx-auto text-[#6B705C]" />
                <span className="font-semibold text-[#2C2A29] block">100% Authentic</span>
              </div>
              <div className="space-y-1">
                <Truck size={20} className="mx-auto text-[#6B705C]" />
                <span className="font-semibold text-[#2C2A29] block">Free Shipping over ₹1,499</span>
              </div>
              <div className="space-y-1">
                <RotateCcw size={20} className="mx-auto text-[#6B705C]" />
                <span className="font-semibold text-[#2C2A29] block">Easy Exchanges</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
