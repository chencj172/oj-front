<template>
    <div class="user-avatar">
        <img v-if="userInfo" :src="userInfo.icon" alt="用户头像" />
        <el-dropdown trigger="click" v-if="userInfo">
            <span class="el-dropdown-link">
                {{ userInfo.username }}
                <el-icon>
                    <ArrowDown />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
    // 退出登录，删除token，刷新页面
    localStorage.removeItem("token");
    router.go(0);
}

const props = defineProps({
    userInfo: Object,
})

</script>

<style lang="less">
.user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 0 200px;

    .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
    img {
        width: 28px;
        height: 28px;
        margin-right: 10px;
    }
    .account-icon {
        cursor: pointer;
        color: var(--el-color-primary);
        z-index: 999;
    }
}
</style>