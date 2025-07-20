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
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: 'public/docs/coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // Test files
        'node_modules/',
        'src/test/**',
        '**/*.test.ts',
        '**/*.test.tsx',
        
        // Storybook files (nie wymagają testów jednostkowych)
        '**/*.stories.ts',
        '**/*.stories.tsx',
        'src/stories/**',
        
        // Build artifacts
        'dist/**',
        'public/**',
        'coverage/**',
        
        // Config files
        'vite.config.ts',
        'package-scripts/**',
        '*.config.js',
        '*.config.ts',
        
        // Type definitions
        '**/*.d.ts',
        'src/vite-env.d.ts',
        
        // Entry points (often just imports)
        'src/main.tsx',
        
        // Generated files
        'public/docs/**',
        '**/assets/**/*.js'
      ]
    }
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
