/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      blue: {
        primary: '#111827',
        secondary: '#192337',
        border: '#233251',
        light: '#232F48',
        url: '#2C3B58'
      },
      gray: {
        primary: '#CED9E9',
        secondary: '#96A8C7',
        inactiveButton: '#778BAE',
        newButton: '#A8B8D2',
        newButtonBorder: '#425477'
      },
      white: {
        primary: '#F2F7FF'
      },
      purple: {
        primary: '#513985',
        secondary: '#DCCAFF'
      },
      button: {
        active: '#2676E7',
        inactive: '#374768'
      },
      input: {
        label: '#A9D2FF',
        borderActive: '#7BB3F8'
      },
      red: {
        primary: '#F78585'
      }
    }
  },

  plugins: []
};
