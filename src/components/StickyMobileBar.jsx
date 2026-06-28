import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export default function StickyMobileBar() {
  const handleScrollToBooking = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('booking');
    if (targetElement) {
      const headerHeight = 80;
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/80 backdrop-blur-lg border-t border-primary/10 px-4 py-3 shadow-glass flex items-center justify-between gap-3 animate-fade-in">
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918600874016"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Dr. Khushwaha's dental clinic"
        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-accent-teal hover:bg-accent-teal-dark text-white font-semibold text-xs tracking-wider transition-colors duration-300 shadow-glass"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>WhatsApp</span>
      </a>

      {/* Call Button */}
      <a
        href="tel:08600874016"
        aria-label="Call Dr. Khushwaha's dental clinic at 08600874016"
        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs tracking-wider transition-colors duration-300 shadow-glass"
      >
        <Phone className="w-4 h-4" />
        <span>Call Clinic</span>
      </a>

      {/* Quick Booking Anchor */}
      <a
        href="#booking"
        onClick={handleScrollToBooking}
        aria-label="Scroll to booking appointment form"
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary-light text-white transition-colors duration-300 shadow-glass shrink-0"
      >
        <Calendar className="w-5 h-5" />
      </a>
      
    </div>
  );
}
