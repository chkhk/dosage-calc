import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true,
    host: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        TDesignResolver({
          library: 'mobile-vue',
        }),
      ],
      eslintrc: {
        enabled: true,
        filepath: './auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'mobile-vue',
        }),
      ],
    }),
  ],
});
