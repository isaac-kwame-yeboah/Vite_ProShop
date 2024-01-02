import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

  /*  https://vitejs.dev/config/  */
export default defineConfig({
  plugins: [react()], 
  server: {
      // FRONTEND API ENDPOINT // 
      port:3000,

      // BACKEND API ENDPOINT // 
      proxy:{
        "/api":{
          target: "http://localhost:9000",
          changeOrigin: true
        }
      }
  }
})
