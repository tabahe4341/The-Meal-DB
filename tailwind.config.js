/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f1f1c',
        cream: '#fff7eb',
        saffron: '#ffb949',
        herb: '#2f6f56',
        coral: '#e76f51',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 32px -18px rgba(31, 31, 28, 0.45)',
      },
      backgroundImage: {
        'grain-glow':
          'radial-gradient(circle at 20% 20%, rgba(255, 185, 73, 0.35), transparent 50%), radial-gradient(circle at 80% 0%, rgba(47, 111, 86, 0.25), transparent 35%), linear-gradient(120deg, #fffaf2 0%, #fff4df 100%)',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatIn: 'floatIn 550ms ease-out both',
      },
    },
  },
  plugins: [],
};
