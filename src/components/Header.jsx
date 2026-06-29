import React, { useState, useEffect } from 'react';
import { Shield, Calendar, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
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

  // Motion variants for links stagger reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', damping: 20, stiffness: 150 },
    },
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'z-[9999] bg-transparent border-transparent py-4 shadow-none' 
            : isScrolled 
              ? 'z-50 py-4 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-glass-sm' 
              : 'z-50 py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, 'home')} 
            className={`flex items-center gap-3 group relative transition-all duration-300 ${isMobileMenuOpen ? 'z-[10000]' : 'z-50'}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary to-accent-teal flex items-center justify-center shadow-glass transition-transform duration-300 group-hover:scale-105">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold font-sans tracking-wide transition-colors duration-300 ${isMobileMenuOpen ? 'text-white' : 'text-primary'}`}>
                Medi-<span className="text-secondary">Tooth</span>
              </span>
              <span className={`text-[10px] uppercase tracking-widest -mt-1 font-semibold transition-colors duration-300 ${isMobileMenuOpen ? 'text-white/60' : 'text-primary/60'}`}>
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
              className="group flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-glass hover:shadow-accent-glow hover:-translate-y-[1px] min-h-[44px]"
            >
              <Calendar className="w-4.5 h-4.5" />
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">Book Appointment</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans font-normal">→</span>
            </a>
          </div>

          {/* Animated Custom Hamburger Trigger */}
          <button 
            onClick={toggleMobileMenu}
            className={`md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/30 relative ${isMobileMenuOpen ? 'z-[10000] bg-white/10' : 'bg-primary/5 hover:bg-primary/10'}`}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-6 h-0.5 rounded-full block transition-colors ${isMobileMenuOpen ? 'bg-white' : 'bg-primary'}`}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-6 h-0.5 rounded-full block transition-colors ${isMobileMenuOpen ? 'bg-white' : 'bg-primary'}`}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-6 h-0.5 rounded-full block transition-colors ${isMobileMenuOpen ? 'bg-white' : 'bg-primary'}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Frosted Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9990] md:hidden"
            />

            {/* Right-Aligned Luxury Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 190 }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-[380px] bg-gradient-to-b from-slate-900 to-[#0A1128] border-l border-white/10 shadow-premium z-[9991] md:hidden flex flex-col justify-between p-8 pt-28"
            >
              {/* Menu Links */}
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6 text-left w-full mt-4"
              >
                {menuItems.map((item) => (
                  <motion.li key={item.id} variants={itemVariants}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className={`text-lg font-bold tracking-wide flex items-center min-h-[44px] py-1 w-full transition-all duration-300 ${
                        activeSection === item.id 
                          ? 'text-accent-gold pl-3 border-l-2 border-accent-gold' 
                          : 'text-white/80 hover:text-white hover:pl-3 hover:border-l-2 hover:border-white/30'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Bottom Card Block */}
              <div className="flex flex-col gap-8 w-full mt-auto border-t border-white/10 pt-8">
                {/* Contact Quick-Links */}
                <div className="flex flex-col gap-3.5 text-left text-xs font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block">
                    Contact Quick-Links
                  </span>
                  <a 
                    href="tel:08600874016"
                    className="flex items-center gap-3 text-white/70 hover:text-accent-gold transition-colors py-1"
                  >
                    <Phone className="w-4 h-4 text-accent-gold" />
                    <span>08600 874016</span>
                  </a>
                  <a 
                    href="mailto:MEDITOOTHDENTALCLINIC@GMAIL.COM"
                    className="flex items-center gap-3 text-white/70 hover:text-accent-teal transition-colors py-1 truncate"
                  >
                    <Mail className="w-4 h-4 text-accent-teal" />
                    <span className="truncate">MEDITOOTHDENTALCLINIC@GMAIL.COM</span>
                  </a>
                </div>

                {/* Premium Pulsing/Scaling CTA Button */}
                <motion.a
                  href="#booking"
                  onClick={(e) => handleLinkClick(e, 'booking')}
                  className="w-full py-4 rounded-2xl text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-accent-gold-dark via-primary-light to-accent-teal-dark shadow-premium flex items-center justify-center gap-2.5 min-h-[50px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(212, 175, 55, 0.25)",
                      "0 0 0 12px rgba(212, 175, 55, 0)",
                      "0 0 0 0 rgba(212, 175, 55, 0)"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut"
                  }}
                >
                  <Calendar className="w-4.5 h-4.5 text-accent-gold-light" />
                  <span>Book Appointment</span>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
