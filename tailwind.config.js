/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "rgba(0,136,169,1)",
          dark: "#24252A",
          darker: "#1a1b1f",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        verdana: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "gradient-bg": "gradientBg 12s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        gradientBg: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "-2px -1px 10px rgba(0,136,169,0.6)" },
          "50%": { boxShadow: "-2px -1px 20px rgba(0,136,169,1)" },
        },
      },
      boxShadow: {
        cyan: "-2px -1px 10px rgba(0,136,169,1)",
        "cyan-lg": "-2px -1px 20px rgba(0,136,169,1)",
        "green-glow": "-2px -1px 10px rgb(194,223,6)",
      },
    },
  },
  plugins: [],
};
