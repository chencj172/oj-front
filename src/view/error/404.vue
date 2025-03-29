<template>
    <div class="error-page">
        <div class="error-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>抱歉，您访问的页面不存在。</p>
            <el-button type="primary" @click="goHome">返回首页</el-button>
        </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>
  
<style scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f7fa;
    text-align: center;
}

.error-content h1 {
    font-size: 80px;
    margin: 0;
    color: #f56c6c;
}

.error-content h2 {
    font-size: 24px;
    margin: 10px 0;
    color: #606266;
}

.error-content p {
    color: #909399;
    margin-bottom: 20px;
}
</style>