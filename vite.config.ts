import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ 下面這一行好重要，如果無，GitHub Pages 會搵唔到 CSS/JS
  base: '/Osaka/', 
})
