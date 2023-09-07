import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  base: '/app',
  server: {
    // https: true,
    port: 6363,
    proxy: {
      '/api': {
        target: 'http://localhost:5142',
        changeOrigin: true,
      }
    },
  },
  plugins: [react(), mkcert()],
})
