/* 
   Dr. Khushwaha's Medi-Tooth Dental Clinic - Interactivity script
   Implements: Reveal-on-Scroll, Review Carousel, Clinic Status, 
   Form Validation, Bot Prevention (Honeypot + Mock reCAPTCHA v3)
*/

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initRevealAnimations();
    initReviewCarousel();
    updateClinicStatus();
    initBookingForm();
    
    // Periodically update clinic open/closed status every 60 seconds
    setInterval(updateClinicStatus, 60000);
});

/* ==========================================================================
   1. Sticky Header Shrink
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   2. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    burgerMenu.addEventListener('click', () => {
        const isOpen = burgerMenu.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });
}

/* ==========================================================================
   3. Reveal-on-Scroll Animations (Intersection Observer)
   ========================================================================== */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Testimonial Carousel
   ========================================================================== */
function initReviewCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    const cards = Array.from(track.children);
    
    let currentIndex = 0;
    let autoSlideInterval;
    let cardSize = getCardWidth();
    
    // Generate navigation dots dynamically
    const totalSlides = Math.ceil(cards.length / (window.innerWidth > 768 ? 2 : 1));
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i * (window.innerWidth > 768 ? 2 : 1));
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    }
    
    const dots = Array.from(dotsContainer.children);
    
    function getCardWidth() {
        return cards[0].getBoundingClientRect().width + 24; // Width + gap
    }
    
    function updateSlidePosition() {
        cardSize = getCardWidth();
        track.style.transform = `translateX(-${currentIndex * cardSize}px)`;
        updateDots();
    }
    
    function updateDots() {
        const itemsPerScreen = window.innerWidth > 768 ? 2 : 1;
        const activeDotIndex = Math.floor(currentIndex / itemsPerScreen);
        dots.forEach((dot, idx) => {
            if (idx === activeDotIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToSlide(index) {
        const maxIndex = cards.length - (window.innerWidth > 768 ? 2 : 1);
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateSlidePosition();
    }
    
    function nextSlide() {
        const step = window.innerWidth > 768 ? 2 : 1;
        if (currentIndex >= cards.length - step) {
            goToSlide(0); // Loop back
        } else {
            goToSlide(currentIndex + step);
        }
    }
    
    function prevSlide() {
        const step = window.innerWidth > 768 ? 2 : 1;
        if (currentIndex <= 0) {
            goToSlide(cards.length - step); // Loop back to end
        } else {
            goToSlide(currentIndex - step);
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
    
    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Drag/Touch support
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    
    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove);
    
    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);
    track.addEventListener('mousemove', touchMove);
    
    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        clearInterval(autoSlideInterval);
        track.style.transition = 'none';
    }
    
    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPos;
        currentTranslate = -currentIndex * getCardWidth() + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const movedBy = currentTranslate - (-currentIndex * getCardWidth());
        const step = window.innerWidth > 768 ? 2 : 1;
        
        // Threshold of 100px to trigger slide change
        if (movedBy < -100) {
            goToSlide(currentIndex + step);
        } else if (movedBy > 100) {
            goToSlide(currentIndex - step);
        } else {
            goToSlide(currentIndex);
        }
        
        startAutoSlide();
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    startAutoSlide();
}

/* ==========================================================================
   5. Dynamic Business Hours Calculator (Indian Standard Time - Asia/Kolkata)
   ========================================================================== */
function updateClinicStatus() {
    const badge = document.getElementById('clinic-status-badge');
    const textSpan = document.getElementById('clinic-status-text');
    
    try {
        // Calculate the current time specifically in Indian Standard Time (IST - Asia/Kolkata)
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: 'numeric',
            weekday: 'long',
            hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(new Date());
        
        const weekday = parts.find(p => p.type === 'weekday').value;
        const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
        const minute = parseInt(parts.find(p => p.type === 'minute').value, 10);
        
        const currentMinutes = hour * 60 + minute;
        
        // Clinic shift mappings in minutes
        // Morning: 10:00 AM - 02:00 PM (600 mins - 840 mins)
        // Evening: 05:00 PM - 09:00 PM (1020 mins - 1260 mins)
        const isMorningOpen = (currentMinutes >= 600) && (currentMinutes < 840);
        const isEveningOpen = (currentMinutes >= 1020) && (currentMinutes < 1260);
        const isWeekdayOpen = isMorningOpen || isEveningOpen;
        
        // Closed on Sunday
        if (weekday === 'Sunday') {
            badge.className = 'status-badge closed';
            textSpan.textContent = 'Closed';
        } else if (isWeekdayOpen) {
            badge.className = 'status-badge open';
            textSpan.textContent = 'Open Now';
        } else {
            badge.className = 'status-badge closed';
            textSpan.textContent = 'Closed';
        }
    } catch (e) {
        // Fallback to local system time if timezone translation errors
        const now = new Date();
        const day = now.getDay(); // 0 is Sunday
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentMinutes = hour * 60 + minute;
        
        const isMorningOpen = (currentMinutes >= 600) && (currentMinutes < 840);
        const isEveningOpen = (currentMinutes >= 1020) && (currentMinutes < 1260);
        const isWeekdayOpen = isMorningOpen || isEveningOpen;
        
        if (day === 0) {
            badge.className = 'status-badge closed';
            textSpan.textContent = 'Closed';
        } else if (isWeekdayOpen) {
            badge.className = 'status-badge open';
            textSpan.textContent = 'Open Now';
        } else {
            badge.className = 'status-badge closed';
            textSpan.textContent = 'Closed';
        }
    }
}

/* ==========================================================================
   6. Secure Form Booking & Spam Prevention
   ========================================================================== */
function initBookingForm() {
    const form = document.getElementById('booking-form');
    const submitOverlay = document.getElementById('submit-overlay');
    const spinner = document.getElementById('submit-spinner');
    const checkmark = document.getElementById('submit-success-checkmark');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayText = document.getElementById('overlay-text');
    const closeBtn = document.getElementById('overlay-close-btn');
    
    // Set minimum date to today
    const dateInput = document.getElementById('form-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Input elements for validation
    const inputs = {
        name: document.getElementById('form-name'),
        phone: document.getElementById('form-phone'),
        email: document.getElementById('form-email'),
        date: document.getElementById('form-date'),
        time: document.getElementById('form-time')
    };
    
    // Attach blur listeners for instant visual UX feedback
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        input.addEventListener('blur', () => validateField(key, input));
        input.addEventListener('input', () => {
            // Remove error styles when typing starts
            const parent = input.closest('.form-group');
            if (parent.classList.contains('error')) {
                parent.classList.remove('error');
            }
        });
    });
    
    function validateField(key, el) {
        const parent = el.closest('.form-group');
        let isValid = true;
        
        if (key === 'name') {
            isValid = el.value.trim().length >= 2;
        } else if (key === 'phone') {
            // 10-digit Indian mobile number validation starting with 6-9
            const phoneRegex = /^[6-9]\d{9}$/;
            isValid = phoneRegex.test(el.value.trim());
        } else if (key === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(el.value.trim());
        } else if (key === 'date') {
            isValid = el.value !== '' && el.value >= today;
        } else if (key === 'time') {
            isValid = el.value !== '';
        }
        
        if (isValid) {
            parent.classList.remove('error');
            parent.classList.add('success');
        } else {
            parent.classList.remove('success');
            parent.classList.add('error');
        }
        
        return isValid;
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Spam Honeypot Interceptor
        const honeypot = document.getElementById('form-website').value;
        if (honeypot !== '') {
            console.warn('[Security Alert] Honeypot triggered! Spam injection rejected.');
            // Fail silently or pretend to succeed to throw off bots
            showSpamError();
            return;
        }
        
        // 2. Validate all fields
        let isFormValid = true;
        Object.keys(inputs).forEach(key => {
            const isValid = validateField(key, inputs[key]);
            if (!isValid) isFormValid = false;
        });
        
        if (!isFormValid) return;
        
        // 3. Simulated Submission & Mock Google reCAPTCHA v3 Action
        submitOverlay.classList.remove('success');
        submitOverlay.classList.add('active');
        spinner.style.display = 'block';
        checkmark.style.opacity = '0';
        closeBtn.style.display = 'none';
        
        overlayTitle.textContent = 'Verifying Security...';
        overlayText.textContent = 'Loading invisible Google reCAPTCHA v3 shield verification...';
        
        setTimeout(() => {
            // Generate mock client token representation
            const mockRecaptchaToken = '03AFcWeA7' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            console.log(`[reCAPTCHA v3] Security Token Generated Successfully: ${mockRecaptchaToken}`);
            
            overlayTitle.textContent = 'Securing Booking...';
            overlayText.textContent = 'Transmitting encrypted reservation token to database...';
            
            setTimeout(() => {
                // Done - Show Success State
                submitOverlay.classList.add('success');
                overlayTitle.textContent = 'Booking Requested!';
                overlayText.textContent = `Thank you, ${inputs.name.value}! Dr. Sangya's staff will call you on ${inputs.phone.value} shortly to confirm your slot for ${inputs.date.value}.`;
                closeBtn.style.display = 'inline-flex';
                
                // Clear form inputs
                form.reset();
                Object.keys(inputs).forEach(key => {
                    const parent = inputs[key].closest('.form-group');
                    parent.classList.remove('success', 'error');
                });
            }, 1800);
        }, 1500);
    });
    
    // Close button for success popup
    closeBtn.addEventListener('click', () => {
        submitOverlay.classList.remove('active');
    });
    
    function showSpamError() {
        submitOverlay.classList.add('active');
        spinner.style.display = 'none';
        checkmark.style.opacity = '0';
        overlayTitle.textContent = 'Access Blocked';
        overlayText.textContent = 'Automated validation checks flagged this submission. Please refresh and try again.';
        closeBtn.style.display = 'inline-flex';
        closeBtn.textContent = 'Try Again';
        closeBtn.addEventListener('click', () => {
            submitOverlay.classList.remove('active');
            form.reset();
        });
    }
}
