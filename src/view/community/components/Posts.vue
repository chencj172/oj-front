<template>
    <h3>详情</h3>
    <div>
        {{ postsData }}
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostsById } from '@/api/posts-service.js'

const router = useRouter();
const route = useRoute();
const postsData = ref();

onMounted(() => {
    getPostsById(route.params.id).then((res) => {
        postsData.value = res.data;
        console.log(res);
    })
})

</script>

<style>

</style>