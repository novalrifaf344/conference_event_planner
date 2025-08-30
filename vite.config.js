import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/conference_event_planner/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets'
  }
})