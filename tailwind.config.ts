import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy support
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Design Token System
        surface: {
          0: "var(--bg-0)",
          1: "var(--bg-1)",
          2: "var(--bg-2)",
        },
        text: {
          primary: "var(--text-0)",
          secondary: "var(--text-1)",
          tertiary: "var(--text-2)",
        },
        accent: {
          DEFAULT: "var(--accent-0)",
          hover: "var(--accent-0-hover)",
          secondary: "var(--accent-1)",
        },
        line: "var(--line)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['var(--step-display)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['var(--step-h1)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2': ['var(--step-h2)', { lineHeight: '1.25' }],
        'lead': ['var(--step-lead)', { lineHeight: '1.5' }],
        'body': ['var(--step-body)', { lineHeight: '1.6' }],
        'meta': ['var(--step-meta)', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
        '5xl': 'var(--space-5xl)',
        '6xl': 'var(--space-6xl)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'hover': 'var(--shadow-hover)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-move': 'grid-move 20s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.8s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'magnetic-hover': 'magnetic-hover 0.18s ease-out',
      },
      transitionTimingFunction: {
        'premium': 'var(--ease-premium)',
        'bounce': 'var(--ease-bounce)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      keyframes: {
        'grid-move': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(30px, 30px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        'magnetic-hover': {
          '0%': {
            transform: 'scale(1) translateY(0)',
          },
          '100%': {
            transform: 'scale(1.02) translateY(-2px)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;