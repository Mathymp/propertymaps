/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f4f7f5',
          100: '#e5ebe6',
          200: '#c8d9cc',
          300: '#9bbda5',
          400: '#6a9c78',
          500: '#3d7051',
          600: '#2d5a3f',
          700: '#22442f',
          800: '#1b3325',
          900: '#122218',
          950: '#0a1510',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
