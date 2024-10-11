import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/app/assets/scss/_functions.scss';
          @import './src/app/assets/scss/_variables.scss';
          @import './src/app/assets/scss/_mixins.scss';
          `
      }
    }
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    reportCompressedSize: false, // - отчеты о размерах, сжатых gzip. Сжатие больших выходных файлов может быть медленным, поэтому его отключение может повысить производительность сборки для больших проектов.
    sourcemap: process.env.NODE_ENV === 'development',
    assetsInlineLimit: 0
  }
})
