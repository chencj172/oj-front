<template>
    <site_header></site_header>
    <div class="split-container">
        <!-- 左侧面板 -->
        <div class="left-panel" :style="{ width: leftWidth + 'px' }" ref="leftPanel">
            <div class="panel-content">
                <div class="tab-header">
                    <div class="tab-item" :class="{ active: activeTab === 'description' }" @click="problem_describe">
                        题目描述
                    </div>
                    <div class="tab-item" :class="{ active: activeTab === 'submissions' }" @click="problem_submissions">
                        我的提交
                    </div>
                </div>
                <router-view />
            </div>
        </div>

        <!-- 可拖动的分隔条 -->
        <div class="splitter" @mousedown="startDrag" @touchstart="startDrag"></div>

        <!-- 右侧面板 -->
        <div class="right-panel" ref="rightPanel">
            <div class="panel-content">
                <code_edit></code_edit>
            </div>
        </div>
    </div>
    <site_footer></site_footer>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Editor } from '@bytemd/vue-next';
import { useRouter, useRoute } from 'vue-router';
import site_footer from '@/view/footer.vue';
import site_header from '@/view/header.vue';
import code_edit from './code-edit.vue';

const activeTab = ref('description')
const leftWidth = ref(750) // 初始左侧宽度
const leftPanel = ref(null)
const rightPanel = ref(null)
let isDragging = false

const router = useRouter();
const route = useRoute();

// 题目详情
const problem_describe = () => {
    activeTab.value = 'description';
    router.push({
        name: 'describe',
        query: {
            pid: route.query.pid,
            origin: route.query.origin,
        }
    })
}

// 提交记录
const problem_submissions = () => {
    activeTab.value = 'submissions';
    router.push({
        name: 'submissions',   
        query: {
            pid: route.query.pid,
            origin: route.query.origin
        }
    })
}

// 开始拖动
const startDrag = (e) => {
    isDragging = true
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('touchmove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchend', stopDrag)
    e.preventDefault() // 防止文本选中
}

// 处理拖动
const handleDrag = (e) => {
    if (!isDragging) return

    // 获取鼠标位置
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)

    // 计算新宽度（限制最小和最大宽度）
    const containerWidth = leftPanel.value.parentElement.offsetWidth
    const minWidth = 100
    const maxWidth = containerWidth - 100

    let newWidth = clientX - leftPanel.value.getBoundingClientRect().left
    newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth))

    leftWidth.value = newWidth
}

// 停止拖动
const stopDrag = () => {
    isDragging = false
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('touchmove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchend', stopDrag)
}

// 响应式调整
const handleResize = () => {
    const containerWidth = leftPanel.value.parentElement.offsetWidth
    leftWidth.value = Math.min(leftWidth.value, containerWidth - 100)
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
    problem_describe();
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    stopDrag()
})
</script>
  
<style scoped>
.split-container {
    display: flex;
    height: 100vh;
    width: 97%;
    overflow: hidden;
    margin: 30px;
}

.tab-header {
    display: flex;
    border-bottom: 1px solid #eaecef;
    margin-bottom: 20px;
}

.tab-item {
    padding: 12px 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #586069;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
}

.tab-item:hover {
    color: #24292e;
}

.tab-item.active {
    color: #24292e;
    border-bottom-color: #f9826c;
}


.left-panel {
    height: 100%;
    background-color: #fff;
    overflow: auto;
    position: relative;
    flex-shrink: 0;
}

.right-panel {
    flex: 1;
    height: 100%;
    background-color: #fff;
    overflow: auto;
}

.splitter {
    width: 8px;
    height: 100%;
    background-color: #ddd;
    cursor: col-resize;
    transition: background-color 0.2s;
    flex-shrink: 0;
}

.splitter:hover,
.splitter:active {
    background-color: #bbb;
}

.panel-content {
    padding: 20px;
}

/* 可选：添加拖动时的视觉效果 */
.split-container.dragging {
    cursor: col-resize;
    user-select: none;
}

/* 响应式设计 - 在小屏幕上自动调整布局 */
@media (max-width: 768px) {
    .split-container {
        flex-direction: column;
    }

    .left-panel {
        width: 100% !important;
        height: 40vh;
    }

    .splitter {
        width: 100%;
        height: 8px;
        cursor: row-resize;
    }
}
</style>