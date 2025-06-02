module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  important: true,
  theme: {
    extend: {
      colors: ({ colors }) => ({
        // https://tailwindcss.com/docs/customizing-colors
        'theme': colors.neutral,
        'primary': colors.amber,
        'danger': colors.rose,
        'success': colors.green,
      })
    }
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}