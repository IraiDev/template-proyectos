import { nextui } from "@nextui-org/react"
import { zinc, red } from "tailwindcss/colors"
import { PRIMARY_COLORS, SECONDARY_COLORS } from "./src/config/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: {
              ...zinc,
              DEFAULT: zinc[800],
            },
            default: {
              ...zinc,
              DEFAULT: zinc[300],
            },
            background: {
              ...zinc,
              DEFAULT: zinc[200],
            },
            primary: {
              ...PRIMARY_COLORS,
              DEFAULT: PRIMARY_COLORS[800],
            },
            secondary: {
              ...SECONDARY_COLORS,
              DEFAULT: SECONDARY_COLORS[600],
            },
            danger: {
              ...red,
              DEFAULT: red[600],
            },
          },
        },
      },
    }),
  ],
}
