/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F8F7F4',
        ink: '#191C20',
        'ink-secondary': '#6B6F76',
        hope: '#BEA06E',
        mist: '#E8EDF2',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-shift': 'gradient-shift 60s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(190, 160, 110, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(190, 160, 110, 0.6)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
