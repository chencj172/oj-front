<template>
    <Viewer :value="problem.content" :plugins="plugins" />
    <!-- <span>{{ route.params.pid }}</span> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Viewer } from '@bytemd/vue-next';
import math from '@bytemd/plugin-math-ssr';
import gfm from '@bytemd/plugin-gfm';
import 'katex/dist/katex.css';
import { useRoute } from 'vue-router';
import { getProblemById } from '@/api/problem-service';

const route = useRoute();
const plugins = [gfm(), math()];
const sanitize = (schema) => ({ ...schema, keepComments: false });
const problem = ref({
    id: '',
    title: '',
    content: '',
    submit_num: '',
    accept_num: '',
    tags: '',
    level: ''
});


const problemContent = ref(`
## 输入两个整数，求这两个整数的和是多少

### 输入格式

输入两个整数 \\( A, B \\)，用空格隔开

### 输出格式

输出一个整数，表示这两个数的和

## 数据范围

$0 \\leq A, B \\leq 10^8$

$0 \\geq A, B \\geq 10^8$

$E = mc^2$

## 输入样例

\`\`\`shell
3 4
\`\`\`

## 输出样例

\`\`\`shell
7
\`\`\`
`);

const getProblemMsg = async () => {
    let res = await getProblemById(route.params.pid - 1000);
    console.log(res.data);
    problem.value.id = res.data.id;
    problem.value.title = res.data.title;
    problem.value.content = res.data.content;
    problem.value.submit_num = res.data.submitNum;
    problem.value.accept_num = res.data.acceptNum;
    problem.value.level = res.data.level;
    console.log(problem.value.content);
    console.log(problemContent.value);
}

onMounted(() => {
    getProblemMsg();
})
</script>

<style scoped lang="less"></style>