<template>
    <div class="sidebar">
        <el-card class="hot-tags">
            <template #header>
                <div class="card-header">
                    <span>热门标签</span>
                </div>
            </template>
            <div class="tag-list">
                <el-tag v-for="tag in hotTags" :key="tag.name" class="tag-item" :hit="tag.count > 100" size="large"
                    effect="plain" @click="handleTagClick(tag.name)">
                    {{ tag.name }} ({{ tag.count }})
                </el-tag>
            </div>
        </el-card>

        <el-card class="top-posts">
            <template #header>
                <div class="card-header">
                    <span>热门讨论</span>
                </div>
            </template>
            <ul class="top-post-list">
                <li v-for="post in topPosts" :key="post.id" class="top-post-item">
                    <router-link :to="`/discuss/${post.id}`" class="top-post-link">
                        {{ post.title }}
                        <span class="view-count">{{ post.views }}</span>
                    </router-link>
                </li>
            </ul>
        </el-card>
    </div>
</template>
  
<script setup>
const props = defineProps({
    hotTags: {
        type: Array,
        required: true
    },
    topPosts: {
        type: Array,
        required: true
    }
})

const handleTagClick = (tagName) => {
    console.log('Tag clicked:', tagName)
    // 实际项目中可以跳转到标签筛选页面或执行筛选操作
}
</script>
  
<style scoped>
.sidebar {
    position: sticky;
    top: 80px;
}

.card-header {
    font-weight: bold;
    font-size: 16px;
}

.hot-tags {
    margin-bottom: 20px;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag-item {
    cursor: pointer;
    transition: all 0.2s;
}

.tag-item:hover {
    transform: scale(1.05);
}

.top-post-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.top-post-item {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.top-post-item:last-child {
    border-bottom: none;
}

.top-post-link {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: #333;
    font-size: 14px;
    transition: color 0.2s;
}

.top-post-link:hover {
    color: #409EFF;
}

.view-count {
    color: #999;
    font-size: 12px;
}
</style>