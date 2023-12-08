import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  server: {
      // Frontend Api EndPoint // 
      port:3000,

      // Backend API User EndPoint // 
      proxy:{
        "/api":{
          target: "http://localhost:9000",
          changeOrigin: true
        }
      }
  }
})
