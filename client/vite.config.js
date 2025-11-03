import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    commonjsOptions: {
      include: [],
    },
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: ['@rollup/rollup-linux-x64-gnu'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    target: 'es2015',
    minify: 'esbuild',
  },
  optimizeDeps: {
    disabled: false,
    exclude: ['@rollup/rollup-linux-x64-gnu']
  }
})
