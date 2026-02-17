import { defineConfig } from 'vite';

export default defineConfig({
  base: '/rf-detr-detection/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
