import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, MessageCircle, Star, Check } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ onViewFullDetails }) => {
  const { selectedProductForModal, setSelectedProductForModal } = useProducts();
  const { addToCart, setIsCheckoutOpen, setDirectCheckoutItem } = useCart();

  const product = selectedProductForModal;

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
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setSelectedProductForModal(null);
  };

  const handleWhatsAppOrder = () => {
    setDirectCheckoutItem({
      product,
      selectedColor,
      selectedSize,
      quantity,
      total: product.price * quantity
    });
    setSelectedProductForModal(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#2C2A29] shadow transition-colors"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Product Images */}
        <div className="md:w-1/2 bg-[#F3EFEA] p-6 flex flex-col justify-between">
          <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-white shadow-inner mb-4">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 rounded overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-[#6B705C] scale-105' : 'border-transparent opacity-70'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-widest text-[#8A8580]">{product.category}</span>
              <span className="text-xs font-mono text-[#6B705C] bg-[#F3EFEA] px-2 py-0.5 rounded">Code: {product.productCode}</span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#2C2A29] mb-2">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-[#C5A880]" : ""} />
                ))}
              </div>
              <span className="text-xs text-[#8A8580]">({product.reviewsCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-[#2C2A29]">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-sm text-[#8A8580] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              {product.discount > 0 && (
                <span className="text-xs bg-[#6B705C] text-white px-2 py-0.5 rounded font-semibold">{product.discount}% OFF</span>
              )}
            </div>

            <p className="text-sm text-[#6B6560] mb-6 line-clamp-3">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-2">
                  Color: <span className="text-[#6B705C] font-medium">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === c.name ? 'border-[#6B705C] ring-2 ring-[#6B705C]/30 scale-110' : 'border-gray-300'}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && <Check size={14} className={c.hex === '#F9F6F0' || c.hex === '#F3EFEA' ? 'text-black' : 'text-white'} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-2">
                  Size / Fit: <span className="text-[#6B705C] font-medium">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded border transition-all ${selectedSize === s ? 'bg-[#6B705C] text-white border-[#6B705C]' : 'bg-white text-[#2C2A29] border-[#EBE5DD] hover:border-[#6B705C]'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-2">Quantity</label>
              <div className="inline-flex items-center border border-[#EBE5DD] rounded bg-[#F9F6F0]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-[#2C2A29] hover:bg-[#EBE5DD] transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-[#2C2A29] hover:bg-[#EBE5DD] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#EBE5DD]">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#2C2A29] hover:bg-[#3D3A39] text-white py-3 px-4 rounded text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow"
              >
                <ShoppingBag size={16} /> Add to Bag
              </button>
              <button
                onClick={() => {
                  setSelectedProductForModal(null);
                  onViewFullDetails(product);
                }}
                className="px-4 py-3 border border-[#6B705C] text-[#6B705C] hover:bg-[#6B705C] hover:text-white rounded text-xs font-semibold tracking-wider transition-colors"
              >
                Full Details
              </button>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageCircle size={18} /> Order on WhatsApp Instantly
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
