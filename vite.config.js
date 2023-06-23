import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // set this to 500 after optimizations
    chunkSizeWarningLimit: 1900,
  },
});
