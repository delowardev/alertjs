import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: resolve( __dirname, 'src' ),
      name: 'AlertJS',
      fileName: 'alert-js'
    }
  }
})
