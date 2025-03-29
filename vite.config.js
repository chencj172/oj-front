import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig((mode) => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue()],
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src')
      }
    },
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        [env.VITE_APP_LOGIN_API]: {
          target: env.VITE_APP_LOGIN_HOST,
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_LOGIN_API), '')
        },
      }
    },
  }
})
