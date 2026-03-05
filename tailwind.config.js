/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'opt-violet':   'var(--opt-violet)',
        'opt-dark':     'var(--opt-dark)',
        'opt-coral':    'var(--opt-coral)',
        'opt-fond':     'var(--opt-fond)',
        'opt-text':     'var(--opt-text)',
        'opt-muted':    'var(--opt-muted)',
        'opt-card':     'var(--opt-card)',
        'opt-surface':  'var(--opt-surface)',
        'opt-border':   'var(--opt-border)',
        'opt-input-bg': 'var(--opt-input-bg)',
        'opt-bg':       'var(--opt-bg)',
        'opt-bg-secondary': 'var(--opt-bg-secondary)',
      },
      fontFamily: {
        titre: ['"DM Sans"', '"Trebuchet MS"', 'Arial', 'sans-serif'],
        body:  ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'opt-gradient': 'linear-gradient(135deg, #c607b3, #eb5074)',
        'opt-gradient-dark': 'linear-gradient(135deg, #530054, #c607b3)',
      },
      boxShadow: {
        card:         'var(--opt-shadow-card)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.10)',
        'glow':       '0 0 20px rgba(198, 7, 179, 0.18), 0 0 40px rgba(198, 7, 179, 0.08)',
        'glow-cta':   '0 0 20px rgba(235, 80, 116, 0.18), 0 0 40px rgba(235, 80, 116, 0.08)',
      },
    },
  },
  plugins: [],
}
