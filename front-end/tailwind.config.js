/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        customBlue: {
          950: '#000926',
          940: '#000A3B',
          930: '#000A50',
          900: '#010765',
          800: '#04047A',
          400: '#9091c1',
          200: '#bfc0d3',
          100: '#8375EE',
          50: '#C3B6FD',
          25: '#F5F2FF',
        },
        customRed: {
          950: '#26000B',
          940: '#520014',
          930: '#7E0118',
          900: '#da200d',
          800: '#D6111E',
          200: '#EE4748',
          100: '#FA8181',
          50: '#FEBABA',
          25: '#FFF2F2',
        },
        customGray: {
          50: '#eeeded',
        },
      },
      width: {
        '10/100': '10%',
      },
      screens: {
        mobile: '320px',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-20px)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'bounce-200': 'bounce 1s infinite 200ms',
        'bounce-400': 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [],
}
