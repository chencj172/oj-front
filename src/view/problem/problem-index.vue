<template>
    <div class="problem-index">
        <!-- 题目列表 -->
        <div>
            <problemList></problemList>
        </div>

        <!-- 每日一题，题目标签 -->
        <div>
            <datepicker></datepicker>
            <problemLabel></problemLabel>

        </div>
    </div>
</template>

<script setup>
import problemList from './components/problem-list.vue';
import datepicker from './components/datepicker.vue';
import problemLabel from './components/problem-label.vue';

</script>

<style scoped lang="less">
.problem-index {
    display: flex;
}

</style>