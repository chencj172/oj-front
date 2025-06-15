import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const instance = axios.create({
  timeout: 5000,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加登录的token
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  error => {
    // 上面修改配置出错就会走这里
    return Promise.reject(error);
  }
);
const error_msg = (msg) => {
  ElMessage.error({message: msg, duration: 2000});
}

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error.response.status);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          error_msg('用户未登录');
          break;
        case 404:
          router.push('请求资源不存在')
          break;
        case 500:
          error_msg('服务器故障');
          break;
        case 503:
          error_msg('服务器正在维护...');
          break;
        default:
          error_msg('请求资源失败');
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
