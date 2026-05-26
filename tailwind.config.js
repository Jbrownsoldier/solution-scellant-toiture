/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2540',       // Rich Navy Blue from Solution Scellant Toiture prestige identity
          container: '#153A60',
        },
        secondary: {
          DEFAULT: '#0066CC',       // Vibrant Blue representing water-repellency and sealing
          fixed: '#3B82F6',
          container: '#0066CC',
        },
        'on-secondary-container': '#FFFFFF',
        tertiary: {
          DEFAULT: '#0052CC',       // Slightly darker blue for hover states
        },
        surface: {
          DEFAULT: '#FFFFFF',       // Pristine pure white background for modern premium feel
          container: {
            lowest: '#FFFFFF',
            low: '#F8FAFC',
            DEFAULT: '#F1F5F9',
            highest: '#E2E8F0',
          }
        },
        outline: {
          variant: '#CBD5E1',
        },
        // High-contrast legible text scale
        prose: {
          high:   '#0F172A',        // Dark slate for high legibility
          mid:    '#475569',
          low:    '#64748B',
          accent: '#0066CC',        // Vibrant Blue for highlights
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
        ambient:  '0 4px 32px rgba(10, 37, 64, 0.05)',
        'glow-sm': '0 0 16px rgba(0, 102, 204, 0.12)',
        'glow-md': '0 0 32px rgba(0, 102, 204, 0.18)',
        'glow-lg': '0 0 64px rgba(0, 102, 204, 0.24)',
        'glass':   '0 8px 32px rgba(10, 37, 64, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        'glass-lg':'0 24px 64px rgba(10, 37, 64, 0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
