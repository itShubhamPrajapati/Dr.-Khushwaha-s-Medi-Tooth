import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

// Lazy load below-the-fold components
const Services = React.lazy(() => import('./components/Services'));
const Reviews = React.lazy(() => import('./components/Reviews'));
const AppointmentForm = React.lazy(() => import('./components/AppointmentForm'));
const MapAndHours = React.lazy(() => import('./components/MapAndHours'));

import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-pearl flex flex-col font-sans select-none antialiased pb-20 md:pb-0">
        {/* Dynamic sticky navigation header */}
        <Header />
        
        {/* Page Content sections */}
        <main className="flex-grow">
          <Hero />
          
          <About />
          
          <React.Suspense fallback={<div className="h-48 flex items-center justify-center text-primary/30 text-sm font-light">Loading services...</div>}>
            <Services />
          </React.Suspense>
          
          <React.Suspense fallback={<div className="h-48 flex items-center justify-center text-primary/30 text-sm font-light">Loading reviews...</div>}>
            <Reviews />
          </React.Suspense>
          
          <React.Suspense fallback={<div className="h-48 flex items-center justify-center text-primary/30 text-sm font-light">Loading appointment form...</div>}>
            <AppointmentForm />
          </React.Suspense>
          
          <React.Suspense fallback={<div className="h-48 flex items-center justify-center text-primary/30 text-sm font-light">Loading location & map...</div>}>
            <MapAndHours />
          </React.Suspense>
        </main>

        {/* Global Brand Footer */}
        <Footer />

        {/* Global Floating WhatsApp Widget */}
        <FloatingWhatsApp />

        {/* Sticky Call & WhatsApp Overlay on Mobile */}
        <StickyMobileBar />
      </div>
    </LazyMotion>
  );
}
