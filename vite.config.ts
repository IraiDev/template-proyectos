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
      "@features": path.resolve(__dirname, "src/features"),
      "@components": path.resolve(__dirname, "src/components"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@router": path.resolve(__dirname, "src/router"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@views": path.resolve(__dirname, "src/views"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
    },
  },
})
