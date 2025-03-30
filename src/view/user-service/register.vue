<template>
    <div class="login-container">
        <el-card class="login-card">
            <h2 class="login-title">注册账号</h2>
            <el-form :model="registerFormData" :rules="registerRules" ref="registerForm">
                <el-form-item prop="userAccount">
                    <el-input v-model="registerFormData.userAccount" placeholder="请输入账号" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input v-model="registerFormData.userPassword" placeholder="请输入密码" type="password" show-password
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
import { register } from '@/api/user-service';

const router = useRouter();
// 表单数据
const registerFormData = ref({
    userAccount: '',
    userPassword: '',
    confirm_password: '',
});

const registerForm = ref(null);

// 表单验证规则
const registerRules = {
    userAccount: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 16 个字符', trigger: 'blur' },
    ],
    userPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
    ],
    // userPhone: [
    //     { required: true, message: '请输入手机号', trigger: 'blur' },
    //     {
    //         pattern: /^1[3-9]\d{9}$/,
    //         message: '请输入有效的手机号',
    //         trigger: 'blur'
    //     }
    // ],
    confirm_password: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== registerFormData.value.userPassword) {
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
    const res = await register({
        userAccount: registerFormData.value.userAccount,
        userPassword: registerFormData.value.userPassword
    });

    if (res.code === 200) {
        ElMessage.success(res.message);
        // 跳转到登录页面
        router.push('/login');
    } else {
        ElMessage.error(res.message || '注册失败');
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