/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 🔄 Enable class-based dark mode
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",       // ⬅ src support
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // ⬅ app directory support (Next 13+)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",     // ⬅ classic pages support
    "./components/**/*.{js,ts,jsx,tsx,mdx}" // ⬅ reusable UI components
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 AION Tokens (via CSS variables)
        'aion-primary': 'var(--aion-primary)',
        'aion-secondary': 'var(--aion-secondary)',
        'aion-accent': 'var(--aion-accent)',
        'aion-danger': 'var(--aion-danger)',
        'aion-muted': 'var(--aion-muted)',
        'aion-bg': 'var(--aion-bg)',
        'aion-fg': 'var(--aion-fg)',
      },
      backgroundColor: {
        'aion-primary': 'var(--aion-primary)',
        'aion-bg': 'var(--aion-bg)',
      },
      textColor: {
        'aion-primary': 'var(--aion-primary)',
        'aion-muted': 'var(--aion-muted)',
        'aion-fg': 'var(--aion-fg)',
      },
      fontFamily: {
        sans: ['var(--aion-font)', 'sans-serif'], // ⬅ dynamic font binding
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite", // ⬅ για playful elements
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  safelist: [
    // ⛑ χρήσιμο για SSR/conditional rendering
    'bg-aion-primary',
    'bg-aion-bg',
    'text-aion-primary',
    'text-aion-muted',
    'text-aion-fg',
    'dark:bg-aion-bg',
    'dark:text-aion-fg',
  ],
  plugins: [], // ⬅ μπορείς να προσθέσεις typography/forms κλπ εδώ
};