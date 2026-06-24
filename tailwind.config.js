/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // 深蓝色 - 专业
        'primary-light': '#3B82F6',
        secondary: '#059669', // 绿色 - 自然
        'secondary-light': '#10B981',
        accent: '#EA580C', // 橙色 - 激情
        'accent-light': '#F97316',
        dark: '#1F2937',
        'gray-light': '#F3F4F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
