<template>
    <h1>首页</h1>
    <p>{{ text }}</p>
</template>
    
<script setup>
import { ref } from 'vue';
const text = ref('1');
</script>