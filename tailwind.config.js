/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7a1012',
        primary2: '#5c0000',
        comment: '#f8f2f2',
        secondary: '#480000',
        required: '#320505',
        dark: '#200000',
        background: '#0c0000',
        background2: '#fef5f6'
      }
    },
    fontFamily: {
      montserrat: ['Montserrat Alternates', 'sans - serif']
    }
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [], 
    base: false,
    styled: true,
    utils: true,
  }
};
