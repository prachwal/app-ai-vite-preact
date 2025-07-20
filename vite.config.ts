/// <reference types="vitest" />
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  // Build configuration for TypeDoc integration
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['docs']
    }
  },
  // Serve docs during development
  server: {
    fs: {
      allow: ['..']
    }
  }
})
