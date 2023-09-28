import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    plugins: [],
    server: {
      host: '0.0.0.0',
      port: 8091,
      open: false,
      https: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../')
      }
    }
})