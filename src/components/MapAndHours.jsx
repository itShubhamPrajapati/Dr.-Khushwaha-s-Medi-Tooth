import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapPin, Phone, Mail, Clock, ShieldCheck, MapPinCheck } from 'lucide-react';

export default function MapAndHours() {
  const [status, setStatus] = useState({ open: false, label: 'Checking Status...' });

  const clinicHours = {
    morningStart: 600, // 10:00 AM in minutes
    morningEnd: 840,   // 02:00 PM in minutes
    eveningStart: 1020, // 05:00 PM in minutes
    eveningEnd: 1260,   // 09:00 PM in minutes
  };

  const getClinicStatus = () => {
    try {
      // Calculate current date/time in Asia/Kolkata (IST)
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
      
      const isMorningOpen = (currentMinutes >= clinicHours.morningStart) && (currentMinutes < clinicHours.morningEnd);
      const isEveningOpen = (currentMinutes >= clinicHours.eveningStart) && (currentMinutes < clinicHours.eveningEnd);
      const isOpenToday = isMorningOpen || isEveningOpen;

      if (weekday === 'Sunday') {
        return { open: false, label: 'Closed (Sunday)' };
      }

      if (isOpenToday) {
        return { open: true, label: 'Open Now' };
      } else {
        // Return contextual closed status
        if (currentMinutes < clinicHours.morningStart) {
          return { open: false, label: 'Closed (Opens at 10:00 AM)' };
        } else if (currentMinutes >= clinicHours.morningEnd && currentMinutes < clinicHours.eveningStart) {
          return { open: false, label: 'Closed (Opens at 05:00 PM)' };
        } else {
          return { open: false, label: 'Closed (Opens tomorrow at 10:00 AM)' };
        }
      }
    } catch (e) {
      // Fallback using local device timezone if Intl fails
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentMinutes = hour * 60 + minute;

      const isMorningOpen = (currentMinutes >= clinicHours.morningStart) && (currentMinutes < clinicHours.morningEnd);
      const isEveningOpen = (currentMinutes >= clinicHours.eveningStart) && (currentMinutes < clinicHours.eveningEnd);

      if (day === 0) {
        return { open: false, label: 'Closed (Sunday)' };
      }
      if (isMorningOpen || isEveningOpen) {
        return { open: true, label: 'Open Now' };
      } else {
        if (currentMinutes < clinicHours.morningStart) {
          return { open: false, label: 'Closed (Opens at 10:00 AM)' };
        } else if (currentMinutes >= clinicHours.morningEnd && currentMinutes < clinicHours.eveningStart) {
          return { open: false, label: 'Closed (Opens at 05:00 PM)' };
        } else {
          return { open: false, label: 'Closed (Opens tomorrow at 10:00 AM)' };
        }
      }
    }
  };

  useEffect(() => {
    setStatus(getClinicStatus());
    const interval = setInterval(() => {
      setStatus(getClinicStatus());
    }, 30000); // Check status every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    const mapContainer = document.getElementById('leaflet-map');
    if (!mapContainer) return;

    const coordinates = [19.422379, 72.822899];
    
    // Create Leaflet instance
    const map = L.map('leaflet-map', {
      center: coordinates,
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: true
    });

    // Add high quality tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom HTML pulsing marker
    const customIcon = L.divIcon({
      html: `
        <div class="relative w-10 h-10 -left-1 -top-1 flex items-center justify-center">
          <div class="absolute w-8 h-8 bg-secondary rounded-full animate-ping opacity-35"></div>
          <div class="relative w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-accent-teal border-2 border-white flex items-center justify-center shadow-premium">
            <svg class="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2C8 2 5 5 5 9c0 4.5 2.5 8 7 13 4.5-5 7-8.5 7-13 0-4-3-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>
        </div>
      `,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    // Add marker and popup
    L.marker(coordinates, { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-left font-sans p-1.5">
          <h4 class="text-sm font-bold text-primary mb-1">Medi-Tooth Clinic</h4>
          <p class="text-[11px] text-primary/70 leading-normal">
            202, 203, Sai Siddhi Apt, Nalasopara East.
          </p>
        </div>
      `)
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section id="contact" className="relative py-24 bg-[#FAFAFA] overflow-hidden border-t border-primary/5">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: Details & Hours */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
                Find Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary leading-tight mb-6">
                Contact Details & Timing
              </h2>
              <p className="text-base text-primary/70 leading-relaxed font-sans font-light mb-8">
                Reach out directly or visit us at our clinic. We are located on the 2nd floor of Sai Siddhi Apartment, above Rajsukh Hospital in Nalasopara East, Vasai-Virar.
              </p>

              {/* Info Rows */}
              <div className="space-y-6 mb-8">
                
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/[0.03] border border-primary/10 flex items-center justify-center shrink-0 text-secondary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary/45 uppercase tracking-wider">Clinic Address</h4>
                    <p className="text-sm text-primary/85 leading-relaxed font-sans font-light mt-1">
                      2nd floor, 202, 203, Sai Siddhi Apt, Taki Rd, above Rajsukh Hospital, near Radha Krishna Hotel, Damodar Nagar, Nalasopara East, Vasai-Virar, Maharashtra 401209
                    </p>
                  </div>
                </div>

                {/* Contact numbers */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/[0.03] border border-primary/10 flex items-center justify-center shrink-0 text-secondary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary/45 uppercase tracking-wider">Call Numbers</h4>
                    <p className="text-sm text-primary/85 leading-relaxed font-sans mt-1">
                      <a href="tel:08600874016" aria-label="Call clinic primary number 08600874016" className="hover:text-secondary transition-colors">08600 874016</a>
                      <span className="mx-2 text-primary/30">|</span>
                      <a href="tel:8485803755" aria-label="Call clinic secondary number 8485803755" className="hover:text-secondary transition-colors">84858 03755</a>
                    </p>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/[0.03] border border-primary/10 flex items-center justify-center shrink-0 text-secondary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary/45 uppercase tracking-wider">Email Contact</h4>
                    <p className="text-sm text-primary/85 leading-relaxed font-sans mt-1">
                      <a href="mailto:MEDITOOTHDENTALCLINIC@GMAIL.COM" aria-label="Send email to clinic at MEDITOOTHDENTALCLINIC@GMAIL.COM" className="hover:text-secondary transition-colors">
                        MEDITOOTHDENTALCLINIC@GMAIL.COM
                      </a>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Smart Hours Box */}
            <div className="p-6 rounded-[2rem] bg-white border border-primary/5 shadow-glass flex flex-col justify-between relative overflow-hidden">
              
              {/* Header inside status box */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/5">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <h4 className="text-sm font-bold text-primary font-sans">Operating Timings</h4>
                </div>
                
                {/* Live pulsing badge */}
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                  status.open 
                    ? 'bg-accent-teal/10 text-accent-teal-dark border border-accent-teal/30' 
                    : 'bg-red-500/10 text-red-600 border border-red-500/25'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-accent-teal animate-pulse' : 'bg-red-500'}`} />
                  {status.label}
                </div>
              </div>

              {/* Timing structure */}
              <div className="space-y-3.5 text-xs text-primary/75 font-sans">
                <div className="flex justify-between">
                  <span className="font-medium">Morning Shift</span>
                  <span className="font-semibold">10:00 AM - 02:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Evening Shift</span>
                  <span className="font-semibold">05:00 PM - 09:00 PM</span>
                </div>
                <div className="flex justify-between border-t border-primary/5 pt-3.5">
                  <span className="font-medium">Working Days</span>
                  <span className="font-semibold">Monday - Saturday (Sunday Closed)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Leaflet Interactive Map Container */}
          <div className="lg:col-span-6 flex flex-col min-h-[400px]">
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white/60 border border-white/40 shadow-premium p-3 flex flex-col">
              <div 
                id="leaflet-map" 
                role="region"
                aria-label="Interactive Leaflet map displaying location coordinates of Dr. Khushwaha's dental clinic"
                className="w-full h-full min-h-[380px] rounded-[2rem] z-10 shadow-glass border border-primary/5 relative"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
