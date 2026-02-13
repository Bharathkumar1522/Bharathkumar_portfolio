/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff014f',
        secondary: '#ff4d00',
        tertiary: '#0d1013',
        gray: {
          50: '#f6f6f6',
          100: '#f4f5f6',
          200: '#E4E6EA',
          300: '#CED0D4',
          400: '#c4cfde',
          500: '#878e99',
          600: '#6c7279',
          700: '#3c3e41',
          800: '#23272b',
          900: '#1e2024',
        },
        dark: {
          bg: '#212428',
          card: '#1e2024',
          text: '#c4cfde',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'card': '5px 5px 15px #D1D9E6, -5px -5px 15px #ffffff',
        'card-hover': '10px 10px 20px #D1D9E6, -10px -10px 20px #ffffff',
        'neumorphism': '24px 24px 48px #a6a6a6, -24px -24px 48px #ffffff',
        'neumorphism-soft': '5px 5px 15px #D1D9E6, -5px -5px 15px #ffffff',
        'neumorphism-inset': 'inset 5px 5px 15px #D1D9E6, inset -5px -5px 15px #ffffff',
        'dark-card': '10px 10px 19px #1c1e22, -10px -10px 19px #262a2e',
        'dark-neumorphism': '5px 5px 15px #191b1e, -5px -5px 15px #272b2f',
        'dark-neumorphism-inset': 'inset 5px 5px 15px #191b1e, inset -5px -5px 15px #272b2f',
      },
      backgroundImage: {
        'neumorphism': 'linear-gradient(145deg, #cacaca, #f0f0f0)',
        'neumorphism-soft': 'linear-gradient(145deg, #e2e8ec, #ffffff)',
        'dark-gradient': 'linear-gradient(145deg, #1e2024, #23272b)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
