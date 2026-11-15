import React from 'react';
import { Sparkles, Truck } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-[#2C2A29] text-[#F9F6F0] text-xs md:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
      <span className="flex items-center gap-1.5 text-[#C5A880]">
        <Sparkles size={14} /> Complimentary Shipping Across India on Orders Above ₹1,499
      </span>
      <span className="hidden md:inline-block text-[#A5A58D]">|</span>
      <span className="hidden md:flex items-center gap-1.5">
        <Truck size={14} /> Express WhatsApp Ordering Available
      </span>
    </div>
  );
};
