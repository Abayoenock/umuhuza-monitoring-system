/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      boxShadow: {
        "custom-before": "6px 6px white",
        "custom-after": "6px -6px white",
        "custom-relative": "20px 0px white",
      },
      backgroundImage: {
        noiseBg: "url('/devImages/noise.png')",
        // "amenities-section-image": "url('./devImages/Imigongo.png')",
      },
      colors: {
        brightRed: "hsl(12, 88%, 59%)",
        brightRedLight: "hsl(12, 88%, 69%)",
        brightRedSupLight: "hsl(12, 88%, 95%)",
        darkBlue: "hsl(228, 39%, 23%)",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        veryDarkBlue: "hsl(233, 12%, 13%)",
        veryPaleRed: "hsl(13, 100%, 96%)",
        veryLightGray: "hsl(0, 0%, 98%)",
        veryLightBlueIll: "#9AB3DA",
        lightBlack: "#404B7C",

        // the colors of the website

        textColor: "#090102",
        RedBackground: "#fbd5db",
        primaryButton: "#c52602",
        secondaryButton: "#fef1f3",
        accentColor: "#1433e6",
      },
      zIndex: {
        1: "1",
        2: "2",
        100: "100",
      },
    },
  },
  plugins: [],
}

// 'text': '#00080a',
// 'background': '#ffffff',
// 'primary-button': '#c52602',
// 'secondary-button': '#e7fafe',
// 'accent': '#062489',

//more blue and red colors in their bright colors

// 'text': '#090102',
// 'background': '#fbd5db',
// 'primary-button': '#c52602',
// 'secondary-button': '#fef1f3',
// 'accent': '#1433e6',

///my colors , the redsh and bluesh colors

// 'text': '#000000',
// 'background': '#ffffff',
// 'primary-button': '#3f7efd',
// 'secondary-button': '#ebf1ff',
// 'accent': '#ff666e',

// the lightener versiobn s of teh colors  red and blue as  to be used in the project  development

// 'text': '#000000',
// 'background': '#ffffff',
// 'primary-button': '#8fb4ff',
// 'secondary-button': '#ebf1ff',
// 'accent': '#ff8f94',
