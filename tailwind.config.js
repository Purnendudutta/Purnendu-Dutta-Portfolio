/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          glow: 'var(--primary-glow)',
          secondary: 'var(--secondary)',
          'secondary-glow': 'var(--secondary-glow)',
        },
        surface: {
          bg: 'var(--bg-base)',
          card: 'var(--bg-card)',
          'card-hover': 'var(--bg-card-hover)',
          border: 'var(--border-color)',
          'border-highlight': 'var(--border-highlight)',
          text: 'var(--text-main)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
        },
      },
      boxShadow: {
        'neon': '0 0 20px var(--primary-glow), 0 0 40px var(--primary-glow)',
        'neon-sm': '0 0 10px var(--primary-glow)',
        'neon-lg': '0 0 30px var(--primary-glow), 0 0 60px var(--primary-glow)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'futuristic-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
      },
    },
  },
  plugins: [],
};
