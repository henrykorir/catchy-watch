import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    fs: {
      // Allow serving files from project root and cypress support folder
      allow: ['.', 'cypress'],
    },
  },
})
