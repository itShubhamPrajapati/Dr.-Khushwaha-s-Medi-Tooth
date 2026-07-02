# 🦷 Dr. Khushwaha's Medi-Tooth Dental Clinic

[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11.17-FF0080?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A premium, patient-centric, and high-performance dental clinic web application designed for **Dr. Khushwaha's Medi-Tooth Clinic** (Nalasopara East, Vasai-Virar, MH). Built with React 18, Tailwind CSS, and Vite, featuring fluid motion graphics, interactive maps, and secure local appointment scheduling.

---

## 📸 Demo & Visual Showcase

### 🖥️ Desktop Preview
*(Place your high-resolution desktop mockup or landing page screenshot here)*
```
+-------------------------------------------------------------------+
|  [Logo] Dr. Khushwaha's Medi-Tooth   Home  Services  About  Book  |
|                                                                   |
|   EXPERIENCE PREMIUM, PAINLESS DENTAL CARE                        |
|   Your Smile is Our Priority. Dedicated to Aesthetic Excellence.   |
|                                                                   |
|   [ Book Free Consultation ]   [ Explore Aesthetic Services ]      |
+-------------------------------------------------------------------+
```

### 📱 Responsive Layout & Features
| Interactive Before/After Slider | Smooth Aesthetic Modals | Real-Time Shift Scheduler |
| :---: | :---: | :---: |
| *Visualize clinical dental transformations via custom drag handle* | *Veneers, Smile Makeovers, and Implant blueprints with doctor notes* | *Spam-protected appointment forms with automatic timezone status* |

---

## ✨ Core Features

*   🩺 **Aesthetic Services Catalogue**: Interactive, overlay modals displaying details on Porcelain Veneers, Composite Bonding, Smile Aligners, and Implant procedures complete with recovery advice and treatment duration details.
*   🎚️ **Before & After Interactive Slider**: A drag-to-reveal custom component that allows patients to visually compare dental transformations in real time.
*   📅 **Spam-Proof Appointment Scheduler**: Secure client-side booking wizard containing field validation, dynamic error handling, and robust bot prevention (Anti-Spam Honeypot + simulated invisible Google reCAPTCHA v3 token handshake).
*   🟢 **Live Operating Status Badge**: An automated time tracker that updates every 60 seconds to display if the clinic is "Open Now" or "Closed" based on Indian Standard Time (IST) shift parameters.
*   🗺️ **Interactive Geographic Map**: Leaflet-powered interactive map containing clinic pinpoints, directional overlays, and contact integrations.
*   📱 **Mobile-First Action Bar**: Floating WhatsApp widgets and quick-dial overlays for direct, single-click patient communication on mobile devices.
*   ⚡ **Enterprise-Grade Performance & SEO**: Features lazy-loaded below-the-fold components, SVG icon drawing, local Dentist Schema (JSON-LD JSON injection), and custom Open Graph protocol support.

---

## 🛠️ Tech Stack & Utilities

| Category | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | React 18 (JS ES Module) | Modern Component-Based SPA architecture. |
| **Build & Bundler** | Vite 5 | Instant Hot Module Replacement (HMR) and optimized building. |
| **Styling** | Tailwind CSS 3 & PostCSS | Utility-first styling with custom fluid gradients. |
| **Animations** | Framer Motion 11 | Smooth entry fades, card tilts, drawer transitions, and lazy loading. |
| **Mapping** | Leaflet.js & React-Leaflet | Lightweight interactive map widget. |
| **Icons** | Lucide React | Clean, scalable vector outline iconography. |
| **SEO** | JSON-LD Schema | Local Business Structured Data for Google Rich Snippets. |

---

## 📁 Project Directory Structure

```text
DR KUSHWAHA/
├── public/                 # Static assets (icons, images, webp layouts)
├── src/
│   ├── assets/             # Dr. portraits and clinic visual media
│   ├── components/         # Reusable structural UI blocks
│   │   ├── About.jsx             # Doctor qualifications & 3D tilt card
│   │   ├── AppointmentForm.jsx   # Form validation & security validation
│   │   ├── BeforeAfterSlider.jsx # Slide comparison controller
│   │   ├── FloatingWhatsApp.jsx  # Fixed support widget
│   │   ├── Footer.jsx            # Dynamic links, copyright & socials
│   │   ├── Header.jsx            # Scroll-shrink navigations & burger menu
│   │   ├── Hero.jsx              # CTA section & preloaded LCP asset
│   │   ├── MapAndHours.jsx       # Leaflet maps and operational timetables
│   │   ├── Reviews.jsx           # Responsive swipeable carousel
│   │   ├── Services.jsx          # Interactive clinical procedures blueprints
│   │   └── StickyMobileBar.jsx   # Mobile bottom dialing bar
│   ├── App.jsx             # Root layout container & Suspense routing
│   ├── index.css           # Global custom classes & animations
│   └── main.jsx            # React root DOM mounting point
├── app.js                  # Vanilla JS fallback actions
├── index.html              # Shell HTML with meta tags & SEO declarations
├── tailwind.config.js      # Custom theme palettes and animations config
├── vite.config.js          # Vite build presets and plugins
├── package.json            # Scripts, dependency manifests, and tooling info
└── README.md               # Repository documentation
```

---

## 🚀 Local Installation & Setup Guide

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) before proceeding.

### 1. Clone the Repository
```bash
git clone https://github.com/itShubhamPrajapati/Dr.-Khushwaha-s-Medi-Tooth.git
cd DR-KUSHWAHA
```

### 2. Install Development Dependencies
Install packages listed in `package.json`:
```bash
npm install
```

### 3. Launch Local Development Server
Execute the local vite server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to see the clinic site in action.

### 4. Build for Production
To bundle the application into static HTML/CSS/JS files optimized for hosting environments (Vercel, Netlify, GitHub Pages, etc.):
```bash
npm run build
```
The output assets will be generated in the `/dist` directory.

---

## 📡 API Integration Blueprint (Future Scope)

While this application runs completely client-side for rapid response and serverless hosting, the following REST API schema is planned for backend integration:

| Method | Endpoint | Description | Payloads | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/appointments` | Request a dental booking slot | `{ Name, Phone, Email, Date, TimeSlot, Symptoms, RecaptchaToken }` | `201 Created` (Booking Details + ID) |
| `GET` | `/api/v1/clinic/status` | Fetch real-time status of the clinic | None | `200 OK` (`{ isOpen: true, holiday: false }`) |
| `POST` | `/api/v1/reviews` | Submit patient reviews for admin validation | `{ Name, Rating, Comment, VerificationCode }` | `202 Accepted` |

---

## ✍️ Author & Open Source Contributor

*   **Shubham Prajapati** - *Full Stack Developer*
    *   GitHub: [@itShubhamPrajapati](https://github.com/itShubhamPrajapati)
    *   LinkedIn: [Shubham Prajapati](https://www.linkedin.com/in/itshubhamprajapati/)
    *   Email: [shubhamprajapati@example.com](mailto:shubhamprajapati@example.com) *(Optional placeholder - update with your actual contact address)*

*   **Project Sponsor & Specialist**: Dr. Sangya Khushwaha (B.D.S, F.A.A.D)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
