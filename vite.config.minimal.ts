import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: './src/main.tsx'
    }
  },
  server: {
    host: "0.0.0.0", 
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
