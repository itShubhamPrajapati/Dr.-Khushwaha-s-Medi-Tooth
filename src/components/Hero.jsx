import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Star, ShieldCheck, HeartPulse, Award } from 'lucide-react';
import clinicHero from '../assets/clinic-hero.png';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
      },
    },
  };

  const handleCTA = (e, targetId) => {
    e.preventDefault();
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

  return (
    <section id="home" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
      
      {/* Animated Mesh Gradients in the background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[120px] animate-blob-1" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-accent-teal/10 blur-[130px] animate-blob-2" />
        <div className="absolute top-10 right-1/4 w-[350px] h-[350px] rounded-full bg-accent-gold/5 blur-[100px] animate-blob-3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
        
        {/* Left Side Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust rating pill */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.03] border border-primary/10 backdrop-blur-md mb-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
              ))}
            </div>
            <span className="text-xs font-semibold text-primary/80">85 All 5-Star Google Reviews</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-[2.2rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.12] font-bold font-serif text-primary mb-6"
          >
            Expert Dental Care & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent-teal">
              Aesthetic Dentistry
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-primary/70 max-w-xl mb-10 leading-relaxed font-sans font-light"
          >
            Welcome to Dr. Khushwaha's Medi-Tooth Dental Clinic. We combine advanced clinical technology with aesthetic artistry to craft your perfect, confident smile.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
          >
            <a
              href="#booking"
              onClick={(e) => handleCTA(e, 'booking')}
              aria-label="Scroll to the secure appointment booking form"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-premium hover:shadow-accent-glow hover:-translate-y-[2px] min-h-[48px]"
            >
              <Calendar className="w-4.5 h-4.5" />
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">Book Appointment</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans font-normal">→</span>
            </a>
            <a
              href="tel:08600874016"
              aria-label="Call Dr. Khushwaha's dental clinic at 08600874016"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide text-primary bg-white border border-primary/10 hover:border-secondary/35 transition-all duration-300 shadow-glass hover:shadow-premium hover:-translate-y-[2px] min-h-[48px]"
            >
              <Phone className="w-4.5 h-4.5 text-secondary" />
              Call 08600 874016
            </a>
          </motion.div>

          {/* Trust stats grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-primary/10 pt-8 w-full max-w-lg"
          >
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-semibold font-serif text-secondary flex items-center gap-1">
                100%
              </span>
              <span className="text-xs text-primary/60 mt-1">Patient Satisfaction</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-semibold font-serif text-accent-gold flex items-center gap-1">
                5.0 <Star className="w-4 h-4 fill-accent-gold text-accent-gold inline -mt-1" aria-hidden="true" />
              </span>
              <span className="text-xs text-primary/60 mt-1">Google Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-semibold font-serif text-accent-teal">
                B.D.S
              </span>
              <span className="text-xs text-primary/60 mt-1">Aesthetic Fellow</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Parallax Visual & Overlapping Appt Card */}
        <motion.div 
          className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          {/* Main Decorative ring */}
          <div className="absolute w-[110%] h-[110%] rounded-full border border-primary/5 pointer-events-none scale-90" />
          
          {/* Main Image Frame with Premium Soft Shadow */}
          <div className="relative rounded-[2.5rem] overflow-hidden w-full max-w-[440px] aspect-[4/5] shadow-premium z-10 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-10 mix-blend-multiply" />
            <img 
              src={clinicHero} 
              alt="Dr. Khushwaha's Dental Clinic Modern Interior - Reception Area in Nalasopara East"
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-105"
            />
          </div>

          {/* Floating Glassmorphic Appointment Card */}
          <motion.div 
            className="absolute bottom-6 -left-6 sm:-left-12 z-20 max-w-[280px] p-5 rounded-3xl glass-panel shadow-glass-lg border border-white/40 flex items-start gap-4 cursor-pointer hover:bg-white/65 hover:scale-[1.03] transition-all duration-300"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ y: -5 }}
            onClick={(e) => handleCTA(e, 'booking')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCTA(e, 'booking');
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to scroll to the booking section for Dr. Sangya Khushwaha"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-gold to-accent-gold-dark flex items-center justify-center shrink-0 shadow-glass text-white">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary font-sans">Dr. Sangya Khushwaha</h4>
              <p className="text-xs text-primary/70 mt-0.5 leading-relaxed font-sans">
                Fellowship in Advance Aesthetic Dentistry (F.A.A.D)
              </p>
              <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-secondary uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Trusted Specialist
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -top-6 -right-4 z-20 p-4 rounded-full glass-panel shadow-glass border border-white/50 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: [0, -10, 0] 
            }}
            transition={{ 
              scale: { delay: 1, type: "spring", stiffness: 100 },
              opacity: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 }
            }}
          >
            <HeartPulse className="w-6 h-6 text-accent-teal animate-pulse" />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
