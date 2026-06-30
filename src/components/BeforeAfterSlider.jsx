import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage, serviceName }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoAnimating, setIsAutoAnimating] = useState(true);
  const containerRef = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    // Run the auto-hint animation chain
    setIsAutoAnimating(true);
    setSliderPosition(50);

    const t1 = setTimeout(() => {
      setSliderPosition(30);
    }, 500);

    const t2 = setTimeout(() => {
      setSliderPosition(70);
    }, 1400);

    const t3 = setTimeout(() => {
      setSliderPosition(50);
    }, 2300);

    const t4 = setTimeout(() => {
      setIsAutoAnimating(false);
    }, 3100);

    timersRef.current = [t1, t2, t3, t4];

    return () => clearTimers();
  }, [beforeImage, afterImage]); // Re-run when images change (user opens another service modal)

  const handleStartDrag = (clientX) => {
    clearTimers();
    setIsAutoAnimating(false);
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const transitionStyle = isAutoAnimating 
    ? { transition: 'left 0.75s ease-in-out, clip-path 0.75s ease-in-out' }
    : undefined;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden select-none border border-primary/10 shadow-premium cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={(e) => handleStartDrag(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handleStartDrag(e.touches[0].clientX);
          }
        }}
      >
        {/* After Image (Base Layer) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={afterImage} 
            alt={`After ${serviceName}`} 
            className="w-full h-full object-cover"
            draggable="false"
            loading="lazy"
            width="800"
            height="500"
          />
          <div className="absolute bottom-4 right-4 bg-accent-teal/95 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl shadow-glass-sm z-10 pointer-events-none border border-white/10">
            After
          </div>
        </div>

        {/* Before Image (Top Layer with Clip Path) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            ...transitionStyle
          }}
        >
          <img 
            src={beforeImage} 
            alt={`Before ${serviceName}`} 
            className="w-full h-full object-cover"
            draggable="false"
            loading="lazy"
            width="800"
            height="500"
          />
          <div className="absolute bottom-4 left-4 bg-accent-gold-dark/95 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl shadow-glass-sm z-10 pointer-events-none border border-white/10">
            Before
          </div>
        </div>

        {/* Draggable Divider Bar */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white/70 backdrop-blur-xs flex items-center justify-center pointer-events-none"
          style={{ 
            left: `${sliderPosition}%`, 
            transform: 'translateX(-50%)',
            ...transitionStyle
          }}
        >
          {/* Handle Button */}
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 shadow-premium-lg flex items-center justify-center select-none pointer-events-auto hover:scale-115 hover:bg-white/35 active:scale-95 transition-all duration-200 cursor-ew-resize">
            <span className="text-sm font-bold tracking-tight select-none">←|→</span>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-primary/55 font-medium text-center tracking-wide italic">
        * Drag the handle left or right to compare results
      </div>
    </div>
  );
}
