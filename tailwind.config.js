/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D3E50',       // dark charcoal from Solution Scellant Toiture logo
          container: '#3A4F63',
        },
        secondary: {
          DEFAULT: '#1A9E8F',       // teal from Solution Scellant Toiture logo
          fixed: '#7DD4C9',
          container: '#1A9E8F',
        },
        'on-secondary-container': '#2D3E50',
        tertiary: {
          DEFAULT: '#14796E',
        },
        surface: {
          DEFAULT: '#0E1B2A',       // deep dark for backgrounds
          container: {
            lowest: '#091420',
            low: '#0F1F30',
            DEFAULT: '#142B3F',
            highest: '#1C3650',
          }
        },
        outline: {
          variant: '#2A4560',
        },
        // High-contrast text scale
        prose: {
          high:   '#F1F5F9',
          mid:    '#94A3B8',
          low:    '#475569',
          accent: '#1A9E8F',        // teal for highlights
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Work Sans', 'sans-serif'],
        headline: ['Work Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        'headline-tight': '-0.04em',
        'headline-ultra': '-0.06em',
        'label':           '0.12em',
        'label-wide':      '0.18em',
      },
      lineHeight: {
        'display': '0.92',
        'heading': '1.1',
        'relaxed-body': '1.75',
      },
      boxShadow: {
        ambient:  '0 4px 32px rgba(45, 62, 80, 0.08)',
        'glow-sm': '0 0 16px rgba(26,158,143,0.18)',
        'glow-md': '0 0 32px rgba(26,158,143,0.24)',
        'glow-lg': '0 0 64px rgba(26,158,143,0.30)',
        'glass':   '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-lg':'0 24px 64px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
