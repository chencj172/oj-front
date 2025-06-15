<template>
    <div class="discuss-container">

        <div class="main-content">
            <el-row :gutter="20">
                <el-col :md="16" :sm="24">
                    <PostList :posts="posts" @new-post="handleNewPost" />
                </el-col>

                <el-col :md="8" :sm="24">
                    <Sidebar :hot-tags="hotTags" :top-posts="topPosts" />
                </el-col>
            </el-row>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import PostList from './components/PostList.vue'
import Sidebar from './components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { getAllPosts } from '@/api/posts-service.js';

const router = useRouter();
// 模拟数据
const posts = ref([
    {
        id: 1,
        title: '关于动态规划问题的优化技巧',
        content: '在解决LeetCode 123题时，我遇到了时间复杂度过高的问题，请问有什么优化方法吗？',
        author: 'user123',
        time: '3小时前',
        status: 'solved',
        views: 124,
        comments: 8,
        likes: 15,
        tags: ['动态规划', '算法优化']
    },
    {
        id: 2,
        title: 'Python中如何处理大整数运算的性能问题？',
        content: '在解决Project Euler第20题时，Python的大整数运算虽然方便，但性能较差，有什么优化建议？',
        author: 'python_lover',
        time: '5小时前',
        status: 'unsolved',
        views: 87,
        comments: 5,
        likes: 3,
        tags: ['Python', '性能优化']
    }
])

const hotTags = ref([
    { name: '动态规划', count: 125 },
    { name: 'Python', count: 98 },
    { name: '算法优化', count: 76 },
    { name: '数据结构', count: 65 },
    { name: 'C++', count: 54 }
])

const topPosts = ref([
    { id: 101, title: '如何理解Dijkstra算法的时间复杂度', views: 342 },
    { id: 102, title: 'Vue3响应式原理详解', views: 289 },
    { id: 103, title: '快速排序的边界条件处理', views: 256 }
])

// 初始数据
const initData = async () => {
    let res = await getAllPosts();
    posts.value = [];
    res.data.postsList.forEach((element) => {
        posts.value.push({
            id: element.id,
            title: element.title,
            content: element.content,
            author: element.userName,
            time: element.createTime,
            status: element.status,
            views: element.views,
            comments: element.comments,
            likes: element.likes,
            tags: element.tagList
        })
    })
}

onMounted(() => {
    // 这里可以添加获取数据的逻辑
    // fetchPosts()
    initData();
})

const handleNewPost = () => {
    // 跳转到新建帖子页面
    console.log('Navigate to new post page')
    router.push('/community/createPost')
}
</script>
  
<style scoped>
.discuss-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.main-content {
    margin-top: 20px;
}
</style>