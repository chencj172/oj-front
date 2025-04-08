<template>
    <site_header></site_header>
    <el-backtop :right="100" :bottom="200" />
    <router-view />
    <site_footer></site_footer>
</template>
  
<script setup>
import site_footer from '@/view/footer.vue';
import site_header from '@/view/header.vue';

</script>
  
<style scoped lang="less">

</style>