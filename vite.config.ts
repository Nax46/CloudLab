import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three'],
          'vendor-gsap': ['gsap'],
          'vendor-ui': ['lucide-react', 'recharts', 'canvas-confetti'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  // @ts-expect-error vitest configuration field
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
