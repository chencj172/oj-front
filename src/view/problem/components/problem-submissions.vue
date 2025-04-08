<template>
    <div class="problem-submissions">
      <h2>我的提交</h2>
      
      <div class="submission-list">
        <div 
          v-for="submission in submissions" 
          :key="submission.id"
          class="submission-item"
        >
          <div class="submission-meta">
            <span class="submission-id">#{{ submission.id }}</span>
            <span 
              class="submission-status"
              :class="submission.status"
            >
              {{ submission.statusText }}
            </span>
            <span class="submission-time">{{ submission.time }}</span>
          </div>
          <div class="submission-detail">
            <span class="submission-language">{{ submission.language }}</span>
            <span class="submission-runtime">{{ submission.runtime }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const pid = route.params.pid
  const submissions = ref([])
  
  // 获取提交记录
  const fetchSubmissions = async () => {
    try {
      // 实际项目中替换为API调用
      // const response = await fetch(`/api/problems/${pid}/submissions`)
      // submissions.value = await response.json()
      
      // 模拟数据
      submissions.value = [
        {
          id: 12345,
          status: 'accepted',
          statusText: 'Accepted',
          time: '2023-05-15 14:30',
          language: 'JavaScript',
          runtime: '15ms'
        },
        {
          id: 12344,
          status: 'wrong-answer',
          statusText: 'Wrong Answer',
          time: '2023-05-15 14:25',
          language: 'JavaScript',
          runtime: '12ms'
        }
      ]
    } catch (error) {
      console.error('获取提交记录失败:', error)
    }
  }
  
  onMounted(() => {
    fetchSubmissions()
  })
  </script>
  
  <style scoped>
  .problem-submissions {
    padding: 15px 0;
  }
  
  .submission-list {
    border: 1px solid #eaecef;
    border-radius: 6px;
  }
  
  .submission-item {
    padding: 12px 16px;
    border-bottom: 1px solid #eaecef;
  }
  
  .submission-item:last-child {
    border-bottom: none;
  }
  
  .submission-meta {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .submission-id {
    color: #586069;
    margin-right: 15px;
    font-family: monospace;
  }
  
  .submission-status {
    margin-right: 15px;
    font-weight: 500;
  }
  
  .submission-status.accepted {
    color: #28a745;
  }
  
  .submission-status.wrong-answer {
    color: #d73a49;
  }
  
  .submission-time {
    color: #586069;
    margin-left: auto;
  }
  
  .submission-detail {
    display: flex;
    color: #586069;
    font-size: 14px;
  }
  
  .submission-language {
    margin-right: 15px;
  }
  
  .submission-runtime {
    margin-left: auto;
  }
  </style>