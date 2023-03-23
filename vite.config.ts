import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetIcons, presetAttributify, presetUno } from 'unocss'
import unocss from 'unocss/vite' //css原子组件化
// import Components from 'unplugin-vue-components/vite' //自动导入组件的插件
import AutoImport from 'unplugin-auto-import/vite' //自动导入包的插件 来自 傅
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' //ElementPlus组件自动导入
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    unocss({
      rules: [
        // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
        // [/^m-l-(\d+)$/, ([, d]) => ({ 'margin-left': `${Number(d) * 10}px` })],
        // ['flex', { display: "flex" }],
      ],
      presets: [presetIcons(), presetAttributify(), presetUno()]
    }),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts'
    }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // }),
    createSvgIconsPlugin({
      // 指定要缓存的文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')], //本地svg路径
      // 指定symbolId格式
      symbolId: '[name]' //为本地svg图片设置唯一名称
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    host: '0.0.0.0',
    open: false,
    port: 3221,
    proxy: {
      '/api': {
        target: 'http://localhost:9527',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  css: { preprocessorOptions: { css: { charset: false } } },
  base: './',
  build: {
    outDir: 'vueAdmin',
    assetsDir: 'static'
    // cssCodeSplit: false,  //css文件被提取到单个文件中,
  }
})
