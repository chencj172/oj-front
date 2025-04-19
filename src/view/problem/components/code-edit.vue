<template>
    <div class="oj-code-editor">
        <!-- 语言选择器 -->
        <div class="language-selector">
            <label for="language-select">编程语言：</label>
            <select id="language-select" v-model="selectedLanguage" @change="changeLanguage">
                <option v-for="lang in languages" :key="lang.value" :value="lang.value">
                    {{ lang.label }}
                </option>
            </select>
            <label for="language-select"> 字体大小：</label>
            <select id="language-select" v-model="fontSize" @change="changeFontSize">
                <option v-for="font in fontSizeOption" :key="font.value" :value="font.value">
                    {{ font.label }}
                </option>
            </select>
            <img src="/recoding.png" @click="resetEditorContent">
        </div>

        <!-- 代码编辑器容器 -->
        <div ref="editorContainer" class="editor-container"></div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
            <button class="btn debug-btn" @click="handleDebug">
                <span class="icon">🐞</span>
                <span>调试代码</span>
            </button>
            <button class="btn submit-btn" @click="handleSubmit">
                <span class="icon">🚀</span>
                <span>提交答案</span>
            </button>
        </div>
    </div>
    <!-- 测试样例 -->
    <div class="judge" v-if="showTestCase">
        <div class="run-status">
            <span>代码运行状态：</span>
            <span :class="runStatus" v-if="!isJudging">{{ runStatus }}</span>
            <!-- 判题状态区域 -->
            <el-icon class="is-loading" v-if="isJudging">
                <Loading />
            </el-icon>
        </div>
        <div class="pad">输入：</div>
        <el-input v-model="testCaseInput" />
        <div class="pad">输出：</div>
        <el-input v-model="testCaseOutput" disabled />
        <div class="pad">
            <span>运行时间：{{ runTime }}ms</span>
        </div>
        <div>
            <el-icon class="close-test-case" v-if="showTestCase" @click="showTestCase = false">
                <CloseBold />
            </el-icon>
        </div>
    </div>

    <!-- judge结果 -->
    <div class="judge" v-if="showJudgeResult">
        <div class="run-status">
            <span>判题结果：</span>
            <span :class="map.get(judgeResult.judgeResult)" v-if="!isJudging">{{ judgeResult.judgeResult }}</span>
            <!-- 判题状态区域 -->
            <el-icon class="is-loading" v-if="isJudging">
                <Loading />
            </el-icon>
        </div>

        <div v-if="judgeResult.judgeResult != 'Accepted'">
            <div class="pad">输入: </div>
            <el-input v-model="judgeResult.errorInput" />
            <div class="pad">输出: </div>
            <el-input v-model="judgeResult.errorOutput" disabled />
        </div>
        <div class="pad">
            <span>运行时间：{{ judgeResult.runTime }}ms</span>
        </div>
        <div>
            <el-icon class="close-test-case" v-if="showJudgeResult" @click="showJudgeResult = false">
                <CloseBold />
            </el-icon>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';
import { useRoute } from 'vue-router';
import { judgeProblem, testCase } from '@/api/problem-service.js';
import { useProblemStore } from '@/stores/problem';
import { getTestCaseStatus, getJudgeStatus } from '@/api/judge-service.js';

const map = new Map([
  ['Accepted', 'accepted'],
  ['Wrong Answer', 'wrong-answer'],
])

const problrmStore = useProblemStore();
// 测试样例相关
const testCaseInput = ref();
const testCaseOutput = ref();
const runTime = ref();
const runStatus = ref();
const showTestCase = ref(false);

// 判题相关
const showJudgeResult = ref(false);
const judgeResult = ref({});

// 记录是否在评测
const isJudging = ref(false);

const route = useRoute();
// 编辑器实例
const editorContainer = ref(null)
let editor = null

// 语言配置
const languages = ref([
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'javaScript', label: 'JavaScript' }
])
// 默认选择语言
const selectedLanguage = ref('cpp')

// 字体大小
const fontSize = ref(20);
const fontSizeOption = ref([
    { value: 16, label: 16 },
    { value: 18, label: 18 },
    { value: 20, label: 20 },
    { value: 22, label: 22 },
    { value: 24, label: 24 },
    { value: 26, label: 26 },
    { value: 28, label: 28 },
])

// 改变编辑器字体大小
const changeFontSize = () => {
    editor.updateOptions({
        fontSize: fontSize.value  // 更新字体大小
    });
}

// 清除编辑器内容
function resetEditorContent() {
    // 首先，创建一个撤销停顿点
    editor.pushUndoStop();

    // 然后，使用 executeEdits 清空编辑器内容
    editor.executeEdits('', [{
        range: editor.getModel().getFullModelRange(),
        text: '',  // 清空编辑器内容
        forceMoveMarkers: true,
    }]);
}

// 不同语言的默认代码模板
const codeTemplates = {
    cpp: `#include <iostream>
  using namespace std;
  
  int main() {
      int a, b;
      cin >> a >> b;
      cout << a + b << endl;
      return 0;
  }`,
    java: `import java.util.Scanner;
  
  public class Main {
      public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          int a = sc.nextInt();
          int b = sc.nextInt();
          System.out.println(a + b);
      }
  }`,
    python: `a, b = map(int, input().split())
  print(a + b)`,
    javascript: `const [a, b] = readline().split(' ').map(Number);
  print(a + b);`
}

// 初始化编辑器
onMounted(() => {
    editor = monaco.editor.create(editorContainer.value, {
        //   value: codeTemplates[selectedLanguage.value],
        language: selectedLanguage.value,
        theme: 'CodeSampleTheme',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 20,
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
    });

})

// 销毁编辑器
onBeforeUnmount(() => {
    if (editor) {
        editor.dispose()
    }
})

// 切换语言
const changeLanguage = () => {
    if (editor) {
        const model = editor.getModel()
        monaco.editor.setModelLanguage(model, selectedLanguage.value)
    }
}

let isPolling = false;
let testCaseTimeout = null;
async function getStatus() {
    if (isPolling || !(isJudging.value)) return;
    isPolling = true;
    if (testCaseTimeout) clearTimeout(testCaseTimeout);

    let ret = await getTestCaseStatus({ pid: route.params.pid - 1000 });
    console.log(ret);

    // 检查是否运行完成
    if (ret.data.status != undefined && ret.data.status != 'padding') {
        if (ret.data.status == 'Accepted') {
            testCaseOutput.value = ret.data.testCaseResult;
            runTime.value = ret.data.runTime;
            runStatus.value = ret.data.runStatus;
        } else {
            testCaseOutput.value = ret.data.runError;
            runStatus.value = ret.data.status;
        }
        console.log(testCaseOutput.value);
        isJudging.value = false;
    }

    isPolling = false;
    testCaseTimeout = setTimeout(() => {
        getStatus();
    }, 200);
}

// 调试代码
const handleDebug = async () => {
    showJudgeResult.value = false;
    showTestCase.value = true;

    const code = editor.getValue();
    console.log(problrmStore.problemData);
    await testCase({
        pid: route.params.pid - 1000,
        code: code,
        input: testCaseInput.value,
        output: '',
        language: selectedLanguage.value,
        timeLimit: problrmStore.problemData.timeLimit,
        memoryLimit: problrmStore.problemData.memoryLimit,
        stackLimit: problrmStore.problemData.stackLimit,
    });

    // 获取评测结果
    isPolling = false;
    isJudging.value = true;
    getStatus();
}

let isPolling2 = false;
let judgeTimeout;
async function getJStatus() {
    if (isPolling2 || !(isJudging.value)) return;
    isPolling2 = true;
    if (judgeTimeout) clearTimeout(judgeTimeout);

    let ret = await getJudgeStatus({ pid: route.params.pid - 1000 });
    console.log(ret);

    // 检查是否运行完成
    if (ret.data.status != undefined && ret.data.status != 'padding') {
        judgeResult.value.judgeResult = ret.data.judgeResult;
        judgeResult.value.runTime = ret.data.runTime;
        judgeResult.value.errorInput = ret.data.errorInput;
        judgeResult.value.errorOutput = ret.data.errorOutput;
        isJudging.value = false;
    }

    isPolling2 = false;
    judgeTimeout = setTimeout(() => {
        getJStatus();
    }, 200);
}

// 提交代码
const handleSubmit = async () => {
    showTestCase.value = false;
    showJudgeResult.value = true;
    const code = editor.getValue();
    await judgeProblem({
        pid: route.params.pid - 1000,
        code: code,
        input: problrmStore.problemData.answerInput,
        output: problrmStore.problemData.answerOutput,
        language: selectedLanguage.value,
        timeLimit: problrmStore.problemData.timeLimit,
        memoryLimit: problrmStore.problemData.memoryLimit,
        stackLimit: problrmStore.problemData.stackLimit,
    });

    // 获取判题结果
    isPolling2 = false;
    isJudging.value = true;
    getJStatus();
}

onMounted(() => {
    // 初始化测试输入
    setTimeout(() => {
        testCaseInput.value = problrmStore.problemData.caseInput;
    }, 1000)
})
</script>
  
<style scoped>
.oj-code-editor {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    overflow: hidden;
    color: #1e1e1e;
}

.close-test-case {
    position: absolute;
    left: 1840px;
    bottom: 150px;
    cursor: pointer;
}

.judge {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 5px 20px 5px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pad {
    padding: 10px 0 0 0;
}


.judge {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 5px 20px 5px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .Finished,
    .accepted {
        color: #4CAF50;
    }

    .wrong-answer {
        color: red;
    }

    .run-status {
        display: flex;
        padding: 10px 0 10px 0;

        .is-loading {
            margin: 0 0 0 10px;
        }
    }
}

.language-selector {
    padding: 10px 15px;
    background-color: #fff;
    /* border-bottom: 1px solid #333; */
}

.language-selector label {
    margin-right: 10px;
}

.language-selector img {
    width: 25px;
    height: 22px;
    margin: 0 0 -4px 20px;
    cursor: pointer;
}

.language-selector select {
    /* background-color: #333; */
    color: #555;
    border: 1px solid #555;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}

.editor-container {
    min-height: 580px;
    height: auto;
}

.action-buttons {
    display: flex;
    padding: 10px;
    /* background-color: #252526; */
    border-top: 1px solid #555;
}

.btn {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
}

.btn .icon {
    margin-right: 6px;
}

.debug-btn {
    background-color: #4CAF50;
    color: white;
}

.debug-btn:hover {
    background-color: #3e8e41;
}

.submit-btn {
    background-color: #2196F3;
    color: white;
}

.submit-btn:hover {
    background-color: #0b7dda;
}
</style>