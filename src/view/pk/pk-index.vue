<template>
    <el-button type="primary" @click="challenge">发起挑战</el-button>
    <el-button type="primary" @click="close_challenge">取消</el-button>
</template>
    
<script setup>
import WebSocketClient from '@/utils/WebSocketClient';
import { useRouter } from 'vue-router';

const router = useRouter();
let client;
const recvMsg = (data) => {
    console.log(data);
    if (data === 'padding') {
        // 等待
    } else {
        // 匹配成功  跳转到对应题目页面
        setTimeout(() => {
            client.close();
        }, 2000);
        router.push({
            name: 'problem-detail',
            query: {
                pid: data,
                origin: 3,
            }
        });
    }
}
const challenge = () => {
    client = new WebSocketClient('ws://127.0.0.1:8080/pk/challenge');
    // 连接
    client.connect().then(() => {});
    // 设置接收函数
    client.onMessage(recvMsg);
}
const close_challenge = () => {
    client.close();
}

</script>

<style scoped lang="less"></style>