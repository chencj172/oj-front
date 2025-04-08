<template>
    <div class="problem-container">
        <Viewer :value="problemContent" :plugins="plugins" :sanitize="sanitize" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Viewer } from '@bytemd/vue-next';
import math from '@bytemd/plugin-math-ssr';
import gfm from '@bytemd/plugin-gfm';
import 'katex/dist/katex.css';

const plugins = [gfm(), math()];
const sanitize = (schema) => ({ ...schema, keepComments: false });
const problemContent = ref(`# 输入两个整数，求这两个整数的和是多少

## 输入格式

输入两个整数 \\( A, B \\)，用空格隔开

## 输出格式

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

</script>

<style scoped lang="less">
.problem-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 数学公式样式 */
.katex {
    font-size: 1.1em;
}
</style>