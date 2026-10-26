import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true, // expone en la red local para probar en el móvil
  },
  build: {
    // Las dependencias van en chunks propios: cambian poco entre despliegues,
    // así el navegador las reaprovecha de la caché y solo re-descarga la app.
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild ? undefined : {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion', 'lenis'],
          icons: ['react-icons/fi', 'react-icons/si'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
}))
