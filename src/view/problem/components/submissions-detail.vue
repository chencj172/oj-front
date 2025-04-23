<template>
    <div class="submission-detail">
        <div class="header">
            <h1>提交详情</h1>
        </div>

        <div class="submission-meta">

            <template v-for="item in submissionMessage">
                <div class="meta-item">
                    <span class="meta-label">{{ item.label }}</span>
                    <span class="meta-value">{{ item.value }}</span>
                </div>
            </template>
        </div>

        <div class="code-container">
            <div class="code-header">
                <span>代码</span>
                <button class="copy-btn" @click="copyCode">复制代码</button>
            </div>
            <pre class="code-content"><code>{{ submissionCode }}</code></pre>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getJudgeRecordDetail } from '@/api/problem-service.js';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

const route = useRoute();
const submissionMessage = ref([
    {
        label: '运行结果：',
        value: 'Accepted',
    },
    {
        label: '运行时间：',
        value: '13 ms',
    },
    {
        label: '运行空间：',
        value: '220 KB',
    },
    {
        label: '提交时间：',
        value: '2025-01-01 11:11:11',
    },
    {
        label: '语言：',
        value: 'C++',
    },
]);
const submissionCode = ref(`#include <iostream>
int main()
{
    int a,b;
    std::cin >> a >> b;
    std::cout << a + b;
    return 0;
}`);

const copyCode = () => {
    navigator.clipboard.writeText(submissionCode.value)
        .then(() => {
            ElMessage.success('代码已复制到剪贴板')
        })
        .catch(err => {
            ElMessage.error('复制失败')
        })
};

const initJudgeDetailData = async () => {
    let res = await getJudgeRecordDetail(route.query.id);
    submissionMessage.value[0].value = res.data.judgeResult;
    submissionMessage.value[1].value = `${res.data.runTime}ms`;
    submissionMessage.value[2].value = `${res.data.runMemory}kb`;
    submissionMessage.value[3].value = dayjs(new Date(res.data.createTime).getTime()).format('YYYY-MM-DD HH:mm:ss');
    submissionMessage.value[4].value = res.data.language;

    submissionCode.value = res.data.code;
}
onMounted(() => {
    initJudgeDetailData();
})
</script>

<style scoped>
.submission-detail {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 15px;
}

h1 {
    font-size: 24px;
    margin: 0;
}

.back-link {
    color: #1a73e8;
    cursor: pointer;
    font-size: 14px;
}

.back-link:hover {
    text-decoration: underline;
}

.submission-meta {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
}

.meta-item {
    display: flex;
    margin-bottom: 10px;
    font-size: 15px;
}

.meta-item:last-child {
    margin-bottom: 0;
}

.meta-label {
    font-weight: bold;
    min-width: 80px;
    color: #555;
}

.meta-value {
    flex: 1;
}

.result-accepted {
    color: #28a745;
    font-weight: bold;
}

.code-container {
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    overflow: hidden;
}

.code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f6f8fa;
    padding: 10px 15px;
    border-bottom: 1px solid #e1e4e8;
    font-size: 14px;
    font-weight: bold;
}

.copy-btn {
    background-color: #f6f8fa;
    border: 1px solid #d1d5da;
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 12px;
    cursor: pointer;
    color: #24292e;
}

.copy-btn:hover {
    background-color: #e9ecef;
}

.code-content {
    margin: 0;
    padding: 15px;
    background-color: #fff;
    overflow-x: auto;
}

code {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 13px;
    line-height: 1.5;
    color: #24292e;
    white-space: pre;
}
</style>