/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        128: '32rem',
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  darkMode: 'class', //comment out to allow OS to determine dark/light mode
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
};
