<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header"> 
                <el-button class="button" type="primary" @click="handleSiteInformation">新增场地信息</el-button>
             </div>
        </template>
        <el-table :data="tableList"   style="width: 100%" class="heightStyle"
                 >
                
                <el-table-column label="场地位置" prop="name" />
                <el-table-column label="场地图片" prop="image">
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
                <el-table-column label="备注" prop="name" />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <!-- <el-button link type="primary" :icon="Edit" @click="handleEdit(scope.row, scope.$index)">编辑
                        </el-button> -->
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
    </el-card>

    <!-- <div>
        importList1
        <button @click="fff">1</button>
    </div> -->

    <el-dialog v-model="centerDialogVisible" :close-on-click-modal="false" title="新增场地信息" width="70%" left>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
             
            <el-form-item label="场地位置：" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>

            <el-form-item label="场地图片：" prop="image">
                <Upload @handlePrent="handlePrent" />
            </el-form-item>
            <el-form-item label="备注：" prop="desc" >
                <el-input v-model="ruleForm.desc"  type="textarea" />
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
import { ref,reactive } from "vue";
import type {FormInstance,   FormRules } from 'element-plus'
// import service from '@/utils/http.ts'
// const ruleForm = ref([]);
const centerDialogVisible = ref(false);
const tableList = ref([]);
 
const formSize = ref('default')
const ruleForm = reactive({
    name: '', 
    image: '',
    desc:""
})


 
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入场地名称', trigger: 'blur' }
    ],
    image: [
        {
            required: true,
            message: '请上传场地图片',
            trigger: 'blur',
        },
    ] 
})

// 新增场地信息验证
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
           
        } else {
            console.log('error submit!', fields)
        }
    })
}
const handlePrent = (url: any) => {
    // ruleForm.image = url
    console.log("url", url)
}
// import getImageUrl from "../assets/img/zwt.png"

 
// const getDataOne = () => {
//     service('/lst', {
//         method: 'post',
//         data: {},
//     }).then((res: any) => {
//         tableList.value = res.data;
//         console.log("==res===>", tableList.value)
//     })
// }
// getDataOne()
// const handleQuotation = (item:any) =>{
//     console.log("===item=====>",item)
// }

const handleSiteInformation = () =>{
    centerDialogVisible.value =true
}
</script>

<style scoped>
.templateList {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh-100px);
    border: 1px solid #e4e7ed;
    padding: 10px;
    margin-right: 10px;
}

.templateListOne {


    margin-bottom: 10px;
}

.templateListTitle {
    margin-bottom: 10px;
    color: #000;
    border-radius: 4px;
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    background: #f5f5f5;
    width: fit-content;
}

.templateListChild {
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
}

.templateListChildSpan {
    width: 40%;
    background-color: #409eff;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    padding: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
