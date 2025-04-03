<template>
    <!-- 未登录状态显示按钮 -->
    <div class="auth-buttons">
        <el-button type="primary" @click="router.push('/login')">登录</el-button>
        <el-button type="danger" @click="router.push('/register')">注册</el-button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<style lang="less">
.auth-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 0 300px;
}
</style>