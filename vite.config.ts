import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/classify': 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
        "@": resolve(__dirname, './src')
    }
  }
})
