/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    './src/**/*.{html,js,svelte,ts}',
  "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
],
  theme: {
    extend: {
      colors:{
        'background': '#538EE8',
        'qpurple': '#452E44',
        'qorange': '#F7B060',
        'qyellow': '#F9F871',
        'cream': '#F3F9D2'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],

  darkMode: 'class',
}

