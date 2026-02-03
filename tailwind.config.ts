import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'Noto Sans', 'ui-sans-serif', 'system-ui'],
        medical: ['Noto Sans', 'sans-serif'],
      },
      colors: {
        'clinical-black': '#000000',
        'clinical-dark': '#0A0A0A',
        'clinical-border': '#1F2937',
        'medical-teal': {
          50: '#f4f9f9',
          100: '#e1efef',
          200: '#c7e0e0',
          300: '#9fc7c7',
          400: '#75a8a8',
          50: '#5DA5A5', // Core color
          500: '#5da5a5',
          600: '#4a8585',
          700: '#3f6d6d',
          800: '#375959',
          900: '#314c4c',
          950: '#1b2c2c',
        },
        'medical-blue': {
          50: '#f4f9f9',
          100: '#e1efef',
          200: '#c7e0e0',
          300: '#9fc7c7',
          400: '#75a8a8',
          500: '#5da5a5',
          600: '#4a8585',
          700: '#3f6d6d',
          800: '#375959',
          900: '#314c4c',
          950: '#1b2c2c',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
