import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const router = useRouter();
const instance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加登录的token
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 上面修改配置出错就会走这里
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.push('/401')
          break;
        case 404:
          router.push('/404')
          break;
        case 500:
          ElMessage.error('服务器故障')
          break;
        default:
          ElMessage.error('资源请求失败')
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
