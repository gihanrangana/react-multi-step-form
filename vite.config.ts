import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: (import.meta?.env?.VITE_APP_PORT) ? import.meta?.env.VITE_APP_PORT : 3004,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/Global.scss";`,
      }
    }
  }
})
