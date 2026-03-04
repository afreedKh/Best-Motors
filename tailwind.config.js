/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F59E0B',
        'primary-hover': '#D97706',
        secondary: '#1F2937',
        background: '#050505',
        surface: '#121212',
        'surface-highlight': '#1E1E1E',
        'text-muted': '#A3A3A3',
        border: '#27272a',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { boxShadow: '0 5px 20px rgba(37, 211, 102, 0.4)' },
          '50%': { boxShadow: '0 5px 30px rgba(37, 211, 102, 0.7)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease forwards',
        bounce: 'bounce 2s infinite',
        pulse: 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
}
