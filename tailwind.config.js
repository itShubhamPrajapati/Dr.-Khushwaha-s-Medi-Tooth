/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1128',
          light: '#132047',
          dark: '#030611',
        },
        secondary: {
          DEFAULT: '#1C77C3',
          light: '#4092D7',
          dark: '#145B96',
        },
        accent: {
          gold: {
            DEFAULT: '#D4AF37',
            light: '#F3E5AB',
            dark: '#AA7C11',
          },
          teal: {
            DEFAULT: '#48C0A4',
            light: '#72D6BF',
            dark: '#2E8C76',
          }
        },
        pearl: {
          DEFAULT: '#FAFAFA',
          dark: '#F3F3F3',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"SF Pro Display"', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 8px 32px 0 rgba(10, 17, 40, 0.05)',
        'glass': '0 8px 32px 0 rgba(10, 17, 40, 0.08)',
        'glass-lg': '0 12px 40px 0 rgba(10, 17, 40, 0.12)',
        'premium': '0 20px 50px rgba(10, 17, 40, 0.15)',
        'accent-glow': '0 0 20px rgba(28, 119, 195, 0.25)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
