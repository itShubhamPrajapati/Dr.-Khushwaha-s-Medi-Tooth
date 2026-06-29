import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

export default function Reviews() {
  const [dragWidth, setDragWidth] = useState(0);
  const carouselRef = useRef(null);
  const innerTrackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reviewsData = [
    {
      id: 1,
      name: 'Amit Sharma',
      initials: 'A',
      date: '2 weeks ago',
      rating: 5,
      text: '"Dr. Sangya Khushwaha is extremely professional. I had a root canal treatment done and it was completely painless. The staff is very welcoming, and the clinic is clean."',
      source: 'Google Reviews'
    },
    {
      id: 2,
      name: 'Pooja Patel',
      initials: 'P',
      date: '1 month ago',
      rating: 5,
      text: '"I visited Dr. Sangya for aesthetic dental veneers. She explained the entire smile makeover process. The outcome is outstanding, I love my new smile!"',
      source: 'Google Reviews'
    },
    {
      id: 3,
      name: 'Rahul Joshi',
      initials: 'R',
      date: '2 months ago',
      rating: 5,
      text: '"Outstanding clinic space. Excellent sterilisation methods. The dentist took time to resolve my queries about dental implants. High recommendation!"',
      source: 'Google Reviews'
    },
    {
      id: 4,
      name: 'Meera Nair',
      initials: 'M',
      date: '3 months ago',
      rating: 5,
      text: '"Best dental clinic in Nalasopara East. I visited for normal teeth cleaning/scaling and she also found a small cavity. Very transparent dental care."',
      source: 'Google Reviews'
    }
  ];

  // Calculate drag boundaries on render and resize
  useEffect(() => {
    const computeDragBoundaries = () => {
      if (carouselRef.current && innerTrackRef.current) {
        const carouselWidth = carouselRef.current.offsetWidth;
        const trackWidth = innerTrackRef.current.scrollWidth;
        // set drag limit to left offset
        setDragWidth(Math.max(0, trackWidth - carouselWidth + 32)); // Adding padding buffers
      }
    };

    computeDragBoundaries();
    window.addEventListener('resize', computeDragBoundaries);
    // Timeout to allow DOM layout to stabilize
    const timer = setTimeout(computeDragBoundaries, 500);
    
    return () => {
      window.removeEventListener('resize', computeDragBoundaries);
      clearTimeout(timer);
    };
  }, []);

  const x = useMotionValue(0);

  // Monitor drag position to highlight active slide dots
  useEffect(() => {
    const unsubscribe = x.onChange((latestX) => {
      if (carouselRef.current && innerTrackRef.current) {
        const totalScrollable = innerTrackRef.current.scrollWidth - carouselRef.current.offsetWidth;
        if (totalScrollable <= 0) return;
        
        // Map the drag coordinates to standard index divisions
        const scrollPercent = Math.abs(latestX) / totalScrollable;
        const computedIndex = Math.min(
          reviewsData.length - 1,
          Math.max(0, Math.round(scrollPercent * (reviewsData.length - 1)))
        );
        setActiveIndex(computedIndex);
      }
    });
    return () => unsubscribe();
  }, [x, reviewsData.length]);

  const slideLeft = () => {
    const track = innerTrackRef.current;
    const carousel = carouselRef.current;
    if (track && carousel) {
      const currentX = x.get();
      const slideAmount = carousel.offsetWidth * 0.75;
      const targetX = Math.min(0, currentX + slideAmount);
      
      // Animate transition using Framer Motion internal coordinate tracking
      x.set(targetX);
    }
  };

  const slideRight = () => {
    const track = innerTrackRef.current;
    const carousel = carouselRef.current;
    if (track && carousel) {
      const currentX = x.get();
      const slideAmount = carousel.offsetWidth * 0.75;
      const limit = -(track.scrollWidth - carousel.offsetWidth + 32);
      const targetX = Math.max(limit, currentX - slideAmount);
      
      x.set(targetX);
    }
  };

  return (
    <section id="reviews" className="relative py-24 bg-[#FAFAFA] overflow-hidden border-t border-primary/5">
      
      {/* Light decorative gradient blob */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-accent-gold/5 blur-[90px] pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
              Patient Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary leading-tight mb-4">
              What Our Patients Say
            </h2>
            <p className="text-sm sm:text-base text-primary/70 font-sans font-light leading-relaxed">
              Real feedback from real patients. We take pride in maintaining our 5-star Google review rating!
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={slideLeft}
              className="w-12 h-12 rounded-full border border-primary/10 hover:border-secondary/35 bg-white/70 hover:bg-white flex items-center justify-center text-primary hover:text-secondary shadow-glass hover:shadow-premium transition-all duration-300"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={slideRight}
              className="w-12 h-12 rounded-full border border-primary/10 hover:border-secondary/35 bg-white/70 hover:bg-white flex items-center justify-center text-primary hover:text-secondary shadow-glass hover:shadow-premium transition-all duration-300"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drag Container */}
        <div 
          ref={carouselRef} 
          className="overflow-hidden cursor-grab active:cursor-grabbing py-6 -my-6 px-4 -mx-4"
        >
          <motion.div
            ref={innerTrackRef}
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
            dragElastic={0.15}
            style={{ x }}
            className="flex gap-6 w-max"
          >
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="w-[290px] sm:w-[350px] md:w-[420px] p-6 sm:p-8 rounded-3xl glass-card border border-white/40 shadow-glass flex flex-col justify-between select-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-secondary to-accent-teal flex items-center justify-center text-white font-bold text-sm shadow-glass">
                        {review.initials}
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-primary font-sans">{review.name}</h4>
                        <span className="text-[10px] text-primary/55 font-medium">{review.date}</span>
                      </div>
                    </div>

                    {/* Star Rating with Glowing Star Hover Effect */}
                    <div className="flex gap-0.5 group/stars" aria-label="5 out of 5 stars rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-accent-gold text-accent-gold transition-all duration-300 group-hover/stars:scale-110 group-hover/stars:drop-shadow-[0_0_6px_#D4AF37]" 
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-primary/75 leading-relaxed font-sans font-light italic mb-8 text-left">
                    {review.text}
                  </p>
                </div>

                {/* Google Stamp */}
                <div className="flex items-center gap-2.5 border-t border-primary/5 pt-4 text-[10px] font-semibold text-primary/60 uppercase tracking-widest text-left">
                  <MessageSquareQuote className="w-4 h-4 text-secondary shrink-0" />
                  <span>Posted on {review.source}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (carouselRef.current && innerTrackRef.current) {
                  const totalScrollable = innerTrackRef.current.scrollWidth - carouselRef.current.offsetWidth;
                  const ratio = index / (reviewsData.length - 1);
                  x.set(-totalScrollable * ratio);
                }
              }}
              className="h-11 px-2 flex items-center justify-center focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === index 
                  ? 'w-8 bg-secondary' 
                  : 'w-2 bg-primary/15 hover:bg-primary/30'
              }`} />
            </button>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
