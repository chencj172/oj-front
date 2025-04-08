<template>
    <div class="problem">
        <div class="first-row">
            <span>题目列表</span>
            <div>
                <el-input v-model="searchText" style="width: 2.4rem; padding-right: 0.2rem;" size="small"
                    placeholder="请输入关键词..." :suffix-icon="Search" />
                <el-button type="primary">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </div>
            <el-checkbox v-model="showLabel" label="标签" size="large" />
        </div>
        <div class="second-row">
            <span>难度</span>
            <template v-for="(text, index) in level">
                <el-button type="primary" text bg @click="switch_level(index)"
                    :class="{ 'selected': selectedButton === index }">
                    {{ text }}
                </el-button>
            </template>
        </div>
        <div>
            <el-table :data="problemData" stripe class="problem-table" table-layout="auto">
                <el-table-column prop="status" label="状态">
                    <template #default="scope">
                        <!-- 1表示通过；2表示正在尝试还没通过；3表示未尝试  -->
                        <el-icon v-if="scope.row.status == 1" style="color: green;"><Select /></el-icon>
                        <el-icon v-else-if="scope.row.status == 2" style="color: rgb(255, 201, 38);">
                            <KnifeFork />
                        </el-icon>
                        <el-icon v-else-if="scope.row.status == 3"></el-icon>
                    </template>
                </el-table-column>
                <el-table-column prop="pid" label="题目ID" />
                <el-table-column prop="pname" label="题目">
                    <template #default="scope">
                        <div class="pname-label">
                            <span @click="show_detail(scope.row.pid)" class="pname">{{ scope.row.pname }}</span>
                            <div class="tag-cloud">
                                <span class="tag" v-for="label in scope.row.label" v-show="showLabel" :style="{
                                    'background-color': getTagColor(label)
                                }">{{ label }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="level" label="难度">
                    <template #default="scope">
                        <span v-if="scope.row.level == 1" style="color: rgb(0, 184, 163);">简单</span>
                        <span v-else-if="scope.row.level == 2" style="color: orange;">中等</span>
                        <span v-else-if="scope.row.level == 3" style="color: red;">困难</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ac_rate" label="通过率" />
            </el-table>
        </div>
    </div>
    <div class="limit-pnum">
        <div>
            <el-pagination @change="page_change" v-model:current-page="current_page" background layout="prev, pager, next"
                :total="1000" />
        </div>
        <div>
            <el-select v-model="options_value" style="width: 1.4rem" @change="option_change" class="select-page">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const searchText = ref();
const showLabel = ref(false);
const level = ref(['全部', '简单', '中等', '困难']);
const problemData = ref([])  // 存储题目数据
const selectedButton = ref(0);
const options = ref([
    {
        label: '20条/页',
        value: 20
    },
    {
        label: '50条/页',
        value: 50
    },
    {
        label: '100条/页',
        value: 100
    },
])
const options_value = ref(20);
const total_page = ref(0); // 总页数
const current_page = ref(1); // 当前选择的页数
const page_data_num = ref(20); // 每页显示的条数
const switch_level = (index) => {
    selectedButton.value = index;
}
const colors = [
    '#f0f9ff', '#e6f7ff', '#f6ffed', '#fff7e6',
    '#fff0f6', '#f0f0ff', '#f6f6f6', '#e6fffb',
    '#fff2e8', '#f9f0ff', '#e8f4ff', '#f5f5f5'
];

// 生成标签颜色
const getTagColor = (tag) => {
    const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
};

const show_detail = (pid) => {
    const c = router.resolve({
        path: "/problem/detail",
    });
    window.open(c.href, "_blank");

    console.log(pid);
}

// 每页显示条数变化的回调函数
const option_change = () => {
    page_data_num.value = options_value.value;
    initData();
}

// 页数变化
const page_change = () => {
    console.log(current_page.value);
}

// 初始化题目数据
const initData = async () => {
    problemData.value = [];
    for (let i = 0; i < page_data_num.value; i++) {
        problemData.value.push({
            status: i % 3 + 1,
            pid: '1111',
            pname: '回文数',
            level: i % 3 + 1,
            ac_rate: 50 + '%',
            label: ['回文', 'dfs', 'DP']
        })
    }
}

onMounted(() => {
    initData();
})
</script>

<style scoped lang="less">
.problem {
    // height: 1200px;
    height: auto;
    width: 1000px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 20px 0px 100px 240px;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.limit-pnum {
    display: flex;
    justify-content: flex-end;
    margin: -80px 0 20px 0px;
}

.pname-label {
    display: flex;
}

.pname {
    cursor: pointer;
    width: 30%;
}

.problem-table {
    width: 95%;
    margin-left: 18px;
}

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
}

.tag {
    display: inline-block;
    padding: 0 4px 0 4px;
    border-radius: 4px;
    font-size: 14px;
    cursor: default;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}


.first-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 20px;
    margin-left: -60px;

    span {
        font-size: 24px;
    }
}

.second-row {
    font-size: 15px;
    font-weight: 1000;
    margin: 10px 0 0 30px;

    button {
        margin-left: 20px;
    }

    .selected {
        color: white;
        background-color: rgb(25, 190, 107) !important;
    }
}
</style>