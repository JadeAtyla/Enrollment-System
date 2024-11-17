/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['Orbitron', 'sans-serif'], // Use for headings
      secondary: ['Rajdhani', 'sans-serif'], // Use for body text
      tertiary: ['Aldrich', 'sans-serif'], // Use for special elements
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
        primary: '#0a0a0a', // Black color for text and icons
        accent: '#B809C3', // Accent color used for buttons or highlights
      },
      backgroundImage: {
        site: "url('./assets/site-bg.webp')", // Background for site if needed
        about: "url('./assets/about.webp')", // Background for specific sections
      },
      spacing: {
        18: '4.5rem', // Custom spacing value for padding/margin adjustments
      },
      boxShadow: {
        custom: '0px 4.42184px 107.23px rgba(255, 86, 246, 0.51)', // Custom shadow for buttons or cards
      },
    },
  },
  plugins: [],
};
