import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      brand: {
        blue: '#2b41ff',
      },
      surface: {
        muted: '#f2f2f2',
        border: '#e8e8e8',
      },
      text: {
        primary: '#333333',
        secondary: '#777777',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
  },
  shortcuts: {
    'btn-readmore':
      'inline-block w-full text-center py-2 px-4 bg-surface-muted text-text-primary text-sm no-underline hover:bg-surface-border transition-colors rounded-sm',
    'nav-link': 'text-text-primary text-sm no-underline hover:opacity-80 whitespace-nowrap',
  },
})
