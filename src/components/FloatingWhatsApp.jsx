import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const handleWhatsAppChat = () => {
    const url = "https://wa.me/919876543210?text=Hello%20NUVAYA,%20I%20would%20like%20to%20know%20more%20about%20your%20modest%20fashion%20collection.";
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppChat}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="fill-white" />
      <span className="absolute right-full mr-3 bg-[#2C2A29] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with Stylist on WhatsApp
      </span>
    </button>
  );
};
