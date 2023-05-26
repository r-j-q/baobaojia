import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// 按需引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': resolve(__dirname, 'src'),
      components: resolve(__dirname, 'src/components'),
      "@api": "/src/store"
    }

  },

  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://mw.shningmi.com',
        changeOrigin: true,
        ws: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
  }
})

//配置 https://blog.csdn.net/qq_39275868/article/details/126267632
