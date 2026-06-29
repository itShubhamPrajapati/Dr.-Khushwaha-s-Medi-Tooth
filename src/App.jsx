import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import AppointmentForm from './components/AppointmentForm';
import MapAndHours from './components/MapAndHours';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-pearl flex flex-col font-sans select-none antialiased pb-20 md:pb-0">
      {/* Dynamic sticky navigation header */}
      <Header />
      
      {/* Page Content sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Reviews />
        <AppointmentForm />
        <MapAndHours />
      </main>

      {/* Global Brand Footer */}
      <Footer />

      {/* Global Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Sticky Call & WhatsApp Overlay on Mobile */}
      <StickyMobileBar />
    </div>
  );
}
