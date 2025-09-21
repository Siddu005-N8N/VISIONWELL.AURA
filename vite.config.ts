import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Conditionally import lovable-tagger only in development
function getComponentTagger(mode: string) {
  if (mode === 'development') {
    try {
      const { componentTagger } = require("lovable-tagger");
      return componentTagger();
    } catch (error) {
      console.log('lovable-tagger not available in development, skipping...');
      return null;
    }
  }
  return null;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  },
  build: {
    outDir: "dist",
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
        },
      },
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react'
    }),
    getComponentTagger(mode),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    force: true,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    jsx: 'automatic',
    jsxFactory: undefined,
    jsxFragment: undefined,
    jsxImportSource: 'react',
  },
}));
