import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918600874016"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Dr. Khushwaha's dental clinic"
      className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-50 flex items-center group cursor-pointer"
    >
      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/45 shadow-glass text-xs font-semibold text-primary transition-all duration-300 opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
        Chat with us
      </div>

      {/* Pulsating Ring */}
      <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />

      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-premium-lg transition-transform duration-300 group-hover:scale-110">
        <MessageCircle className="w-7 h-7 fill-white" />
      </div>
    </a>
  );
}
