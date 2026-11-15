import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen, 
    setIsCheckoutOpen,
    subtotal, 
    shippingFee, 
    finalTotal,
    totalItemsCount 
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F6F0] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EBE5DD] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#6B705C]" />
              <h2 className="font-serif text-lg font-bold text-[#2C2A29]">Your Shopping Bag ({totalItemsCount})</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#2C2A29] hover:text-[#6B705C] transition-colors rounded-full hover:bg-[#F3EFEA]"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F3EFEA] px-6 py-3 border-b border-[#EBE5DD] text-xs text-[#2C2A29] font-medium">
            {subtotal >= 1499 ? (
              <p className="text-[#6B705C] font-semibold text-center">🎉 You qualify for Free Shipping across India!</p>
            ) : (
              <p className="text-center">Add <span className="font-bold text-[#6B705C]">₹{(1499 - subtotal).toLocaleString('en-IN')}</span> more for <span className="font-bold">Free Shipping</span>!</p>
            )}
            <div className="w-full bg-[#EBE5DD] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#6B705C] h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (subtotal / 1499) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#F3EFEA] rounded-full flex items-center justify-center mx-auto text-[#8A8580]">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2C2A29]">Your bag is empty</h3>
                <p className="text-xs text-[#8A8580] max-w-xs mx-auto">Explore our luxury collection of hijabs, abayas, and accessories to elevate your modest wardrobe.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-[#6B705C] text-white px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-[#58654E] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 p-4 bg-white rounded-lg border border-[#EBE5DD] shadow-2xs relative">
                  <div className="w-20 h-24 bg-[#F3EFEA] rounded overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-semibold text-[#2C2A29] line-clamp-1">{item.product.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#8A8580] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-3 text-[11px] text-[#8A8580] mt-1">
                        {item.selectedColor && <span>Color: <strong className="text-[#2C2A29]">{item.selectedColor}</strong></span>}
                        {item.selectedSize && <span>Size: <strong className="text-[#2C2A29]">{item.selectedSize}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#EBE5DD] rounded bg-[#F9F6F0]">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#2C2A29] hover:bg-[#EBE5DD]"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#2C2A29] hover:bg-[#EBE5DD]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#2C2A29]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EBE5DD] space-y-4">
              <div className="space-y-2 text-xs text-[#6B6560]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C2A29]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#2C2A29]">
                    {shippingFee === 0 ? <span className="text-[#6B705C] font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2C2A29] pt-2 border-t border-[#EBE5DD]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#6B705C]">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <MessageCircle size={18} /> Proceed to WhatsApp Checkout <ArrowRight size={16} />
              </button>
              
              <p className="text-[10px] text-center text-[#8A8580]">
                🔒 Secure WhatsApp Ordering. No upfront payment required.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
