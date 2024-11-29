/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['Orbitron', 'sans-serif'], // For headings
      secondary: ['Rajdhani', 'sans-serif'], // For body text
      tertiary: ['Aldrich', 'sans-serif'], // For special elements
      inter: ['Inter', 'sans-serif'], // For specific elements
      spline: ['Spline Sans', 'sans-serif'], // Added Spline Sans for custom use
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#0a0a0a', // Black for text and icons
        accent: '#B809C3', // Accent color used for buttons or highlights
      },
      backgroundImage: {
        site: "url('./assets/site-bg.webp')", // Optional site background
        about: "url('./assets/about.webp')", // Background for specific sections
      },
      spacing: {
        18: '4.5rem', // Custom spacing for padding/margin
      },
      boxShadow: {
        login: '20px 20px 20px rgba(0, 0, 0, 0.5)', // For login cards
        custom: '15px 15px 12px rgba(0, 0, 0, 0.2)', // For content cards
      },
    },
  },
  plugins: [],
};
