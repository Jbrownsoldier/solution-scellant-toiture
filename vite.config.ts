import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression for all assets > 1KB
    compression({
      threshold: 1024,
      deleteOriginalAssets: false,
      skipIfLargerOrEqual: true,
    }),
    // Brotli compression for browsers that support it
    compression({
      algorithms: ['brotliCompress'],
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    // Bundle visualizer to find bloated libraries
    visualizer({
      open: false,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    // Increase chunk limit warning threshold — video assets are large by nature
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Code-split vendor libraries so the main bundle stays tiny
        manualChunks: {
          'react-vendor':    ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor':   ['framer-motion'],
          'gsap-vendor':     ['gsap'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'ui-vendor':       ['lucide-react'],
        },
        // Content-hash all chunks for long-lived cache
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash].[ext]',
      },
    },

    // Terser minification — more aggressive than ESBuild default
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console:  true,   // strip all console.* in prod
        drop_debugger: true,
        pure_funcs:    ['console.log', 'console.warn', 'console.info'],
      },
    },

    // Generate a source-map for production error tracking (optional)
    sourcemap: false,

    // Ensure CSS is also code-split per chunk
    cssCodeSplit: true,

    // Target modern browsers (avoid legacy polyfills)
    target: ['es2020', 'chrome90', 'firefox88', 'safari14', 'edge90'],
  },

  // Dev server settings
  server: {
    headers: {
      // During dev, serve video with proper range-request support
      'Accept-Ranges': 'bytes',
    },
  },

  // Resolve path aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
