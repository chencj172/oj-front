<template>
    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-col" v-for="data in footerData">
                <div class="col-title">{{ data.title }}</div>
                <div class="col-item" v-for="item in data.items">
                    <a :href="item.url" target="_blank" v-if="item.url != undefined">{{ item.text }}</a>
                    <span v-else>{{ item.text }}</span>
                </div>
            </div>
        </div>
        <div class="date">网站运行时长：{{ currentYear }}</div>
    </footer>
</template>
  
<script setup>
import { ref, onUnmounted } from 'vue';
import dayjs from 'dayjs';

// 数据可以放在这里或通过props传入
const footerData = ref([
    {
        title: 'COJ',
        items: [
            { text: '前后端分离式的OJ系统', url:'https://jobs.bytedance.com/campus/?spread=SKBPZ98' },
        ]
    }, 
    {
        title: '开发',
        items: [
            { text: 'github', url:'https://jobs.bytedance.com/campus/?spread=SKBPZ98' },
            { text: 'gitee', url:'https://jobs.bytedance.com/campus/?spread=SKBPZ98' },
        ]
    }, 
    {
        title: '联系方式',
        items: [
            { text: 'QQ: 1378755306' },
            { text: '微信: c1378755306' },
            { text: '电话: 17837483868' },
        ]
    }, 
])

let dateInterval = setInterval(() => {
    currentYear.value = dayjs.unix(new Date().getTime() / 1000).format('YYYY-MM-DD HH:mm:ss');
}, 1000);

const currentYear = ref(dayjs.unix(new Date().getTime() / 1000).format('YYYY-MM-DD HH:mm:ss'));

onUnmounted(() => {
    if(dateInterval) clearInterval(dateInterval);
})
</script>
  
<style scoped>
.site-footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 40px 0 20px;
}

.date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 0 0;
    font-size: 16px;
}

.footer-container {
    display: flex;
    flex-direction: row;
}

.footer-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 30px;
}

.footer-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .col-title {
        font-size: 20px;
        margin-bottom: 10px;
    }
    
    .col-item {
        margin-top: 5px;

        a, span{
            font-size: 16px;
            color: white;
        }
    }
}

</style>