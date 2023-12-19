import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
import { createHtmlPlugin } from 'vite-plugin-html';

// https://github.com/nonzzz/vite-plugin-compression
// import { compression } from 'vite-plugin-compression2';

// vite 插件合集 https://github.com/vitejs/awesome-vite#plugins

// https://vitejs.dev/config/
export default defineConfig({
  // 部署后的基础路径
  base: '/dosage-calc',
  // 打包输出目录
  build: {
    outDir: 'docs',
  },
  // dev 服务器设置
  server: {
    // 热跟新
    hmr: true,
    // 开启局域网ip访问
    host: true,
    // 端口
    port: 5173,
  },
  resolve: {
    // 设置别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // vite 的 vue 插件
    vue(),
    // 压缩 html
    createHtmlPlugin({
      minify: true,
    }),
    /*     compression({
      // include: ,
      // 排除
      exclude: [/\.(br)$/, /\.(gz)$/],
      // 最大文件大小，超出会生成压缩包
      // threshold: ,
      // 压缩算法 brotliCompress
      algorithm: 'gzip',
      // 是否删除原有资产
      deleteOriginalAssets: false,
      // 如果压缩结果大于或者等于原始文件，是否跳过压缩
      skipIfLargerOrEqual: true,
    }), */
    // 自动引入插件
    AutoImport({
      // 自动引入 vue 的api
      imports: ['vue'],
      // 自动引入其它库
      resolvers: [
        TDesignResolver({
          library: 'mobile-vue',
        }),
      ],
      // 生成自动引入的配置文件，防止 eslint 报错，需要在eslint配置文件中引入
      eslintrc: {
        enabled: true,
        filepath: './auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      // 自动引入组件
      resolvers: [
        TDesignResolver({
          library: 'mobile-vue',
        }),
      ],
    }),
  ],
});
