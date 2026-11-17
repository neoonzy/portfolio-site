import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Root-absolute assets keep direct SPA URLs (/projetos/:slug) working on Vercel.
  // For a legacy subdirectory host (such as CIn), run: npm run build:cin
  base: '/',
})
