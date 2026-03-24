/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0e8',
          100: '#ebe5d9',
          200: '#d6caad',
          300: '#c2af82',
          400: '#ad9456',
          500: '#987940',
          600: '#795d35',
          700: '#5a442a',
          800: '#3c2c1f',
          900: '#1d1614'
        },
        accent: {
          50: '#f5f3e8',
          100: '#ebe7d6',
          200: '#d6caad',
          300: '#c2ad82',
          400: '#ad9056',
          500: '#9a7d40',
          600: '#7a6236',
          700: '#5a472c',
          800: '#3c2e22',
          900: '#1e1814'
        },
        warm: '#d4a574',
        gold: '#c9a961',
        cream: '#f5f1e8'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Cormorant', 'serif']
      }
    }
  },
  plugins: []
}
