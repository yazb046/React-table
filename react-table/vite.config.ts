import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Inspect()], 
  resolve:{
    alias:{
      '@': resolve(__dirname, './src')
    }
  }
})

