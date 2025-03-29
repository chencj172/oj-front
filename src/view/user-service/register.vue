<template>
    <div class="login-container">
        <el-card class="login-card">
            <h2 class="login-title">注册账号</h2>
            <el-form :model="registerFormData" :rules="registerRules" ref="registerForm">
                <el-form-item prop="account">
                    <el-input v-model="registerFormData.account" placeholder="请输入账号" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="registerFormData.phone" placeholder="请输入手机号" prefix-icon="Lock" />
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="registerFormData.email" placeholder="请输入邮箱" prefix-icon="Lock" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerFormData.password" placeholder="请输入密码" type="password" show-password
                        prefix-icon="Lock" />
                </el-form-item>
                <el-form-item prop="confirm_password">
                    <el-input v-model="registerFormData.confirm_password" placeholder="请再次输入密码" type="password" show-password
                        prefix-icon="Lock" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleRegister" :loading="loading" style="width: 100%">
                        注册
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
// 表单数据
const registerFormData = ref({
    account: '',
    password: '',
    confirm_password: '',
    phone: '',
    email: '',
});

const registerForm = ref(null);

// 表单验证规则
const registerRules = {
    account: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 16 个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号',
            trigger: 'blur'
        }
    ],
    email: [
        {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '请输入有效的邮箱地址',
            trigger: 'blur'
        }
    ],
    confirm_password: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== loginForm.value.password) {
                    callback(new Error("两次输入的密码必须一致"))
                } else {
                    callback();
                }
            },
            trigger: 'change'
        },
    ],
};

// 注册方法
const handleRegister = async () => {
    registerForm.value.validate((valid) => {
        if (valid == false) {
            ElMessage.error('信息格式填写有误');
            return;
        }
    });

    if (response.data.code === 200) {
        ElMessage.success('注册成功');
        // 跳转到登录页面
        router.push('/login');
    } else {
        ElMessage.error(response.data.message || '注册失败');
    }

};
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
}
</style>