/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '375px',
      'md': '768px',   
      'lg': '1024px',  
      'xl': '1440px',  
      '2xl': '1800px', 
      'lg-tall': { 'raw': '(min-width: 1024px) and (min-height: 1000px)' },
    }
  },
  plugins: [],
};
