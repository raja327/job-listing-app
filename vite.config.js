import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default port for Vite
    hmr: {
      protocol: 'ws', // Ensure WebSocket protocol is used
      host: 'localhost', // Make sure it's correctly pointing to your local server
      port: 5173, // Ensure the correct port is being used
    }
  }
})
