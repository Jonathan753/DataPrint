/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': {
          'main': '#F1F5F9',    // <-- AJUSTADO AQUI: Fundo com mais contraste
          'surface': '#FFFFFF', // Agora vai se destacar claramente
        },
        'text': {
          'primary': '#1E293B',
          'secondary': '#64748B',
          'disabled': '#94A3B8',
        },
        'accent': {
          'primary': '#3B82F6',
          'hover': '#60A5FA',
        },
        'border': '#E2E8F0',
        'feedback': {
          'success': '#16A34A',
          'warning': '#F59E0B',
          'error': '#DC2626',
        },
      },
    },
  },
  plugins: [],
}