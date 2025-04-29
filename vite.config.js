import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/special-lazyness/' // Set base to your GitHub repo name with trailing slash for GitHub Pages
})
