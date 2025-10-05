
import { PluginAPI } from 'tailwindcss/types/config';

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		letterSpacing: {
  			'1': '5px'
  		},
  		colors: {
  			'bg-dashboard': '#171920',
  			'app-item': '#262933',
  			'dash-menu': '#0B0E11',
  			'dash-nav-text': '#7D7D7D',
  			'dash-text': '#C5C9DB',
  			'dash-text2': '#B6B6B6',
  			'dash-bg': '#0b0e11',
  			'dash-item': '#15171E',
  			'nav-text': '#C5C9DB',
  			'nav-text2': '#dcdfeb',
  			blue: '#058490',
  			green: '#078466',
  			blue2: 'rgba(5,132,144,0.30015756302521013)',
  			green2: 'rgba(7,132,102,0.31416316526610644)',
  			'neon-blue': '#0ff',
  			'neon-pink': '#ff0af0',
  			'dark-bg': '#0a0a0a',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		backgroundColor: {
  			custom: '#2626265c',
  			'custom-btn': '#262626ab',
  			'custom-bg': '#0b0e11',
  			'custom-menu-bg': '#191919',
  			'custom-modal': 'rgba(0, 0, 0, 0.764)'
  		},
  		width: {
  			'calc-100-minus-12rem': 'calc(100% - 13rem)',
  			'calc-submenu': 'calc(100% - 3rem)'
  		},
  		height: {
  			'h-culti': 'calc(100vh - 1rem)'
  		},
  		textColor: {
  			'custom-blue': '#38a3ca'
  		},
  		rotate: {
  			'180': '-180deg'
  		},
  		boxShadow: {
  			custom: '0 5px 30px -16px #06b6d4',
  			custom2: '0 0px 50px -10px #02b6d4',
  			custom3: '0 1px 30px -7px #02b6d4',
  			neon: '0 0 20px rgba(0, 255, 255, 0.5)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.vertical-lr': {
          writingMode: 'vertical-lr',
        },
        '.vertical-rl': {
          writingMode: 'vertical-rl',
        },
        '.horizontal-tb': {
          writingMode: 'horizontal-tb',
        },
      }

      addUtilities(newUtilities)
    },
      require("tailwindcss-animate")
],
}