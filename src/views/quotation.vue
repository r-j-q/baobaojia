<template>
    <el-card class="box-card box-card-card">
        <template #header>
            <div class="card-header">
                <span>编辑报价</span>
                <span class="maleft">报价总金额：<b>8888</b> <span class="font12">元</span></span>
                 
            </div>
        </template>
        <el-row>
            <el-col :span="6">

                <el-card class="box-card" shadow="naver">
                    <template #header>
                        <div class="card-header">
                            <span>场地信息</span>

                        </div>
                    </template>
                    <div  >
                        <div class="templateList">

                            <div v-if="quotationList.getListSiteData.length > 0" class="templateListChild ">
                                <span :class="items.active ? 'isActive' : ''"
                                    v-for="(items, index) in quotationList.getListSiteData"
                                    @click="handleQuotation(items, index)" class="templateListChildSpan">
                                    <div>
                                        <el-image style="margin-right: 10px; width: 30px;height: 30px;"
                                            :src="items.image || getImageUrl"
                                            :preview-src-list="[items.image || getImageUrl]" hide-on-click-modal="true"
                                            preview-teleported="true">
                                            <template #error>
                                                <div class="image-slot">
                                                    <el-icon>
                                                        <user />
                                                    </el-icon>
                                                </div>
                                            </template>
                                        </el-image>
                                    </div>
                                    <div class="maxWithStyle">{{ items.name }}</div>
                                </span>

                            </div>
                            <div v-else>
                                <center>暂无场地数据</center>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <div style="margin-left: 10px;">
                    <el-card class="box-card" shadow="naver">
                        <el-card v-if="quotationList.dataList.length>0" class="box-card-style" style="border: none;" v-for="item in quotationList.dataList">
                            <template #header>
                                <div class="card-header-style">
                                    <span> 报价信息：【<b>{{ item.name }}</b>】</span>
                                    <el-button @click="handleEdit(item)" type="primary" plain>编辑</el-button>
                                </div>

                            </template>
                        </el-card>

                        <div v-else class="box-card-style colorF5"> <center>暂无场地信息</center></div>
                        
                        <!-- <span class="dialog-footer-button">
                            <el-button type="primary" @click="submitForm(ruleFormRef)"> 保存</el-button>
                        </span> -->

                    </el-card>
                    <!-- <div v-for="item in quotationList.dataList">报价信息：【<b>{{ item.name }}</b>】</div> -->
                </div>

            </el-col>
        </el-row>
    </el-card>

    <!-- <div>
        importList1
        <button @click="fff">1</button>
    </div> -->

    <el-dialog v-model="centerDialogVisible" :close-on-click-modal="false" :title="title" width="70%" left>
        <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
            <!-- <el-form-item label="一级分类：" prop="pid">
                <el-select style="width: 100%;" v-model="ruleForm.pid" placeholder="请选择一级分类名称">
                    <el-option label="一级分类" :value="0" />
                    <el-option v-for="item in tableListOne" :label="item.name" :value="item.id" />

                </el-select>
            </el-form-item> -->
            <el-form-item label="分类名称：" prop="name">
                <el-input v-model="ruleForm.name" />
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
// import { ElMessage } from 'element-plus'

import service from '@/utils/http.ts'
import getImageUrl from "../assets/img/zwt.png"
import { useSiteData } from "@/store/useSiteData"
// import type { FormInstance } from 'element-plus'

const formSize = ref('default')
const siteData = ref({});
const title = ref('');
 
const centerDialogVisible = ref(false);
const quotationList = useSiteData();
const ruleForm = reactive({
    name: '',
    image: '',
    desc: ""
})
// const { setSiteData, dataList } =cccc
// const siteData2 = ref([{
//     name: "场地一",
//     image: "",
//     id: 1
// }]);



const siteInfor = reactive([
    {
        name: "场地一",
        image: "",
        id: 1,
        active: false
    },
    {
        name: "场地二",
        image: "",
        id: 2,
        active: false
    },
    {
        name: "场地三",
        image: "",
        id: 3,
        active: false
    }
]);
if (quotationList.getListSiteData && quotationList.getListSiteData.length > 0) {
    quotationList.getSiteData(quotationList.getListSiteData);
    console.log("------1")
} else {
    quotationList.getSiteData(siteInfor);
    console.log("------2")

}

const handleEdit = (item:any) =>{
    title.value = `【${item.name}】信息录入`;
    centerDialogVisible.value= true
}
// 自动存入


const tableList = ref([]);
const getDataOne = () => {
    service('/lst', {
        method: 'post',
        data: {},
    }).then((res: any) => {
        tableList.value = res.data;
        console.log("==res===>", tableList.value)
    })
}
getDataOne()
const submitForm = async () => {
    console.log('error submit!')
    // if (!formEl) return
    // await formEl.validate((valid, fields) => {
    //     if (valid) {
    //         console.log('submit!')
    //         handleCreate()
    //     } else {
    //         console.log('error submit!', fields)
    //     }
    // })
}
const handleQuotation = (item: any, index: any) => {
    quotationList.getListSiteData[index].active = !quotationList.getListSiteData[index].active
    siteData.value = item;
    quotationList.setSiteData(quotationList.getListSiteData, quotationList.getListSiteData.filter((item: any) => item.active === true))

}
</script>

<style scoped>
.templateList {
    display: flex;
    flex-direction: column;

    /* border: 1px solid #e4e7ed; */
    /* padding: 10px; */
    margin-right: 10px;
}

.templateListOne {


    margin-bottom: 10px;
}

.box-card-style {
    margin-bottom: 10px;
     /* height: calc('100vh-200px'); */
     height: calc(70vh);
}
.el-card{
    height: calc(70vh);
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
    /* margin: 0 auto; */
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
}

.templateListChildSpan {
    width: 40%;
    background-color: #f5f5f5;
    color: #000;
    border-radius: 4px;
    font-size: 12px;
    padding: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.isActive {
    background-color: #409eff;
    color: #fff;

}

.dialog-footer-button {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
}

.card-header-style {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.maxWithStyle{
    max-width:100px;
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis; 
}
.maleft{
    margin-left: 10%;
    color: #409eff;
}
.font12{
    font-size: 12px;
}
.colorF5{
    color: #ccc;
}
.box-card-card{
    padding-bottom: 100px;
}
</style>
