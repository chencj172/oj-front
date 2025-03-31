<template>
    <div class="header-container">
        <div class="header-content">
            <img src="/title.jpg">
            <h1 class="site-title">COJ</h1>
            <nav class="nav-menu">
                <ul class="nav-list">
                    <li class="nav-item" v-for="item in navItems" :key="item">
                        <img :src="item.icon" @click="item.click_func">
                        <el-button @click="item.click_func" link>{{ item.name }}</el-button>
                    </li>
                </ul>
            </nav>
            <!-- 已登录状态显示头像 -->
            <div v-if="isLogin" class="user-avatar">
                <img :src="userInfo.icon" alt="用户头像" />
                <span>{{ userInfo.username }}</span>
            </div>

            <!-- 未登录状态显示按钮 -->
            <div v-else class="auth-buttons">
                <el-button type="primary" @click="router.push('/login')">登录</el-button>
                <el-button type="danger" @click="router.push('/register')">注册</el-button>
            </div>
        </div>
    </div>

    <router-view />
    <site_footer></site_footer>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo } from '@/api/user-service.js';
import { ElMessage } from 'element-plus';
import site_footer from '@/view/footer.vue';

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
const userInfo = ref({
    icon: undefined,
    username: undefined
});

const checkUserInfo = async () => {
    // 根据token检查用户信息
    const res = await getUserInfo();
    if(res.code != 200) {
        isLogin.value = false;
        ElMessage.error(res.message);
    }
    isLogin.value = true;
    userInfo.value.icon = 'http://localhost:8081' + res.data.userAvatar;
    userInfo.value.username = res.data.userName;
}

onMounted(() => {
    checkUserInfo();
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
        width: 25px;
        height: 20px;
    }
}

.auth-buttons, .user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 0 200px;

    img {
        width: 28px;
        height: 28px;
        margin-right: 10px;
    }
}

.site-title {
    font-size: 40px;
    margin: 0;
}

.nav-menu {
    display: flex;
    margin-left: 70px;
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
    }
}

</style>