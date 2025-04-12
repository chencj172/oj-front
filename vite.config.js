import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import postCssPxToRem from 'postcss-pxtorem'

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
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 100, //pc端建议：192，移动端建议：75；设计稿宽度的1 / 10
            propList: ['*', '!border*'], // 不转换边框
            unitPrecision: 5, // 转换后的精度，即小数点位数
            selectorBlackList: [/^html$/], // 不转换html元素
            replace: true, // 是否直接更换属性值而不添加备份属性
            mediaQuery: true, // 是否在媒体查询中也转换px为rem
            minPixelValue: 1, // 设置要转换的最小像素值
            // exclude: /node_modules/i
          })
        ]
      }
    },
  }
})
