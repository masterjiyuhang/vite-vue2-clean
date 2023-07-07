import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import UnoCSS from 'unocss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
// import { viteStaticCopy } from 'vite-plugin-static-copy';
import { wrapperEnv } from './src/utils/env';

export default ({ mode }) => {
  const { VITE_PORT, VITE_BASE_URL, VITE_OPEN } = loadEnv(mode, process.cwd());
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [
      vue2(),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: 'static/js/config.js',
      //       dest: 'static/js',
      //     },
      //   ],
      // }),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOBAL_APP_TITLE,
          },
        },
      }),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz',
        }),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: VITE_OPEN,
      // 允许跨域
      cors: true,
      // https: false,
      // 自定义代理规则
      proxy: {
        '/api/jctrans': {
          target: 'https://api-dev2.jctrans.com', // easymock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/jctrans/, ''),
        },
        '/api': {
          target: viteEnv.VITE_PROXY_DOMAIN_REAL, // easymock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      // 设置最终构建的浏览器兼容目标
      target: 'es2020',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      minify: 'esbuild',
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  });
};
