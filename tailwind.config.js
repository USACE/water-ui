/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
