import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from "vite-plugin-eslint" // 新增這行


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9001
  },

  plugins: [
    vue(),
    // eslintPlugin({ cache: false }) // 新增這行
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      // { find: 'assets', replacement: '/src/assets' },
    ]
  },
  optimizeDeps: {
    include: ['jquery']
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 靜默來自相依套件的所有 deprecation 警告
        quietDeps: true,
        // 只靜默「@import」相關的 deprecation
        silenceDeprecations: ['import'],
      },
    },
  },
})
