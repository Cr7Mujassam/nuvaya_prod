import React, { useState } from 'react';
import { X, MessageCircle, ShieldCheck, MapPin, Phone, User, Home, Building, Navigation } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const WhatsAppCheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    directCheckoutItem, 
    subtotal, 
    shippingFee, 
    finalTotal,
    clearCart 
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    notes: ''
  });

  const [error, setError] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleWhatsAppCheckoutSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.pinCode.trim()) {
      setError('Please fill in all required delivery and contact details.');
      return;
    }

    // Validate mobile number (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile.trim())) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Determine items to order
    let orderSummaryText = '';
    let totalOrderAmount = 0;

    if (directCheckoutItem) {
      const item = directCheckoutItem;
      const itemTotal = item.product.price * item.quantity;
      totalOrderAmount = itemTotal + (itemTotal >= 1499 ? 0 : 99);
      orderSummaryText = `Product: ${item.product.name}
Product Code: ${item.product.productCode}
Color: ${item.selectedColor || 'Standard'}
Size: ${item.selectedSize || 'Free Size'}
Quantity: ${item.quantity}
Price: ₹${item.product.price}
Total: ₹${itemTotal}`;
    } else {
      totalOrderAmount = finalTotal;
      orderSummaryText = cart.map((item, idx) => `
Item #${idx + 1}:
- Product: ${item.product.name}
- Code: ${item.product.productCode}
- Color: ${item.selectedColor || 'Standard'}
- Size: ${item.selectedSize || 'Free Size'}
- Qty: ${item.quantity}
- Price: ₹${item.product.price * item.quantity}`).join('\n');
    }

    const whatsappNumber = "918863090935"; // Nuvaya WhatsApp Business Number

    const message = `Hello NUVAYA! I would like to place an order.

Order Details:
${orderSummaryText}

Subtotal: ₹${directCheckoutItem ? (directCheckoutItem.product.price * directCheckoutItem.quantity) : subtotal}
Shipping: ₹${directCheckoutItem ? ((directCheckoutItem.product.price * directCheckoutItem.quantity) >= 1499 ? 0 : 99) : shippingFee}
Total Amount: ₹${totalOrderAmount}

Customer Details:
Name: ${formData.fullName.trim()}
Mobile: ${formData.mobile.trim()}
Address: ${formData.address.trim()}
City: ${formData.city.trim()}
State: ${formData.state.trim()}
PIN Code: ${formData.pinCode.trim()}
${formData.notes.trim() ? `Additional Instructions: ${formData.notes.trim()}` : ''}

Please confirm my order and share payment/delivery steps.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Clear cart if ordered from cart
    if (!directCheckoutItem) {
      clearCart();
    }

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#2C2A29] text-[#F9F6F0] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <MessageCircle size={22} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold">WhatsApp Business Checkout</h2>
              <p className="text-xs text-[#C5A880]">Complete your details to generate your instant order message</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleWhatsAppCheckoutSubmit} className="p-6 sm:p-8 space-y-6">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="e.g., Ayesha Siddiqui"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                  required
                />
                <User size={16} className="absolute left-3 top-2.5 text-[#8A8580]" />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Mobile Number (10 digits) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="tel" 
                  name="mobile"
                  placeholder="e.g., 9876543210"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                  required
                />
                <Phone size={16} className="absolute left-3 top-2.5 text-[#8A8580]" />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
              Complete Delivery Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea 
                name="address"
                rows="2"
                placeholder="Flat/House No., Building Name, Street, Landmark"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2 text-sm bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                required
              />
              <Home size={16} className="absolute left-3 top-3 text-[#8A8580]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="city"
                  placeholder="e.g., Hyderabad"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                  required
                />
                <Building size={16} className="absolute left-3 top-2.5 text-[#8A8580]" />
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="state"
                  placeholder="e.g., Telangana"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                  required
                />
                <MapPin size={16} className="absolute left-3 top-2.5 text-[#8A8580]" />
              </div>
            </div>

            {/* PIN Code */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                PIN Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="pinCode"
                  placeholder="e.g., 500034"
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                  required
                />
                <Navigation size={16} className="absolute left-3 top-2.5 text-[#8A8580]" />
              </div>
            </div>
          </div>

          {/* Additional Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
              Additional Instructions (Optional)
            </label>
            <input 
              type="text" 
              name="notes"
              placeholder="e.g., Ring doorbell upon delivery, gift wrap please"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
            />
          </div>

          {/* Order Summary Box */}
          <div className="bg-[#F3EFEA] p-4 rounded-lg border border-[#EBE5DD] space-y-2 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-[#2C2A29]">Order Summary</h4>
            {directCheckoutItem ? (
              <div className="flex justify-between">
                <span>{directCheckoutItem.product.name} ({directCheckoutItem.selectedColor}, {directCheckoutItem.selectedSize}) x {directCheckoutItem.quantity}</span>
                <span className="font-bold">₹{(directCheckoutItem.product.price * directCheckoutItem.quantity).toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <div className="space-y-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[#6B6560]">
                    <span>{item.product.name} ({item.selectedColor}, {item.selectedSize}) x {item.quantity}</span>
                    <span>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-[#EBE5DD] font-bold text-sm text-[#2C2A29]">
              <span>Total Payable Amount</span>
              <span className="text-[#6B705C]">
                ₹{directCheckoutItem ? ((directCheckoutItem.product.price * directCheckoutItem.quantity) + ((directCheckoutItem.product.price * directCheckoutItem.quantity) >= 1499 ? 0 : 99)).toLocaleString('en-IN') : finalTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded-lg text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={22} /> Send Order to WhatsApp Now
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#8A8580]">
              <ShieldCheck size={14} className="text-[#6B705C]" />
              <span>Clicking will instantly open WhatsApp with your pre-formatted order message.</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
