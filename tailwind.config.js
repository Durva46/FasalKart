/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B5E20', // deep forest green
          light: '#2E7D32',   // soft emerald
          dark: '#0D3813',
          50: '#F1F8F2',
          100: '#DCEDDD',
          500: '#2E7D32',
          600: '#1B5E20',
          700: '#154A19',
        },
        harvest: {
          DEFAULT: '#F9A825', // warm harvest gold
          light: '#FBC02D',
          dark: '#F57F17',
          50: '#FEF9E7',
          100: '#FCF2C3',
        },
        cream: {
          DEFAULT: '#FAF8F3', // creamy off-white background
          card: '#FFFFFF',
          dark: '#121814',
          subtle: '#F4EFE6',
        },
        charcoal: {
          DEFAULT: '#1F2937',
          light: '#4B5563',
          dark: '#111827',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 94, 32, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 12px 30px -4px rgba(27, 94, 32, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(27, 94, 32, 0.08)',
      }
    },
  },
  plugins: [],
}
