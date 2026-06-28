import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Calendar } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Dynamic active link highlighting based on scroll position
      const sections = ['home', 'about', 'services', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Doctor', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Hours & Location', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-glass-sm' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary to-accent-teal flex items-center justify-center shadow-glass transition-transform duration-300 group-hover:scale-105">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-sans tracking-wide text-primary">
              Medi-<span className="text-secondary">Tooth</span>
            </span>
            <span className="text-[10px] text-primary/60 uppercase tracking-widest -mt-1 font-semibold">
              Dental Clinic
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 ${
                    activeSection === item.id 
                      ? 'text-secondary' 
                      : 'text-primary/75 hover:text-secondary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Book CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#booking"
            onClick={(e) => handleLinkClick(e, 'booking')}
            aria-label="Book a dental consultation appointment"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-glass hover:shadow-accent-glow hover:-translate-y-[1px] min-h-[44px]"
          >
            <Calendar className="w-4.5 h-4.5" />
            Book Appointment
          </a>
        </div>

        {/* Hamburger Menu Trigger */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-primary/5 hover:bg-primary/10 text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/30"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer with full-screen frosted glass overlay */}
      <div 
        className={`fixed inset-0 top-[76px] bg-primary/85 backdrop-blur-2xl z-45 md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full pb-24 px-8">
          <ul className="flex flex-col items-center gap-4 text-center w-full">
            {menuItems.map((item, index) => (
              <li 
                key={item.id}
                className={`w-full transition-all duration-500 delay-[${index * 75}ms] ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-label={`Navigate to ${item.label} section`}
                  className={`text-xl font-semibold tracking-wide flex items-center justify-center min-h-[48px] py-3.5 w-full rounded-xl transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-accent-gold bg-white/5 shadow-glass-sm' 
                      : 'text-white/85 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 w-full max-w-xs">
            <a
              href="#booking"
              onClick={(e) => handleLinkClick(e, 'booking')}
              aria-label="Book a dental consultation appointment via mobile drawer"
              className="flex items-center justify-center gap-2 w-full min-h-[50px] py-4 rounded-2xl text-sm font-semibold tracking-wide text-primary bg-gradient-to-r from-accent-gold to-accent-gold-light hover:scale-[1.02] transition-transform duration-300 shadow-premium"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
