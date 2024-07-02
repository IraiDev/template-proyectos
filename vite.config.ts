import { defineConfig } from "vite"
import million from "million/compiler"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

const OUTDIR = process.env.VITE_OUTDIR || "../../front-end/output"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
  build: {
    outDir: OUTDIR,
    chunkSizeWarningLimit: 1500,
  },
  resolve: {
    alias: {
      "@modules": path.resolve(__dirname, "src/modules"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@router": path.resolve(__dirname, "src/router"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
    },
  },
})
