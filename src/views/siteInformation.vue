<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button class="button" type="primary" @click="handleSiteInformation">新增场地信息</el-button>
            </div>
        </template>
        <el-table :data="tableList" style="width: 100%" class="heightStyle">

            <el-table-column label="场地位置" prop="name" />
            <el-table-column label="场地图片" prop="image">
                <template #default="scope">
                    <el-image style="width: 30px;height: 30px;" :src="scope.row.image || getImageUrl"
                        :preview-src-list="[scope.row.image || getImageUrl]" hide-on-click-modal="true"
                        preview-teleported="true">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" />
            <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                    <el-button link type="primary" @click="handleEdit(scope.row, scope.$index)">编辑
                    </el-button>
                    <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.row, scope.$index)" confirm-button-text="确定"
                        cancel-button-text="再想想">
                        <template #reference>
                            <el-button link type="danger">删除
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
                <UploadFileList @handlePrent="handlePrent" :fileList="fileList" />
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="ruleForm.remark" type="textarea" />
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
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import service from '@/utils/http.ts'
const ruleFormRef = ref<FormInstance>()
import { ElMessage } from 'element-plus'
import getImageUrl from "../assets/img/zwt.png"
// import { addListener } from "process";

const siteId = ref('');
const addSite = ref('');
const centerDialogVisible = ref(false);
const tableList = ref([]);
const fileList = ref<any>([])
const formSize = ref('default')
const ruleForm = reactive({
    name: '',
    image: '',
    remark: ""
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
            addSite.value == 'edit' ? editSite() : createSite()

        } else {
            console.log('error submit!', fields)
        }
    })
}
const handlePrent = (url: any) => {
    ruleForm.image = url
    console.log("url", url)
}
// import getImageUrl from "../assets/img/zwt.png"

const handleEdit = (item: any) => {
    addSite.value = 'edit'
    // const ruleForm = reactive({
    // name: '',
    // image: '',
    // remark: ""
    // })
    fileList.value = [{
        name: new Date(),   //如果没有name,可以自己随便定义
        url: item.image,

    }]
    siteId.value = item.id
    ruleForm.name = item.name
    ruleForm.remark = item.remark
    centerDialogVisible.value = true

}
const createSite = () => {

    service('/createSite', {
        method: 'post',
        data: { ...ruleForm },
    }).then((res: any) => {
        getListSite()
        ElMessage.success(res.info)
        centerDialogVisible.value = false

    })
}
const editSite = () => {

    service('/editSite', {
        method: 'post',
        data: { ...ruleForm, id: siteId.value },
    }).then((res: any) => {
        getListSite()
        ElMessage.success(res.info)
        centerDialogVisible.value = false

    })
}

const getListSite = () => {
    service('/listSite', {
        method: 'post',
        data: {
            "page": "1",
            "limit": "20"
        },
    }).then((res: any) => {
        const { data } = res.data;
        tableList.value = data;

        console.log("==res===>", tableList.value)
    })
}
getListSite()
// 点击了删除
const handleDelete = (data: any, index: any) => {
    console.log('handleDelete', data, index);
    service('/delSite', {
        method: 'post',
        data: { id: data.id },
    }).then((res: any) => {
        ElMessage.success(res.info)
        getListSite()
        console.log("==res===>", res)
    })
};

const handleSiteInformation = () => {
    addSite.value = 'add'
    centerDialogVisible.value = true
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
