<template>
    <div class="post-list">
        <div class="list-header">
            <h2>讨论区</h2>
            <el-button type="primary" @click="emit('new-post')">新建讨论</el-button>
        </div>

        <el-tabs v-model="activeTab" class="post-tabs">
            <el-tab-pane label="最新" name="latest"></el-tab-pane>
            <el-tab-pane label="热门" name="hot"></el-tab-pane>
            <el-tab-pane label="未解决" name="unsolved"></el-tab-pane>
            <el-tab-pane label="已解决" name="solved"></el-tab-pane>
        </el-tabs>

        <div class="post-items">
            <div v-for="post in filteredPosts" :key="post.id" class="post-item">
                <router-link :to="`/community/detail/${post.id}`" class="post-link">
                    <div class="post-content">
                        <h3 class="post-title">{{ post.title }}</h3>
                        <p class="post-excerpt">{{ post.content }}</p>
                        <div class="post-meta">
                            <span class="post-author">{{ post.author }}</span>
                            <span class="post-time">{{ post.time }}</span>
                            <el-tag v-for="tag in post.tags" :key="tag" size="small" class="post-tag">{{ tag }}</el-tag>
                            <el-tag :type="post.status === 1 ? 'success' : 'warning'" size="small"
                                class="post-status">
                                {{ post.status === 1 ? '已解决' : '未解决' }}
                            </el-tag>
                        </div>
                    </div>
                    <div class="post-stats">
                        <span class="stat-item"><el-icon>
                                <View />
                            </el-icon> {{ post.views }}</span>
                        <span class="stat-item"><el-icon>
                                <ChatDotRound />
                            </el-icon> {{ post.comments }}</span>
                        <!-- <span class="stat-item"><el-icon>
                                <Thumb />
                            </el-icon> {{ post.likes }}</span> -->
                    </div>
                </router-link>
            </div>
        </div>

        <el-pagination background layout="prev, pager, next" :total="100" :page-size="10" class="pagination" @change="getNewContent"/>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
// import { View, ChatDotRound, Thumb } from '@element-plus/icons-vue'

const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['new-post'])

const activeTab = ref('latest')

const filteredPosts = computed(() => {
    if (activeTab.value === 'solved') {
        return props.posts.filter(post => post.status === 1)
    } else if (activeTab.value === 'unsolved') {
        return props.posts.filter(post => post.status === 0)
    } else if (activeTab.value === 'hot') {
        return [...props.posts].sort((a, b) => b.views - a.views)
    }
    return props.posts
})

// 分页
const getNewContent = () => {

}
</script>
  
<style scoped>
.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.post-tabs {
    margin-bottom: 20px;
}

.post-items {
    border-radius: 4px;
    overflow: hidden;
}

.post-item {
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}

.post-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.post-link {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    text-decoration: none;
    color: inherit;
}

.post-content {
    flex: 1;
}

.post-title {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
}

.post-excerpt {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
}

.post-meta {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
}

.post-author {
    margin-right: 10px;
}

.post-time {
    margin-right: 10px;
}

.post-tag {
    margin-right: 5px;
}

.post-status {
    margin-left: 10px;
}

.post-stats {
    display: flex;
    margin: 0 0 50px 0;
    /* flex-direction: column; */
    /* align-items: flex-end; */
    /* min-width: 80px; */
}

.stat-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 12px;
    color: #999;
    margin-left: 10px;
}

.stat-item .el-icon {
    margin-right: 3px;
}

.pagination {
    margin-top: 20px;
    justify-content: center;
}
</style>