import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [],
    server: {
      host: '0.0.0.0',
      port: 8091,
      open: false,
      https: false,
    },
})