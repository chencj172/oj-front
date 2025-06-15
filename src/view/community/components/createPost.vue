<template>
    <div class="new-post-container">
      <el-page-header @back="goBack" title="返回讨论区">
        <template #content>
          <h2>新建讨论</h2>
        </template>
      </el-page-header>
  
      <el-card class="post-editor-card">
        <el-form :model="postForm" :rules="rules" ref="postFormRef">
          <el-form-item label="标题" prop="title">
            <el-input v-model="postForm.title" placeholder="请输入讨论标题" />
          </el-form-item>
  
          <el-form-item label="标签" prop="tags">
            <el-select
              v-model="postForm.tags"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择或输入标签"
              style="width: 100%"
            >
              <el-option
                v-for="tag in popularTags"
                :key="tag"
                :label="tag"
                :value="tag"
              />
            </el-select>
          </el-form-item>
  
          <el-tabs v-model="activeTab" type="border-card" class="editor-tabs">
            <el-tab-pane name="edit" label="编辑">
              <div class="editor-container">
                <MonacoEditor
                  v-model:value="postForm.content"
                  language="markdown"
                  theme="vs"
                  :options="editorOptions"
                  class="editor"
                  @change="handleEditorChange"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane name="preview" label="预览">
              <div class="markdown-preview" v-html="compiledMarkdown"></div>
            </el-tab-pane>
          </el-tabs>
  
          <el-form-item label="问题状态" prop="status">
            <el-radio-group v-model="postForm.status">
              <el-radio-button label="unsolved">未解决</el-radio-button>
              <el-radio-button label="solved">已解决</el-radio-button>
            </el-radio-group>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button @click="saveDraft">保存草稿</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
//   import MonacoEditor from '@monaco-editor/vue'
//   import { marked } from 'marked'
//   import DOMPurify from 'dompurify'
  import { ElMessage } from 'element-plus'
  
  // 初始化 marked 和 DOMPurify
  marked.setOptions({
    breaks: true,
    gfm: true
  })
  
  const router = useRouter()
  
  // 表单数据
  const postForm = ref({
    title: '',
    tags: [],
    content: '# 请输入讨论内容\n\n支持Markdown语法',
    status: 'unsolved'
  })
  
  // 验证规则
  const rules = {
    title: [
      { required: true, message: '请输入讨论标题', trigger: 'blur' },
      { min: 5, max: 100, message: '长度在 5 到 100 个字符', trigger: 'blur' }
    ],
    tags: [
      { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
    ],
    content: [
      { required: true, validator: validateContent, trigger: 'blur' }
    ]
  }
  
  function validateContent(rule, value, callback) {
    if (!value || value.trim().length < 10) {
      callback(new Error('讨论内容不能少于10个字符'))
    } else {
      callback()
    }
  }
  
  // 热门标签数据
  const popularTags = ref([
    '算法',
    '数据结构',
    'Python',
    'JavaScript',
    'C++',
    'Java',
    '动态规划',
    '二叉树',
    '前端',
    '后端',
    '数据库',
    '性能优化'
  ])
  
  // 编辑器选项
  const editorOptions = ref({
    automaticLayout: true,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'off',
    lineHeight: 24,
    folding: true,
    wordWrap: 'on',
    renderWhitespace: 'none',
    quickSuggestions: false,
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto'
    }
  })
  
  // 当前激活的标签页
  const activeTab = ref('edit')
  
  // 表单引用
  const postFormRef = ref(null)
  
  // 计算属性：编译后的Markdown
  const compiledMarkdown = computed(() => {
    return DOMPurify.sanitize(marked.parse(postForm.value.content || ''))
  })
  
  // 返回讨论区
  const goBack = () => {
    router.push('/discuss')
  }
  
  // 编辑器内容变化处理
  const handleEditorChange = (value) => {
    postForm.value.content = value
  }
  
  // 提交表单
  const submitForm = () => {
    postFormRef.value.validate((valid) => {
      if (valid) {
        // 这里应该是调用API提交数据的逻辑
        console.log('提交数据:', postForm.value)
        ElMessage.success('讨论提交成功')
        router.push('/discuss')
      } else {
        ElMessage.error('请完善表单内容')
        return false
      }
    })
  }
  
  // 重置表单
  const resetForm = () => {
    postFormRef.value.resetFields()
    postForm.value.content = '# 请输入讨论内容\n\n支持Markdown语法'
  }
  
  // 保存草稿
  const saveDraft = () => {
    if (!postForm.value.title || !postForm.value.content) {
      ElMessage.error('标题和内容不能为空')
      return
    }
    
    // 这里应该是保存草稿的逻辑
    console.log('保存草稿:', postForm.value)
    ElMessage.success('草稿保存成功', { duration: 2000 })
  }
  
  // 组件挂载时初始化
  onMounted(() => {
    // 可以在这里加载草稿或初始化数据
  })
  </script>
  
  <style scoped>
  .new-post-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .post-editor-card {
    margin-top: 20px;
  }
  
  .editor-tabs {
    margin-top: 20px;
  }
  
  .editor-container {
    height: 500px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .editor {
    height: 100%;
  }
  
  .markdown-preview {
    padding: 20px;
    min-height: 460px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fff;
  }
  
  .markdown-preview :deep(h1) {
    font-size: 2em;
    margin: 0.67em 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.3em;
  }
  
  .markdown-preview :deep(h2) {
    font-size: 1.5em;
    margin: 0.83em 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.3em;
  }
  
  .markdown-preview :deep(pre) {
    background-color: #f6f8fa;
    padding: 16px;
    border-radius: 3px;
    overflow: auto;
  }
  
  .markdown-preview :deep(code) {
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    background-color: rgba(27, 31, 35, 0.05);
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    border-radius: 3px;
  }
  
  .markdown-preview :deep(blockquote) {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    margin: 0 0 1em 0;
  }
  
  .markdown-preview :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 16px;
  }
  
  .markdown-preview :deep(table th),
  .markdown-preview :deep(table td) {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }
  
  .markdown-preview :deep(table tr) {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }
  
  .markdown-preview :deep(table tr:nth-child(2n)) {
    background-color: #f6f8fa;
  }
  </style>