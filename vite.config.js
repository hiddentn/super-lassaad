import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  publicDir: "public",
  base: "/super-lassaad/",
  build: {
    outDir: "dist",
  },
})
