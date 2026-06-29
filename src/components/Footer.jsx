import React from 'react';
import { Shield, Phone, MessageSquare, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80;
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-primary text-white overflow-hidden border-t border-white/5">
      
      {/* Decorative subtle glows in footer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-6 flex flex-col items-start text-left">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary to-accent-teal flex items-center justify-center shadow-glass">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold font-sans tracking-wide text-white">
                  Medi-<span className="text-secondary">Tooth</span>
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest -mt-1 font-semibold">
                  Dental Clinic
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans font-light max-w-sm mb-6">
              Providing expert aesthetic and clinical dental solutions in Vasai-Virar, Mumbai. Trust, rigorous sterilization, and state-of-the-art dental procedures shape our daily patient care protocols.
            </p>
            
            {/* Quick Contact & Social Icons */}
            <div className="flex gap-3.5 mt-4">
              <a 
                href="https://wa.me/918600874016" 
                target="_blank" 
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#25D366] hover:scale-110 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/10 shadow-glass"
                aria-label="Chat on WhatsApp with Dr. Khushwaha's dental clinic"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/5 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:scale-110 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/10 shadow-glass"
                aria-label="Follow Dr. Khushwaha's dental clinic on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#1877F2] hover:scale-110 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/10 shadow-glass"
                aria-label="Follow Dr. Khushwaha's dental clinic on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6 font-sans">
              Quick Navigation
            </h4>
            <ul className="space-y-3.5 text-sm font-sans font-light text-white/70">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-secondary transition-colors">
                  Home Page
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-secondary transition-colors">
                  About Doctor
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-secondary transition-colors">
                  Clinical Services
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLinkClick(e, 'reviews')} className="hover:text-secondary transition-colors">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-secondary transition-colors">
                  Hours & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact info summary */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6 font-sans">
              Clinic Contact
            </h4>
            <ul className="space-y-4 text-xs font-sans font-light text-white/75">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  202, Sai Siddhi Apt, Nalasopara East, Maharashtra 401209
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4.5 h-4.5 text-secondary shrink-0" />
                <span>+91 86008 74016</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4.5 h-4.5 text-secondary shrink-0" />
                <span className="truncate">MEDITOOTHDENTALCLINIC@GMAIL.COM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 my-8" />

        {/* Footer Bottom Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans font-light text-white/50 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Dr. Khushwaha's Medi-Tooth Dental Clinic. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
