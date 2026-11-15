import React from 'react';
import { MessageCircle, Globe, Share2, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer = ({ setCurrentView }) => {
  return (
    <footer className="bg-[#2C2A29] text-[#F9F6F0] pt-16 pb-12 border-t border-[#3D3A39]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3D3A39]">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl tracking-[0.2em] font-bold text-white">NUVAYA</h2>
            <p className="text-xs text-[#A5A58D] tracking-widest uppercase">Elegance in Every Layer.</p>
            <p className="text-xs text-[#EBE5DD]/80 leading-relaxed">
              India's premier luxury modest fashion house, crafting exquisite hijabs, abayas, and contemporary modest wear for the graceful modern woman.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#3D3A39] flex items-center justify-center hover:bg-[#6B705C] transition-colors text-[#F9F6F0]" title="Instagram">
                <Globe size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#3D3A39] flex items-center justify-center hover:bg-[#6B705C] transition-colors text-[#F9F6F0]" title="Facebook">
                <Share2 size={18} />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#20ba5a] transition-colors text-white" title="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C5A880]">Collections</h3>
            <ul className="space-y-2.5 text-xs text-[#EBE5DD]/80">
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">All Products</button></li>
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Premium Hijabs</button></li>
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Chiffon & Jersey Hijabs</button></li>
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Open & Everyday Abayas</button></li>
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Scarves & Accessories</button></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C5A880]">Customer Care</h3>
            <ul className="space-y-2.5 text-xs text-[#EBE5DD]/80">
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#6B705C]" /> 100% Quality Assured</li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery Policy</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Exchange & Return Policy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Fabric Care Guide</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">WhatsApp Order Support</a></li>
            </ul>
          </div>

          {/* Contact & Store Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C5A880]">Contact Us</h3>
            <ul className="space-y-3 text-xs text-[#EBE5DD]/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>Banjara Hills, Road No. 12, Hyderabad, Telangana 500034, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#C5A880] flex-shrink-0" />
                <span>+91 98765 43210 (WhatsApp Business)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#C5A880] flex-shrink-0" />
                <span>support@nuvaya.co.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A5A58D]">
          <p>© {new Date().getFullYear()} NUVAYA (nuvaya.co.in). All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <Heart size={12} className="text-[#C5A880] fill-[#C5A880]" /> for Modern Modest Fashion
          </p>
        </div>

      </div>
    </footer>
  );
};
