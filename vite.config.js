import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Enable polyfills for Node.js modules
      buffer: true,  // Ensure that `Buffer` is polyfilled
      process: true  // Also include `process` if necessary
    })
  ],
  resolve: {
    alias: {
      // If you still encounter issues, add an alias for Buffer
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
});
