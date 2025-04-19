<template>
    <div class="header-container">
        <div class="header-content">
            <img src="/website-logo.png">
            <h1 class="site-title">COJ</h1>
            <nav class="nav-menu">
                <ul class="nav-list">
                    <li class="nav-item" v-for="item in navItems" :key="item">
                        <img :src="item.icon" @click="item.click_func">
                        <el-button @click="item.click_func" link>{{ item.name }}</el-button>
                    </li>
                </ul>
            </nav>

            <head_picture v-if="isLogin" :userInfo="userInfo" :isLogin="isLogin"></head_picture>
            <login_register_button v-if="!isLogin"></login_register_button>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import head_picture from '@/view/user-service/components/head-picture.vue';
import login_register_button from '@/view/user-service/components/login-register.vue';
import { useRouter } from 'vue-router';
import { checkLogin, getUserInfo } from '@/api/user-service.js';
import { ElMessage } from 'element-plus';

const userInfo = ref({
    icon: '',
    username: ''
});

const checkUserInfo = async () => {
    const checkRes = await checkLogin();
    console.log(checkRes);
    if (checkRes.code != 200) {
        // 用户未登录直接返回
        return;
    }
    // 根据token检查用户信息
    const res = await getUserInfo();
    if (res.code != 200) {
        isLogin.value = false;
        localStorage.removeItem("token");
        ElMessage.error(res.message);
    }
    isLogin.value = true;
    userInfo.value.icon = 'http://localhost:8081' + res.data.userAvatar;
    userInfo.value.username = res.data.userName;
}

const router = useRouter();
const isLogin = ref(false);
const navItems = ref([
    {
        name: '首页',
        icon: '/home.png',
        click_func: () => {
            router.push('/index/home')
        },
    },
    {
        name: '题库',
        icon: '/problem.png',
        click_func: () => {
            router.push('/index/problem')
        },
    },
    {
        name: '训练',
        icon: '/train.png',
        click_func: () => {
            router.push('/index/train')
        },
    },
    {
        name: '讨论',
        icon: '/community.png',
        click_func: () => {
            router.push('/index/community')
        },
    },
    {
        name: '天梯模式',
        icon: '/PK.png',
        click_func: () => {
            router.push('/index/pk')
        },
    },
    {
        name: '关于',
        icon: '/about.png',
        click_func: () => {
            router.push('/index/about')
        },
    }
]);

onMounted(async () => {
    await checkUserInfo();
})
</script>

<style scoped lang="less">
.el-button.is-link:hover {
    color: #1890ff;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    z-index: 100;
}

.header-content {
    display: flex;
    align-items: center;

    img {
        width: 30px;
        height: 30px;
    }
}

.site-title {
    font-size: 40px;
    margin: 0;
}

.nav-menu {
    display: flex;
    margin-left: 300px;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 50px;
}

.nav-item {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        cursor: pointer;
        width: 25px;
        height: 20px;
    }
}</style>