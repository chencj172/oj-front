<template>
    <div class="tag-cloud-container">
        <span class="header">主题库 标签</span>
        <div class="tag-cloud">
            <span v-for="(tag, index) in tags" :key="index" class="tag" :style="{
                'background-color': getTagColor(tag),
                'color': getTextColor(tag)
            }">
                {{ tag }}
            </span>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getAllTag } from '@/api/problem-service';

const tags = ref([
    '数组', '矩阵乘法', 'DP', '入门',
    '普及+', '模拟', '排序', '字符串',
    '校准', '递推', '哈希', '数字', '队列',
    '前缀和', '栈', '数据结构', 'DFS',
    '并查集', '图论', '链表', '快速幂',
    '码栈', '位运算', '循环', '贪心',
    'NOIP', '树', 'CSP', '弹率优化',
    '二分', '拓扑排序', '区间DP', '01背包',
    'BFS', '分治', '递归', '离散化',
    '邻接类', '最小生成树',
    '图的遍历', 'KMP', 'True树', 'AC自动机',
    '树枝数组', '结构体', '高精度', '比表题',
    '博弈问题', '素数', 'Pollard-rho算法',
    '回文自动机', '生成树', '差分', '借给',
    '二维', '圆余', '线段树', '分块',
    '可持久化', '四边形不等式DP', '计数',
    '数位DP', 'SFJ', '奇包', '树形DP',
    'STL', '未分类',
]);

// 生成标签颜色
const getTagColor = (tag) => {
    const colors = [
        '#f0f9ff', '#e6f7ff', '#f6ffed', '#fff7e6',
        '#fff0f6', '#f0f0ff', '#f6f6f6', '#e6fffb',
        '#fff2e8', '#f9f0ff', '#e8f4ff', '#f5f5f5'
    ];
    const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
};

// 根据背景色确定文字颜色
const getTextColor = (tag) => {
    const bgColor = getTagColor(tag);
    // 简单判断背景色亮度决定文字颜色
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? '#333' : '#fff';
};

// 初始化标签数据
const initTagData = async () => {
    let res = await getAllTag();
    tags.value = [];
    res.data.forEach((element) => {
        tags.value.push(element);
    })
}

onMounted(() => {
    initTagData();
})
</script>
  
<style scoped>
.tag-cloud-container {
    max-width: 400px;
    height: auto;
    margin: 0 auto;
    padding: 20px;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.header {
    text-align: center;
    margin: 20px 0 20px 0;
    color: #333;
    font-size: 18px;
    font-weight: bold;
}

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 20px 0 0 0;
}

.tag {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: default;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>