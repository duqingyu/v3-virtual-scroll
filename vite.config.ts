import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname)
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false
        // additionalData: '@import "./src/assets/style/global.less";',
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: 'v3-virtual-scroll',
      // the proper extensions will be added
      fileName: 'v3-virtual-scroll'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 1234,
    open: false,
    https: false,
    hmr: true
  }
})
