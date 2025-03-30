import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  // 引入开发环境变量的文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    server: {
      host: '0.0.0.0', // 默认是 localhost
      port: (Number(env.VITE_APP_PORT)), // 项目运行的端口
      strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      open: false, // 启动后是否浏览器自动打开
      hmr: true, // 为开发服务启用热更新，默认是不启用热更新的
      proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_API_HOST, // 后端服务实际地址
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src')
      }
    },
  }
})
