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
        'medical-blue': {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a9f8',
          500: '#0e8ce9',
          600: '#026ec7',
          700: '#0358a1',
          800: '#074b85',
          900: '#0c3f6f',
          950: '#082849',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
