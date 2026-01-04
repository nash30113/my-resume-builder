import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: base 路徑需與 GitHub 倉庫名稱一致，用於 GitHub Pages 部署
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/my-resume-builder/' : '/',
})
