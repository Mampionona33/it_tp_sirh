/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        customBlue: {
          400: '#9091c1',
          200: '#bfc0d3',
        },
        customRed: {
          900: '#da200d',
          800: '#f19088',
          200: '#fbbeb7',
          100: '#fcd3cf',
          50: '#fee9e7',
        },
      },
      width: {
        '10/100': '10%',
      },
      screens: {
        mobile: '400px',
      },
    },
  },
  plugins: [],
}
