import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  ...(mode === "development" && {
    server: {
      proxy: {
        "/api": {
          target: "https://binkeyit-server.vercel.app",
          changeOrigin: true,
          secure: false
        }
      }
    }
  })
}))
