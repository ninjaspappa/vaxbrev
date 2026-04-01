import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'forest-green': '#1B3A2D',
        gold: '#C8A96E',
        'gold-dark': '#A8893E',
        'forest-light': '#2A5040',
        'cream-dark': '#EDE8DC',
        ink: '#1A1A1A',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(27, 58, 45, 0.08)',
        'card-hover': '0 8px 40px rgba(27, 58, 45, 0.14)',
      },
    },
  },
  plugins: [],
}

export default config
