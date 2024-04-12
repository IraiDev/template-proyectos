import { defineConfig } from "vite"
import million from "million/compiler"
import react from "@vitejs/plugin-react-swc"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
  build: {
    outDir: "../../front-end/output",
  },
  resolve: {
    alias: {
      "@modules": path.resolve(__dirname, "src/modules"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@router": path.resolve(__dirname, "src/router"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
    },
  },
})
