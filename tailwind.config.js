/** @type {import('tailwindcss').Config} */

// Los colores se resuelven contra las variables CSS de src/index.css.
// El formato "rgb(var(--x) / <alpha-value>)" permite usar bg-surface/60.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: token('brand-50'),   100: token('brand-100'), 200: token('brand-200'),
          300: token('brand-300'), 400: token('brand-400'), 500: token('brand-500'),
          600: token('brand-600'), 700: token('brand-700'), 800: token('brand-800'),
          900: token('brand-900'), 950: token('brand-950'),
          DEFAULT: token('brand-500'),
          fg: token('brand-fg'),
        },
        bg:        { DEFAULT: token('bg'), subtle: token('bg-subtle') },
        surface:   { DEFAULT: token('surface'), 2: token('surface-2'), sunken: token('surface-sunken') },
        line:      { DEFAULT: token('border'), strong: token('border-strong') },
        fg:        { DEFAULT: token('fg'), muted: token('fg-muted'), subtle: token('fg-subtle') },
        'on-brand': token('on-brand'),
        // Plano = rellenos y bordes · "-fg" = texto e iconos (contraste AA)
        success: { DEFAULT: token('success'), fg: token('success-fg') },
        warning: { DEFAULT: token('warning'), fg: token('warning-fg') },
        danger:  { DEFAULT: token('danger'),  fg: token('danger-fg') },
        info:    { DEFAULT: token('info'),    fg: token('info-fg') },
      },

      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body:    ['"Inter Tight"', 'system-ui', 'sans-serif'],
        serif:   ['Newsreader', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      // Escala tipográfica fluida — un solo sitio donde ajustar los títulos
      fontSize: {
        'display-1': ['clamp(2.25rem, 1.2rem + 5.2vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-2': ['clamp(1.85rem, 1.1rem + 3.4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em',  fontWeight: '800' }],
        'display-3': ['clamp(1.5rem, 1.05rem + 2.1vw, 2.375rem)', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'title':     ['clamp(1.125rem, 1rem + 0.6vw, 1.375rem)',  { lineHeight: '1.3',  letterSpacing: '-0.015em', fontWeight: '700' }],
        'lead':      ['clamp(1rem, 0.95rem + 0.35vw, 1.125rem)',  { lineHeight: '1.65' }],
        'eyebrow':   ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '700' }],
      },

      spacing: {
        'section':    'clamp(4rem, 8vw, 7.5rem)',
        'section-sm': 'clamp(2.5rem, 5vw, 4.5rem)',
      },

      maxWidth: {
        content: '72rem',  // secciones anchas
        prose:   '46rem',  // artículos y texto largo
        narrow:  '38rem',  // formularios, FAQ
      },

      borderRadius: {
        card: '1.25rem',
        pill: '9999px',
      },

      // Escala de elevación única — nada de sombras inventadas por componente
      boxShadow: {
        e1: '0 1px 2px rgb(var(--shadow-color) / var(--shadow-strength))',
        e2: '0 2px 8px -2px rgb(var(--shadow-color) / var(--shadow-strength)), 0 1px 3px rgb(var(--shadow-color) / calc(var(--shadow-strength) * 0.6))',
        e3: '0 8px 24px -6px rgb(var(--shadow-color) / var(--shadow-strength)), 0 2px 6px rgb(var(--shadow-color) / calc(var(--shadow-strength) * 0.5))',
        e4: '0 20px 48px -12px rgb(var(--shadow-color) / calc(var(--shadow-strength) * 1.4)), 0 4px 12px rgb(var(--shadow-color) / calc(var(--shadow-strength) * 0.5))',
        glow: '0 8px 28px -6px rgb(var(--brand-500) / 0.42)',
        'glow-sm': '0 4px 14px -4px rgb(var(--brand-500) / 0.4)',
      },

      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'smooth':    'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },

      zIndex: {
        base: '1', raised: '10', sticky: '30', nav: '40',
        overlay: '60', modal: '80', grain: '90', toast: '100',
      },

      animation: {
        marquee: 'marquee 38s linear infinite',
        float:   'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
}
