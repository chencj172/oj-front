<template>
    <div class="calendar-container">
        <div class="title">
            <span>每日一题</span>
        </div>
        <!-- 头部控制 -->
        <div class="calendar-header">
            <button @click="prevMonth"><el-icon>
                    <ArrowLeft />
                </el-icon></button>
            <span>{{ currentMonth }}</span>
            <button @click="nextMonth"><el-icon>
                    <ArrowRight />
                </el-icon></button>
        </div>

        <!-- 星期标题 -->
        <div class="weekdays">
            <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
        </div>

        <!-- 日期格子 -->
        <div class="days-grid">
            <div v-for="day in days" :key="day.date" class="day" :class="{
                'current-month': day.isCurrentMonth,
                'today': isToday(day.date)
            }" @click="toggleCheck(day.date)" @mouseover="showMsg(day.date)" @mouseleave="hoverDate = null">
                {{ day.day }}
                <span v-if="isChecked(day.date)"><el-icon class="check-marker">
                        <SuccessFilled />
                    </el-icon></span>
                <span v-if="isToday(day.date)" class="today-marker">今</span>
                <div v-if="hoverDate === day.date" class="day-problem">
                    {{ day.date }}
                </div>
            </div>
        </div>

        <!-- <span v-show="showText" class="message">{{ showMessage }}</span> -->
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const currentDate = ref(new Date())
const checkedDates = ref({
    "2025-03-05": true,
    "2025-03-07": true,
    "2025-03-12": true
})
const hoverDate = ref(null);

// 从后端加载本月打卡记录
onMounted(() => {
})

// 悬停显示每日一题题目
const showMsg = (date) => {
    hoverDate.value = date;
}

// 生成月份标题
const currentMonth = computed(() => {
    return currentDate.value.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long'
    })
})

// 生成日期数据
const days = computed(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()

    // 当月第一天
    const firstDay = new Date(year, month, 1)
    // 上个月最后一天
    const lastDayOfPrevMonth = new Date(year, month, 0)
    // 当月最后一天
    const lastDay = new Date(year, month + 1, 0)

    const days = []

    // 添加上个月末尾的几天
    for (let i = firstDay.getDay(); i > 0; i--) {
        const date = new Date(year, month - 1, lastDayOfPrevMonth.getDate() - i + 1)
        days.push({
            day: date.getDate(),
            date: formatDate(date),
            isCurrentMonth: false
        })
    }

    // 添加当月所有天
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i + 1)
        days.push({
            day: i,
            date: formatDate(date),
            isCurrentMonth: true
        })
    }

    return days
})

// 点击跳转到每日一题
const toggleCheck = (date) => {
    console.log(date);
}

// 判断是否是今天
const isToday = (dateString) => {
    return formatDate(new Date()) === dateString
}

// 判断是否已打卡
const isChecked = (dateString) => {
    return checkedDates.value[dateString]
}

// 日期格式化辅助函数
const formatDate = (date) => {
    return date.toISOString().split('T')[0]
}

// 切换月份，重新请求打卡数据
const prevMonth = () => {
    currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1
    )
}

const nextMonth = () => {
    currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1
    )
}
</script>
  
<style scoped lang="less">
.message {
    position: absolute;
}

.day-problem {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  margin-bottom: 8px;
  z-index: 10;
}

.day-problem::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

.calendar-container {
    max-width: 400px;
    margin: 20px 0 0 20px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .title {
        font-size: 16px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    span {
        font-size: 25px;
        font-weight: 900;
    }

    button {
        font-size: 20px;
    }
}

.weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-bottom: 10px;
    font-size: 20px;
}

.weekday {
    text-align: center;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 5px;
}

.days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    font-size: 16px;
}

.day {
    position: relative;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
}

.day.current-month {
    background: #fff;
}

.day.checked {
    background: #4CAF50;
    color: white;
}

.day.today {
    background: #4CAF50;
    color: white;
}

.day:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.today-marker {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 0.6em;
    color: #ff6b6b;
}

.check-marker {
    position: absolute;
    top: 2px;
    right: 0px;
    font-size: 0.7em;
    color: green;
}

button {
    padding: 5px 15px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
}
</style>