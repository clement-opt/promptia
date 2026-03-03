/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'opt-violet': '#6A1268',
        'opt-dark':   '#080112',
        'opt-coral':  '#C43D5C',
        'opt-fond':   '#F7F6FA',
        'opt-text':   '#1A1A2E',
        'opt-muted':  '#4A4A6A',
      },
      fontFamily: {
        titre: ['"Trebuchet MS"', 'Arial', 'sans-serif'],
        body:  ['Calibri', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card:       '0 2px 8px rgba(10, 0, 18, 0.08)',
        'card-hover': '0 4px 16px rgba(10, 0, 18, 0.12)',
      },
    },
  },
  plugins: [],
}
