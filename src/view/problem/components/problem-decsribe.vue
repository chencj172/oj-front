<template>
    <div class="title">
        <span>{{ problem.title }}</span>
    </div>
    <div class="limit">
        <div>时间限制: C/C++ {{ problem.timeLimit }}MS，其他语言 {{ problem.timeLimit * 2  }}MS</div>
        <div>内存限制: C/C++ {{ problem.memoryLimit }}MB，其他语言 {{ problem.memoryLimit * 2 }}MB</div>
        <div>
            <span>难度: </span>
            <span class="level" :class="`level${problem.level}`">{{ problem.levelText }}</span>
        </div>
    </div>
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
import { useProblemStore } from '@/stores/problem';

const poblemStore = useProblemStore();
const route = useRoute();
const plugins = [gfm(), math()];
const sanitize = (schema) => ({ ...schema, keepComments: false });
const problem = ref({
    id: '',
    title: '',
    content: '',
    submitNum: '',
    acceptNum: '',
    tags: '',
    level: '',
    levelText: '',
    timeLimit: '',
    memoryLimit: '',
    stackLimit: '',
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
    problem.value.caseInput = res.data.caseInput;
    problem.value.content = res.data.content;
    problem.value.submitNum = res.data.submitNum;
    problem.value.acceptNum = res.data.acceptNum;
    problem.value.timeLimit = res.data.timeLimit;
    problem.value.stackLimit = res.data.stackLimit;
    problem.value.memoryLimit = res.data.memoryLimit;
    problem.value.level = res.data.level;
    if (problem.value.level == 1) {
        problem.value.levelText = '简单';
    } else if (problem.value.level == 2) {
        problem.value.levelText = '中等';
    } else {
        problem.value.levelText = '困难';
    }
    poblemStore.setProblemData(problem.value);
}

onMounted(() => {
    getProblemMsg();
})
</script>

<style scoped lang="less">
.limit {
    background-color: rgb(250, 250, 250);
    padding: 20px 0 20px 10px;
    border-left: 3px purple solid;
    div {
        margin: 10px 0 0 0;
    }

    .level {
        padding: 2px;
        border-radius: 4px;
        color: white;
        font-size: 15px;
    }
    .level1 {
        background-color: green;
    }
    .level2 {
        background-color: orange;
    }
    .level3 {
        background-color: rgba(255, 0, 0, 0.6);
    }
}

.title {
    margin: 0 0 10px 0;
    span {
        font-size: 40px;
        font-weight: 700;
    }
}
</style>