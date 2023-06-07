<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button class="button" type="primary" @click="handleClassification">添加分类</el-button>
            </div>

        </template>
        <div>
            <el-table :data="tableList" :border="parentBorder" style="width: 100%" class="heightStyle"
                :height="tableHeight">
                <el-table-column type="expand">
                    <template #default="props">
                        <el-row :gutter="20" class="classStyle" style="margin-left: 4%;margin-bottom: 10px;"
                            v-for="item in props.row.child">
                            <el-col :span="6" class="classStyle">名称: {{ item.name }}</el-col>
                            <el-col :span="6" class="classStyle">状态: {{ item.state == 200 ? "启用" : "禁用" }}</el-col>
                            <el-col :span="6" class="classStyle" v-if="item.image">图片:
                                <el-image style="width: 50px;height: 50px;" :src="item.image"
                                    :preview-src-list="[item.image]" hide-on-click-modal="true" preview-teleported="true">
                                    <template #error>
                                        <div class="image-slot">
                                            <el-icon>
                                                <user />
                                            </el-icon>
                                        </div>
                                    </template>
                                </el-image>

                            </el-col>
                        </el-row>

                    </template>
                </el-table-column>
                <el-table-column label="分类名称" prop="name" />
                <el-table-column label="状态" prop="status">
                    <template #default="props">
                        {{ props.row.status == 200 ? '启用' : '禁用' }}

                    </template>
                </el-table-column>
                <el-table-column label="图片" prop="image">
                    <template #default="scope">
                        <el-image style="width: 30px;height: 30px;" :src="scope.row.image"
                            :preview-src-list="[scope.row.image]" hide-on-click-modal="true" preview-teleported="true">
                            <template #error>
                                <div class="image-slot">
                                    <el-icon>
                                        <user />
                                    </el-icon>
                                </div>
                            </template>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button link type="primary" :icon="Edit" @click="handleEdit(scope.row, scope.$index)">编辑
                        </el-button>
                        <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.row, scope.$index)"
                            confirm-button-text="确定" cancel-button-text="再想想">
                            <template #reference>
                                <el-button link type="danger" :icon="Delete">删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <slot name="operations" v-bind="scope.row"></slot>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <tables :tableModels="tableList" :tableData="tableData" @click_1="test1" @click_2="test2" @click_3="test3"></tables> -->
        </div>
    </el-card>


    <el-dialog v-model="centerDialogVisible" :close-on-click-modal="false" title="添加分类" width="70%" left>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="一级分类：" prop="pid">
                <el-select style="width: 100%;" v-model="ruleForm.pid" placeholder="请选择一级分类名称">
                    <el-option label="一级分类" :value="0" />
                    <el-option v-for="item in tableListOne" :label="item.name" :value="item.id" />

                </el-select>
            </el-form-item>
            <el-form-item label="分类名称：" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>

            <el-form-item label="名称图片：" prop="image">
                <Upload @handlePrent="handlePrent" />
            </el-form-item>

            <el-form-item label="是否启用：" prop="status">
                <el-switch v-model="ruleForm.status" inline-prompt active-text="启用" inactive-text="禁用" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts" name="import">
import { ref, reactive, nextTick } from "vue";
import service from '@/utils/http.ts';
import { Delete, Edit } from '@element-plus/icons-vue';
// import { useRouter } from "vue-router"

import Upload from "@/components/Upload.vue"
import type { FormInstance, FormRules } from 'element-plus'
const centerDialogVisible = ref(false)
const tableListOne = ref([])
const tableList = ref([]);
const parentBorder = ref(false)

// const router = useRouter();
// const getTime = (v: any, day:any) => {

// 表格start
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    pid: '',
    image: '',
    status: true
})

const handlePrent = (url: any) => {
    ruleForm.image = url
    console.log("url", url)
}
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' }
    ],
    pid: [
        {
            required: true,
            message: '请选择分类等级',
            trigger: 'blur',
        },
    ],
    status: [
        {
            required: true,
            message: '是否启用',
            trigger: 'blur',
        },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            handleCreate()
        } else {
            console.log('error submit!', fields)
        }
    })
}
// 添加分类   
const handleCreate = () => {
    ruleForm.status == true ? 200 : 300;
    service('/create', {
        method: 'post',
        data: { ...ruleForm },
    }).then((res: any) => {
        tableList.value = res.data;
        centerDialogVisible.value = false;
        getData()
    })
}




// const resetForm = (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     formEl.resetFields()
// }

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//     value: `${idx + 1}`,
//     label: `${idx + 1}`,
// }))
// 表格end 

//     /* 获取现在的年份 */
//     let dateTimeNow = new Date().getFullYear();
//     var month = new Date().getMonth() + 1;
//     var days = new Date().getDate();
//     /* 前一年 */
//     let dateTimeBefore = new Date(new Date().setFullYear(dateTimeNow - 1)).getFullYear();
//     if (v < dateTimeNow) {
//         //年 月 日 时 分
//         console.log("===小于当前年====>")
//     }
//     if (v == dateTimeNow) {
//         if (days === day) {
//             //  是当前年 同时是当天
//             //  时分
//         } else {
//             //  月 日 时 分
//         }
//         console.log("===等于当前年====>", month)
//     }

//     console.log('dateTimeNow', dateTimeNow)
//     console.log('dateTimeBefore', dateTimeBefore)
//     console.log('days', days)

// }
// getTime(2023,day)











// const handleConfrim = () => {
//     centerDialogVisible.value = true
// }


const handleClassification = () => {
    centerDialogVisible.value = true
}





// 初始化默认参数
const props = withDefaults(defineProps(), {
    total: 0,
    showEditBtn: true,
    showDeleteBtn: true,
    operationsWidth: 200
});
console.log('------->>>', props.operationsWidth)


// 获取一级分类  
const getDataOne = () => {
    service('/topLst', {
        method: 'post',
        data: {},
    }).then((res: any) => {
        tableListOne.value = res.data;
        console.log("==获取到的===>", res.data)
    })
}

// 点击了编辑
const handleEdit = (data: any, index: any) => {
    console.log('handleEdit', data, index);
};

// 点击了删除
const handleDelete = (data: any, index: any) => {
    console.log('handleDelete', data, index);
};
// onload(()=>{
//     getData()
// })
getDataOne()

const getData = () => {
    service('/lst', {
        method: 'post',
        data: {},
    }).then((res: any) => {
        tableList.value = res.data;
        console.log("==res===>", tableList.value)
    })
}
getData()
const tableHeight = ref();
const estimateTableHeight = () => {
    nextTick(
        () => {
            let h = document.documentElement.clientHeight

            tableHeight.value = h - 200 // 根据自己项目定高度
            return h
        }
    )
}
estimateTableHeight()
</script>

<style scoped>
.heightStyle {
    height: calc(100vh -2px);
}
</style>
