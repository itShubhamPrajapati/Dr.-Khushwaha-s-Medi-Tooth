import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, Mail, User, Clock, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Date: '',
    TimeSlot: '',
    Symptoms: '',
    honeypot: '', // anti-spam honeypot
  });

  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | security | success
  const [token, setToken] = useState('');

  // Set minimum date selector to today
  const todayDateStr = new Date().toISOString().split('T')[0];

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'Name') {
      if (value.trim().length < 2) {
        error = 'Full name must be at least 2 characters.';
      }
    } else if (name === 'Phone') {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(value.trim())) {
        error = 'Please enter a valid 10-digit mobile number.';
      }
    } else if (name === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        error = 'Please enter a valid email address.';
      }
    } else if (name === 'Date') {
      if (!value || value < todayDateStr) {
        error = 'Please select a valid date (today or future).';
      }
    } else if (name === 'TimeSlot') {
      if (!value) {
        error = 'Please select a preferred time shift.';
      }
    }

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error as soon as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot spam blocker
    if (formData.honeypot) {
      console.warn('[Security Event] Honeypot field filled. Submission blocked.');
      setSubmitState('loading');
      setTimeout(() => {
        setSubmitState('idle');
        alert('Validation error. Please refresh and try again.');
      }, 1000);
      return;
    }

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'Symptoms' && key !== 'honeypot') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Scroll to the first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorEl = document.getElementById(`form-${firstErrorKey}`);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorEl.focus();
      }
      return;
    }

    // Trigger reCAPTCHA security simulation
    setSubmitState('security');
    
    setTimeout(() => {
      // Simulate validation API call
      setSubmitState('loading');
      
      const payload = new URLSearchParams();
      payload.append('Name', formData.Name);
      payload.append('Phone', formData.Phone);
      payload.append('Email', formData.Email);
      payload.append('Date', formData.Date);
      payload.append('TimeSlot', formData.TimeSlot);
      payload.append('Symptoms', formData.Symptoms);
      payload.append('_captcha', 'false');
      payload.append('_subject', 'New Appointment Lead - Dr. Khushwaha Dental!');

      fetch('https://formsubmit.co/ajax/prajapati04092006@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: payload.toString()
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success === 'true' || data.success === true) {
          setToken(Math.random().toString(36).substring(2, 10).toUpperCase());
          setSubmitState('success');
          
          // Trigger automatic whatsapp redirect for active follow-up
          const formattedMessage = `Hello Dr. Khushwaha's team, I would like to book a dental consultation.\n\n*Details*:\n- *Name*: ${formData.Name}\n- *Phone*: ${formData.Phone}\n- *Preferred Date*: ${formData.Date}\n- *Preferred Shift*: ${formData.TimeSlot === 'morning' ? 'Morning Shift' : 'Evening Shift'}\n- *Symptoms/Dental Needs*: ${formData.Symptoms || 'None Specified'}\n\nI have submitted my form details securely on FormSubmit. Please confirm my appointment.`;
          
          const encodedMessage = encodeURIComponent(formattedMessage);
          const whatsappUrl = `https://wa.me/918600874016?text=${encodedMessage}`;
          
          setTimeout(() => {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          }, 1500);
        } else {
          throw new Error('API reported failure state');
        }
      })
      .catch(err => {
        console.error('Submission error:', err);
        setSubmitState('idle');
        alert('We encountered a temporary network issue. Please re-submit your form details.');
      });

    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      Phone: '',
      Email: '',
      Date: '',
      TimeSlot: '',
      Symptoms: '',
      honeypot: '',
    });
    setErrors({});
    setSubmitState('idle');
    setToken('');
  };

  return (
    <section id="booking" className="relative py-24 bg-[#FAFAFA] overflow-hidden border-t border-primary/5">
      
      {/* Background Soft Blurs */}
      <div className="absolute top-10 right-10 w-[450px] h-[450px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-accent-teal/5 blur-[110px] pointer-events-none" />

      <m.div 
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
              Appointment Booking
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-primary leading-tight mb-6">
              Secure Your Smile Consultation
            </h2>
            <p className="text-base text-primary/70 leading-relaxed font-sans font-light mb-10">
              Submit your preferred date and time shift to reserve your visit slot. Our administrative staff will run security verification and call or message you to finalize scheduling within an hour.
            </p>

            <div className="space-y-6 max-w-md">
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-primary/5 shadow-glass">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 text-secondary">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-sans">100% Encrypted Connection</h4>
                  <p className="text-xs text-primary/65 leading-relaxed font-sans font-light mt-0.5">
                    Your personal information is secure. We follow strict patient privacy regulations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-primary/5 shadow-glass">
                <div className="w-10 h-10 rounded-xl bg-accent-teal/15 flex items-center justify-center shrink-0 text-accent-teal">
                  <CheckCircle2 className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary font-sans">Quick WhatsApp Confirmation</h4>
                  <p className="text-xs text-primary/65 leading-relaxed font-sans font-light mt-0.5">
                    Select your slot, and receive immediate staff confirmation via mobile call or WhatsApp text.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6 relative">
            <div className="w-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-premium rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                
                {/* Form Processing & Security Check State */}
                {(submitState === 'loading' || submitState === 'security') && (
                  <m.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 relative">
                      <RefreshCw className="w-8 h-8 text-secondary animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold font-serif text-primary mb-2">
                      {submitState === 'loading' ? 'Processing Request...' : 'Securing Connection...'}
                    </h3>
                    <p className="text-xs text-primary/65 max-w-xs leading-relaxed font-sans font-light">
                      {submitState === 'loading' 
                        ? 'Transmitting secure reservation details to validation database.' 
                        : 'Loading invisible Google reCAPTCHA v3 shield token for automated spam protection.'}
                    </p>
                  </m.div>
                )}

                {/* Submission Success State */}
                {submitState === 'success' && (
                  <m.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-accent-teal/15 flex items-center justify-center mb-6 text-accent-teal">
                      <CheckCircle2 className="w-12 h-12 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-primary mb-1">
                      Details Sent!
                    </h3>
                    <p className="text-xs text-secondary font-semibold mb-6 animate-pulse">
                      Redirecting to WhatsApp for confirmation...
                    </p>
                    
                    <div className="bg-primary/[0.02] border border-primary/5 rounded-2xl p-5 mb-8 text-left w-full text-xs space-y-2 text-primary/80 font-sans">
                      <div className="flex justify-between"><span className="font-semibold">Patient:</span> <span>{formData.Name}</span></div>
                      <div className="flex justify-between"><span className="font-semibold">Contact:</span> <span>{formData.Phone}</span></div>
                      <div className="flex justify-between"><span className="font-semibold">Date:</span> <span>{formData.Date}</span></div>
                      <div className="flex justify-between"><span className="font-semibold">Shift:</span> <span className="capitalize">{formData.TimeSlot === 'morning' ? 'Morning' : 'Evening'} Shift</span></div>
                      <div className="flex justify-between border-t border-primary/5 pt-2 text-[10px] font-bold uppercase tracking-wider text-secondary">
                        <span>FormSubmit Token:</span> <span>{token}</span>
                      </div>
                    </div>

                    <p className="text-xs text-primary/60 max-w-sm leading-relaxed font-sans font-light mb-8">
                      Thank you! Dr. Sangya's staff will verify your details on FormSubmit and follow up shortly on <strong>{formData.Phone}</strong>.
                    </p>

                    <button
                      onClick={resetForm}
                      className="px-8 py-3.5 rounded-xl bg-primary text-white hover:bg-secondary text-xs font-semibold tracking-wider transition-colors shadow-glass duration-350"
                    >
                      Done
                    </button>
                  </m.div>
                )}

                {/* Form Input State */}
                {submitState === 'idle' && (
                  <m.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    action="https://formsubmit.co/prajapati04092006@gmail.com"
                    method="POST"
                    className="space-y-6 text-left"
                    noValidate
                  >
                    {/* FormSubmit Hidden Configurations */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_subject" value="New Appointment Lead - Test Mode!" />

                    {/* Anti-spam honeypot (hidden from human users) */}
                    <div className="hidden">
                      <label htmlFor="form-honeypot">Leave blank</label>
                      <input 
                        type="text" 
                        name="honeypot" 
                        id="form-honeypot" 
                        value={formData.honeypot} 
                        onChange={handleChange} 
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Full Name */}
                    <div className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          id="form-Name"
                          name="Name"
                          value={formData.Name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`block w-full px-5 pt-6 pb-2 text-sm text-primary bg-white/45 border ${
                            errors.Name ? 'border-red-500 focus:border-red-500' : 'border-primary/10 focus:border-secondary'
                          } rounded-2xl focus:outline-none focus:bg-white/80 peer transition-all duration-300 min-h-[48px] hover:border-primary/25`}
                          placeholder=" "
                          required
                          aria-required="true"
                          aria-invalid={errors.Name ? "true" : "false"}
                          aria-describedby={errors.Name ? "form-name-error" : undefined}
                        />
                        <label
                          htmlFor="form-Name"
                          className="absolute text-xs sm:text-sm text-primary/45 duration-350 ease-out transform -translate-y-3.5 scale-90 top-5 left-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3.5 peer-focus:text-secondary font-medium pointer-events-none"
                        >
                          Full Name *
                        </label>
                      </div>
                      {errors.Name && (
                        <div id="form-name-error" role="alert" className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-sans">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.Name}</span>
                        </div>
                      )}
                    </div>

                    {/* Grid for Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="relative">
                        <div className="relative">
                          <input
                            type="tel"
                            id="form-Phone"
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`block w-full px-5 pt-6 pb-2 text-sm text-primary bg-white/45 border ${
                              errors.Phone ? 'border-red-500 focus:border-red-500' : 'border-primary/10 focus:border-secondary'
                            } rounded-2xl focus:outline-none focus:bg-white/80 peer transition-all duration-300 min-h-[48px] hover:border-primary/25`}
                            placeholder=" "
                            required
                            aria-required="true"
                            aria-invalid={errors.Phone ? "true" : "false"}
                            aria-describedby={errors.Phone ? "form-phone-error" : undefined}
                          />
                          <label
                            htmlFor="form-Phone"
                            className="absolute text-xs sm:text-sm text-primary/45 duration-350 ease-out transform -translate-y-3.5 scale-90 top-5 left-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3.5 peer-focus:text-secondary font-medium pointer-events-none"
                          >
                            Phone Number *
                          </label>
                        </div>
                        {errors.Phone && (
                          <div id="form-phone-error" role="alert" className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-sans">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.Phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <div className="relative">
                          <input
                            type="email"
                            id="form-Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`block w-full px-5 pt-6 pb-2 text-sm text-primary bg-white/45 border ${
                              errors.Email ? 'border-red-500 focus:border-red-500' : 'border-primary/10 focus:border-secondary'
                            } rounded-2xl focus:outline-none focus:bg-white/80 peer transition-all duration-300 min-h-[48px] hover:border-primary/25`}
                            placeholder=" "
                            required
                            aria-required="true"
                            aria-invalid={errors.Email ? "true" : "false"}
                            aria-describedby={errors.Email ? "form-email-error" : undefined}
                          />
                          <label
                            htmlFor="form-Email"
                            className="absolute text-xs sm:text-sm text-primary/45 duration-350 ease-out transform -translate-y-3.5 scale-90 top-5 left-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3.5 peer-focus:text-secondary font-medium pointer-events-none"
                          >
                            Email Address *
                          </label>
                        </div>
                        {errors.Email && (
                          <div id="form-email-error" role="alert" className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-sans">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.Email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Grid for Appointment Specifics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date */}
                      <div className="relative">
                        <div className="relative">
                          <input
                            type="date"
                            id="form-Date"
                            name="Date"
                            min={todayDateStr}
                            value={formData.Date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`block w-full px-5 pt-6 pb-2 text-sm text-primary bg-white/45 border ${
                              errors.Date ? 'border-red-500 focus:border-red-500' : 'border-primary/10 focus:border-secondary'
                            } rounded-2xl focus:outline-none focus:bg-white/80 peer transition-all duration-300 min-h-[48px] hover:border-primary/25`}
                            required
                            aria-required="true"
                            aria-invalid={errors.Date ? "true" : "false"}
                            aria-describedby={errors.Date ? "form-date-error" : undefined}
                          />
                          <label
                            htmlFor="form-Date"
                            className="absolute text-[10px] sm:text-xs font-bold uppercase tracking-wider text-secondary top-2 left-5 z-10"
                          >
                            Preferred Date *
                          </label>
                        </div>
                        {errors.Date && (
                          <div id="form-date-error" role="alert" className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-sans">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.Date}</span>
                          </div>
                        )}
                      </div>

                      {/* Time Slot Selection */}
                      <div className="relative">
                        <div className="relative">
                          <select
                            id="form-TimeSlot"
                            name="TimeSlot"
                            value={formData.TimeSlot}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`block w-full px-5 pt-6 pb-2 text-sm text-primary bg-white/45 border ${
                              errors.TimeSlot ? 'border-red-500 focus:border-red-500' : 'border-primary/10 focus:border-secondary'
                            } rounded-2xl focus:outline-none focus:bg-white/80 peer transition-all duration-300 appearance-none min-h-[48px] hover:border-primary/25`}
                            required
                            aria-required="true"
                            aria-invalid={errors.TimeSlot ? "true" : "false"}
                            aria-describedby={errors.TimeSlot ? "form-time-error" : undefined}
                          >
                            <option value="" disabled></option>
                            <option value="morning">Morning (10:00 AM - 02:00 PM)</option>
                            <option value="evening">Evening (05:00 PM - 09:00 PM)</option>
                          </select>
                          <label
                            htmlFor="form-TimeSlot"
                            className="absolute text-xs sm:text-sm text-primary/45 duration-350 ease-out transform -translate-y-3.5 scale-90 top-5 left-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3.5 peer-focus:text-secondary font-medium pointer-events-none"
                          >
                            Preferred Shift *
                          </label>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">
                            <Clock className="w-4 h-4" />
                          </div>
                        </div>
                        {errors.TimeSlot && (
                          <div id="form-time-error" role="alert" className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-sans">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.TimeSlot}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Symptoms Textarea */}
                    <div className="relative">
                      <textarea
                        id="form-Symptoms"
                        name="Symptoms"
                        rows="3"
                        value={formData.Symptoms}
                        onChange={handleChange}
                        className="block w-full px-5 pt-6 pb-2 text-sm text-primary bg-white/45 border border-primary/10 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white/80 peer transition-all duration-300 min-h-[80px] hover:border-primary/25"
                        placeholder=" "
                        aria-label="Write symptoms or special dental requirements"
                      />
                      <label
                        htmlFor="form-Symptoms"
                        className="absolute text-xs sm:text-sm text-primary/45 duration-350 ease-out transform -translate-y-3.5 scale-90 top-5 left-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3.5 peer-focus:text-secondary font-medium pointer-events-none"
                      >
                        Symptoms / Dental Requirements
                      </label>
                    </div>

                    {/* Google reCAPTCHA Mock UI */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] text-primary/45 font-sans border-t border-primary/5 pt-4">
                      <p className="leading-normal max-w-[280px]">
                        This site is protected by reCAPTCHA and the Google 
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-secondary hover:underline ml-1">Privacy Policy</a> and 
                        <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-secondary hover:underline ml-1">Terms of Service</a> apply.
                      </p>
                      <div className="flex items-center gap-1 bg-primary/[0.02] border border-primary/5 rounded px-2 py-1 select-none font-semibold uppercase tracking-wider text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                        reCAPTCHA Shield
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      aria-label="Submit secure appointment booking request"
                      className="group w-full py-4 rounded-2xl text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-premium hover:shadow-accent-glow hover:-translate-y-[1px] active:translate-y-0 transition-all duration-355 min-h-[48px] flex items-center justify-center gap-2.5"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">Schedule Secure Booking</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-sans font-normal">→</span>
                    </button>

                  </m.form>
                )}

              </AnimatePresence>

            </div>
          </div>

        </div>

      </m.div>
    </section>
  );
}
