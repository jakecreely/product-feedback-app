/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {      
      fontFamily: {
      'jost': ['Jost', 'sans-serif']
      },
    colors: {
      primary: "#AD1FEA",
      secondary: "#4661E6",
      tertiary: "#4461E6",
      warning: "#D73737",
      black: "#3A4374",
      blue: "#373F68",
      lightBlue: '#62BCFA',
      lightGrey: '#647196'
    },
    backgroundImage: {
      'mobile': "url('/assets/suggestions/mobile/background-header.png')",
      'tablet': "url('/assets/suggestions/tablet/background-header.png')",
      'desktop': "url('/assets/suggestions/desktop/background-header.png')",
    }
  },
  },
  plugins: [],
}
