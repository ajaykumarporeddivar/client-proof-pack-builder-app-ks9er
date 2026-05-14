/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#3B82F6', // A primary blue for the brand
        accent: '#F97316', // An orange accent for CTAs
        statusDraft: '#6B7280', // Gray for 'Draft' status
        statusReady: '#22C55E', // Green for 'Ready for Export'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}