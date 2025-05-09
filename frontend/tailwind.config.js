// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust as needed
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-at-b': 'radial-gradient(ellipse at bottom, var(--tw-gradient-stops))',
        // You can add more like 'radial-at-t', 'radial-at-tr', etc.
      },
    },
  },
  plugins: [],
}
