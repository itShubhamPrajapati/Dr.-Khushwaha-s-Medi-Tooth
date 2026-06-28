import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Sun, Shield, Layers, X, CalendarCheck, Clock, ShieldAlert, Check } from 'lucide-react';

export default function Services() {
  const [activeService, setActiveService] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const servicesData = [
    {
      id: 1,
      title: 'Aesthetic Dentistry',
      shortDesc: 'Enhance your smile with composite bonding, veneers, smile alignment, and cosmetic reshaping tailored to your facial aesthetics.',
      longDesc: 'Aesthetic Dentistry combines the science of oral health with the artistry of a beautiful smile. Under the expert fellowship training of Dr. Sangya Khushwaha, we analyze your facial features, lip line, and tooth proportions to create a balanced smile makeover.',
      icon: Sparkles,
      color: 'from-accent-gold to-accent-gold-dark',
      bgGlow: 'rgba(212, 175, 55, 0.15)',
      duration: '1 - 3 Sessions',
      guarantee: 'Premium Biocompatible Materials',
      subTreatments: [
        'Porcelain & E-Max Veneers',
        'Composite Bonding & Edge Shaping',
        'Cosmetic Gingival Contouring',
        'Orthodontic Smile Design Aligners'
      ],
      postCare: 'Avoid highly pigmenting foods and beverages (coffee, red wine) for 48 hours following composite applications.'
    },
    {
      id: 2,
      title: 'Root Canals',
      shortDesc: 'Painless root canal therapy (RCT) using digital endodontics to save natural teeth and relieve localized infection quickly.',
      longDesc: 'Our advanced Root Canal treatments prioritize patient comfort and precision. By using rotary digital endodontics and apex locators, we remove infected pulp tissues painlessly, seal the canals, and preserve your natural tooth structure.',
      icon: Activity,
      color: 'from-secondary to-secondary-dark',
      bgGlow: 'rgba(28, 119, 195, 0.15)',
      duration: '1 - 2 Sessions',
      guarantee: 'Painless Micro-endodontics',
      subTreatments: [
        'Single Sitting Root Canals',
        'Re-treatment of failing old RCTs',
        'Digital Apex Localization',
        'Advanced Fiber Post Reinforcements'
      ],
      postCare: 'Avoid biting down on hard foods using the treated tooth until the final protective crown has been fixed.'
    },
    {
      id: 3,
      title: 'Teeth Whitening',
      shortDesc: 'Eliminate stubborn stains and deep discolourations using quick, safe laser whitening technology for immediate brightness.',
      longDesc: 'Restore the natural brilliance of your teeth with our clinical teeth whitening. We use medical-grade hydrogen peroxide formulas activated by cool laser light to break down organic stains without damaging enamel or triggering sensitivity.',
      icon: Sun,
      color: 'from-accent-teal to-accent-teal-dark',
      bgGlow: 'rgba(72, 192, 164, 0.15)',
      duration: '45 - 60 Minutes',
      guarantee: 'Immediate Shade Improvements',
      subTreatments: [
        'Laser-Activated In-Office Whitening',
        'Customized Home Maintenance Trays',
        'Fluoride Enamel Sensitivity Shields',
        'Internal Bleaching for Devitalized Teeth'
      ],
      postCare: 'Maintain a "white diet" (milk, rice, white meat) for 24 hours, avoiding dark spices like turmeric or soy sauce.'
    },
    {
      id: 4,
      title: 'Dental Implants',
      shortDesc: 'Permanent, high-durability tooth replacement solutions that function and look exactly like your natural healthy teeth.',
      longDesc: 'Dental Implants are the gold standard for tooth replacement. By replacing both the root and the crown of the tooth, we restore 100% biting strength, prevent bone loss, and offer a lifetime replacement option that matches adjacent teeth.',
      icon: Shield,
      color: 'from-primary to-primary-light',
      bgGlow: 'rgba(10, 17, 40, 0.15)',
      duration: '2 - 3 Months (Staged)',
      guarantee: 'Lifetime Structural Durability',
      subTreatments: [
        'Computer-Guided Implant Placements',
        'Single and Multi-Tooth Implants',
        'Immediate Load Temporary Crowns',
        'Bone Grafting and Sinus Lifts'
      ],
      postCare: 'Maintain strict oral hygiene using antibacterial mouthwashes and follow soft food eating protocols for the initial week.'
    },
    {
      id: 5,
      title: 'General Checkups',
      shortDesc: 'Thorough examinations, digital X-rays, scaling/cleaning, and preventative care counseling to avoid advanced tooth decay.',
      longDesc: 'Preventative care is the foundation of long-term health. Our comprehensive recall exams analyze gum health, measure bone levels with low-radiation digital radiography, and remove mineralized tartar plaques.',
      icon: Layers,
      color: 'from-accent-teal/80 to-secondary/80',
      bgGlow: 'rgba(28, 119, 195, 0.1)',
      duration: '30 - 45 Minutes',
      guarantee: 'Comprehensive Diagnostic Report',
      subTreatments: [
        'Ultrasonic Scaling & Polishing',
        'Digital Panoramic Radiography',
        'Fluoride Treatments for Kids',
        'Sealants for Cavity Prevention'
      ],
      postCare: 'Brush twice daily, floss once daily, and schedule clinical cleanings every six months to sustain optimal oral hygiene.'
    }
  ];

  const handleBookRedirect = () => {
    setActiveService(null);
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
    <section id="services" className="relative py-24 bg-[#FAFAFA] overflow-hidden border-t border-primary/5">
      
      {/* Background Soft Blobs */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-teal/5 blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
            Clinical Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary leading-tight mb-4">
            Premium Dental Care Solutions
          </h2>
          <p className="text-sm sm:text-base text-primary/70 font-sans font-light leading-relaxed">
            We offer a wide spectrum of dental services designed to keep your teeth healthy, clean, and your smile radiant.
          </p>
        </div>

        {/* Services Grid (Asymmetrical Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            
            // Assign custom column span on larger grids for asymmetrical flow
            const colSpanClass = index === 3 || index === 4 
              ? 'lg:col-span-1' 
              : 'lg:col-span-1';

            return (
              <motion.div
                key={service.id}
                className={`${colSpanClass} rounded-[2rem] p-8 glass-card border border-white/30 cursor-pointer relative overflow-hidden transition-all duration-500`}
                onClick={() => setActiveService(service)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveService(service);
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -6 }}
                role="button"
                tabIndex={0}
                aria-label={`Explore clinical details and procedures for ${service.title}`}
                style={{
                  boxShadow: hoveredIndex === index 
                    ? `0 20px 45px -15px ${service.bgGlow}, 0 1px 1px 0 rgba(255, 255, 255, 0.4) inset`
                    : '0 10px 30px -10px rgba(10, 17, 40, 0.04), 0 1px 1px 0 rgba(255, 255, 255, 0.2) inset'
                }}
              >
                {/* SVG Icon Box with Stroke Drawing Animation */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} flex items-center justify-center mb-8 shadow-glass text-white relative`}>
                  {/* Drawing SVG layer on hover */}
                  <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 56 56">
                    <rect 
                      x="2" y="2" width="52" height="52" rx="14" 
                      fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{
                        strokeDasharray: 200,
                        strokeDashoffset: hoveredIndex === index ? 0 : 200,
                        transition: 'stroke-dashoffset 1s ease'
                      }}
                    />
                  </svg>
                  <IconComponent className="w-6 h-6 relative z-10" />
                </div>

                <h3 className="text-xl font-bold font-serif text-primary mb-4">
                  {service.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-primary/70 leading-relaxed font-sans font-light mb-6">
                  {service.shortDesc}
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold text-secondary group">
                  <span>Explore Service details</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>

                {/* Aesthetic corner glow */}
                <div 
                  className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full blur-[40px] opacity-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: service.bgGlow,
                    opacity: hoveredIndex === index ? 0.8 : 0
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Slide-out Detail Drawer */}
        <AnimatePresence>
          {activeService && (
            <>
              {/* Dark transparent glass backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveService(null)}
                className="fixed inset-0 bg-primary/45 backdrop-blur-md z-50 flex justify-end"
              />

              {/* Slider Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-[550px] bg-white shadow-premium z-50 border-l border-primary/10 overflow-y-auto"
              >
                {/* Header Block */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-primary/5 flex items-center justify-between z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/50">
                    Service Blueprint
                  </span>
                  <button 
                    onClick={() => setActiveService(null)}
                    className="w-12 h-12 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/30"
                    aria-label="Close service blueprint drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details Body */}
                <div className="p-8">
                  {/* Decorative Banner */}
                  <div className={`w-16 h-16 rounded-[1.25rem] bg-gradient-to-tr ${activeService.color} flex items-center justify-center text-white mb-6 shadow-glass`}>
                    <activeService.icon className="w-7 h-7" />
                  </div>

                  <h2 className="text-3xl font-bold font-serif text-primary mb-2">
                    {activeService.title}
                  </h2>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-6">
                    Dr. Khushwaha's Medi-Tooth Dental Clinic
                  </p>

                  <p className="text-sm text-primary/70 leading-relaxed font-sans font-light mb-8">
                    {activeService.longDesc}
                  </p>

                  {/* Highlights Box */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/5 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-secondary shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase text-primary/55 font-bold block">Avg Duration</span>
                        <span className="text-xs font-semibold text-primary">{activeService.duration}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/5 flex items-center gap-3">
                      <Shield className="w-5 h-5 text-accent-teal shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase text-primary/55 font-bold block">Quality Standards</span>
                        <span className="text-xs font-semibold text-primary">{activeService.guarantee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sub-Treatments List */}
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                    Sub-Specialities & Procedures
                  </h4>
                  <ul className="flex flex-col gap-3.5 mb-8">
                    {activeService.subTreatments.map((treatment, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-primary/85 font-sans">
                        <div className="w-5 h-5 rounded-full bg-accent-teal/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-accent-teal" />
                        </div>
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Post-Care Notice */}
                  <div className="p-5 rounded-2xl bg-accent-gold/5 border border-accent-gold/20 flex gap-3.5 mb-10">
                    <ShieldAlert className="w-5 h-5 text-accent-gold-dark shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-accent-gold-dark uppercase tracking-wider mb-1">
                        Doctor's Post-Treatment Advice
                      </h5>
                      <p className="text-xs text-primary/70 leading-relaxed font-sans font-light">
                        {activeService.postCare}
                      </p>
                    </div>
                  </div>

                  {/* Booking Trigger CTA */}
                  <button
                    onClick={handleBookRedirect}
                    aria-label={`Book a dental consultation for ${activeService.title}`}
                    className="w-full py-4 rounded-2xl text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-premium hover:shadow-accent-glow transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <CalendarCheck className="w-4.5 h-4.5" />
                    Book Service Consultation
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
