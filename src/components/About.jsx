import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldAlert, Sparkles, CheckCircle2, FlaskConical, Stethoscope } from 'lucide-react';

export default function About() {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles based on cursor offset from card center
    const rotateX = ((centerY - y) / centerY) * 8;  // Max 8 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 8;  // Max 8 degrees tilt
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease';
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'none';
    }
  };

  return (
    <section id="about" className="relative py-24 bg-[#FAFAFA] overflow-hidden border-t border-primary/5">
      {/* Background soft meshes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: ID-Style 3D Tilt Doctor Card */}
          <div className="lg:col-span-5 flex justify-center perspective-1000">
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className="relative w-full max-w-[370px] bg-gradient-to-b from-white to-primary/[0.02] border border-white/40 shadow-premium rounded-[2.5rem] p-6 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 transform-style-3d overflow-hidden"
              style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' }}
              role="article"
              aria-label="Professional profile and qualifications of Dr. Sangya Khushwaha"
            >
              
              {/* Premium Card Header Detail */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-secondary via-accent-gold to-accent-teal" />
              
              {/* Doctor Portrait with Glass border */}
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/80 shadow-glass-lg mb-6 relative z-10 shrink-0 mt-4">
                <img 
                  src="assets/dr-sangya.png" 
                  alt="Dr. Sangya Khushwaha - B.D.S, Fellowship in Advance Aesthetic Dentistry (F.A.A.D), Dentist in Nalasopara East" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Qualifications */}
              <h3 className="text-xl font-bold font-serif text-primary tracking-wide">
                Dr. Sangya Khushwaha
              </h3>
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mt-1.5 font-sans">
                Head Dental Surgeon
              </p>
              
              <div className="w-full h-[1px] bg-primary/10 my-4" />
              
              <p className="text-xs text-primary/75 leading-relaxed font-sans max-w-[280px] mb-6 font-light">
                B.D.S, Fellowship in Advance Aesthetic Dentistry (F.A.A.D)
              </p>

              {/* Bullet highlights inside ID card */}
              <div className="w-full flex flex-col gap-3.5 text-left mb-4">
                <div className="flex items-center gap-3 text-xs text-primary/80 font-sans">
                  <div className="w-6 h-6 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <span>Cosmetic & Smile Makeover Expert</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary/80 font-sans">
                  <div className="w-6 h-6 rounded-lg bg-accent-gold/10 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5 text-accent-gold-dark" />
                  </div>
                  <span>Advanced Laser & Implant Training</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary/80 font-sans">
                  <div className="w-6 h-6 rounded-lg bg-accent-teal/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal-dark" />
                  </div>
                  <span>Painless Treatment Protocol</span>
                </div>
              </div>

              {/* Micro stamp */}
              <div className="mt-4 text-[9px] text-primary/45 uppercase tracking-widest font-semibold">
                Medi-Tooth Orthodontics F.A.A.D
              </div>

            </div>
          </div>

          {/* Right Column: Information & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-accent-teal" />
              About the Doctor
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary leading-tight mb-6">
              Meet Dr. Sangya Khushwaha
            </h2>
            
            <p className="text-lg text-secondary font-sans font-light leading-relaxed mb-6">
              Providing state-of-the-art dental care with a gentle, patient-focused approach.
            </p>
            
            <p className="text-base text-primary/70 leading-relaxed font-sans font-light mb-10">
              At Medi-Tooth Dental Clinic, we believe that dental visits should be relaxing, reassuring, and completely safe. Under the leadership of Dr. Sangya Khushwaha, our clinic provides comprehensive dental care tailored to your unique requirements. We utilize modern diagnostics, premium biocompatible materials, and class-leading sterilized instrumentation to guarantee safe, effective, and beautiful clinical outcomes.
            </p>

            {/* Sub feature boxes for Technology & Sterilization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              
              {/* Feature 1: Premium Tech */}
              <div className="p-6 rounded-3xl bg-white border border-primary/5 shadow-glass hover:shadow-premium transition-shadow duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center shrink-0 text-secondary">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-sans mb-1.5">Premium Technology</h4>
                  <p className="text-xs text-primary/65 leading-relaxed font-sans font-light">
                    Equipped with advanced modern dental chairs, digital imaging, and tools.
                  </p>
                </div>
              </div>

              {/* Feature 2: Autoclave Sterile */}
              <div className="p-6 rounded-3xl bg-white border border-primary/5 shadow-glass hover:shadow-premium transition-shadow duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-teal/15 flex items-center justify-center shrink-0 text-accent-teal">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-sans mb-1.5">Sterile Environment</h4>
                  <p className="text-xs text-primary/65 leading-relaxed font-sans font-light">
                    Strict medical class autoclave sterilization protocols for all apparatus.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
