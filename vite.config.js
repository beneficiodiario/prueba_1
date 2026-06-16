import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,  // ← expone en red local para móvil
  },
  build: {
    // Separa las dependencias en chunks propios: cambian poco entre despliegues,
    // así el navegador las reaprovecha de la caché y solo re-descarga la app.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
