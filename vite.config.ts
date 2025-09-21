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
      // Force classic JSX transform
      jsxRuntime: 'classic',
      jsxImportSource: undefined,
      // Disable automatic JSX runtime
      plugins: []
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
    'process.env.NODE_ENV': JSON.stringify(mode),
    // Force classic JSX
    __DEV__: mode === 'development'
  },
  // Force classic JSX in all transforms
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    jsxInject: `import React from 'react'`
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment'
    }
  }
}));
