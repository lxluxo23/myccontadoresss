/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        dark: '0 4px 6px -1px rgba(0, 0, 0, 0.7), 0 2px 4px -1px rgba(0, 0, 0, 0.6)',
      },
      colors: {
        darkCard: '#334155', // Azul oscuro específico para contenedores
        darkBackground: '#1e293b', // Fondo general de la app
        darkText: '#e2e8f0', // Texto claro para modo oscuro
        darkAccent: '#38bdf8',
        darkError: '#f87171',
      },
    },
  },
  plugins: [],
}
