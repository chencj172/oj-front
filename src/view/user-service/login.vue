<template>
    <div class="login-container">
        <el-card class="login-card">
            <h2 class="login-title">OJ系统登录</h2>
            <el-form :model="loginFormData" :rules="loginRules" ref="loginForm" @keyup.enter="handleLogin">
                <el-form-item prop="userAccount">
                    <el-input v-model="loginFormData.userAccount" placeholder="请输入账号" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input v-model="loginFormData.userPassword" placeholder="请输入密码" type="password" show-password
                        prefix-icon="Lock" />
                </el-form-item>
                <el-button type="primary" @click="handleLogin" style="width: 100%">
                    登录
                </el-button>
                <div class="footer-button">
                    <el-button link @click="toRegiter">
                        注册账号
                    </el-button>
                    <el-button link @click="toPhoneLogin">
                        验证码登录
                    </el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { login, checkLogin } from '@/api/user-service.js';

const router = useRouter();
const loginForm = ref(null);
// 表单数据
const loginFormData = ref({
    userAccount: '',
    userPassword: '',
});

// 表单验证规则
const loginRules = {
    userAccount: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
    ],
    userPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
    ],
};

// 跳转到注册页面
const toRegiter = () => {
    router.push('/register')
}

// 登录方法
const handleLogin = async () => {
    // 向后端发送登录请求
    const res = await login(loginFormData.value);
    if (res.code === 200) {
        // 存储token
        localStorage.setItem('token', res.data);
        ElMessage.success('登录成功');
        // 登录成功后跳转（示例：跳转到首页）
        router.push('/');
    } else {
        ElMessage.error(res.message || '登录失败');
    }
};

// 检查是否已经登录
const checkUserLogin = async () => {
    let res = await checkLogin();
    if(res.code == 200) {
        router.push('/');
    }
}

onMounted(() => {
    checkUserLogin();
})
</script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: url('/login_background.png');

    button {
        font-size: 15px;
    }
}

.footer-button {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
}

.login-card {
    width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 30px;
}
</style>