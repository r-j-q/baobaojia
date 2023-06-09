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
                    <div>
                        <div class="templateList ">

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
                    <el-card v-if="quotationList.dataList.length > 0" style="border: none;"
                        v-for="item in quotationList.dataList" class="marginTop">
                        <template #header>
                            <div class="card-header-style">
                                <span> 报价信息：【<b>{{ item.name }}</b>】</span>
                                <!-- <el-button @click="handleEdit(item)" type="primary" plain>编辑</el-button> -->
                            </div>
                        </template>
                    </el-card>

                    <div v-else class="  colorF5">
                        <center>暂无场地信息</center>
                    </div>

                </div>

            </el-col>
        </el-row>
    </el-card>




    <!-- 侧边 -->
    <el-drawer ref="drawerRef" v-model="dialog" :with-header="false" :before-close="handleClose" direction="rtl" size="80%">
        <div class="titleBottom">
            <div>{{ title }}</div>
             <el-icon size="20" color="#dcdfe6" @click="cancelForm" class="cus">
                <Close />
            </el-icon>
        </div>
        <div class="demo-drawer__content">
            <el-form :model="form">
                <el-row :gutter="20">
                    <el-col :span="8" class="countStyleBack0">
                        <el-form-item label="场地设计图：" prop="name">
                            <div class="siteImageStyle">

                                <el-carousel trigger="click" height="100px">
                                    <el-carousel-item height="100px">

                                        <el-image style="width: 200px;height: 100px;" :src="siteImage || getImageUrl"
                                            :preview-src-list="[siteImage || getImageUrl]" hide-on-click-modal="true"
                                            preview-teleported="true">
                                        </el-image>

                                    </el-carousel-item>
                                </el-carousel>

                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="countStyleBack">
                        <el-form-item label="名称：" prop="name">
                            <el-input v-model="quotationList.customData[countStyle].lable" />
                        </el-form-item><br />
                        <el-form-item label="内容：" prop="name">
                            <el-input v-model="quotationList.customData[countStyle].defaultValue" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="countStyleBack0">
                        <el-tree-select v-model="seleteValue" :data="seleteData" filterable />
                    </el-col>
                </el-row>

                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(itm, index) in quotationList.customData">
                        <el-form-item :class="countStyle == index ? 'formItemStyleClick' : 'formItemStyleClickf5'"
                            @click="handleFormChange(itm, index)" :label="itm.lable" :label-width="formLabelWidth">
                            <el-input disabled   v-model="itm.defaultValue" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="">
                    <el-button type="primary" :icon="CirclePlus" @click="handleAddQuotation">新增</el-button>
                </el-form-item>
                <!-- <el-form-item label="Area" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select activity area">
                        <el-option label="Area1" value="shanghai" />
                        <el-option label="Area2" value="beijing" />
                    </el-select>
                </el-form-item> -->
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取消</el-button>
                <el-button type="primary" :loading="loading" @click="onClick">保存</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts" name="import">
import { ref, reactive } from "vue";
// import { ElMessage } from 'element-plus'

import service from '@/utils/http.ts'
import getImageUrl from "../assets/img/zwt.png"
import { useSiteData } from "@/store/useSiteData"
import { ElDrawer } from 'element-plus'
import { CirclePlus ,Close} from '@element-plus/icons-vue'
const seleteValue = ref()
// const refresh = inject<any>("inject");

// 下面这行代码写在你需要reload的地方

const seleteData = [
    {
        value: '1',
        label: 'Level one 1',
        children: [
            {
                value: '1-1',
                label: 'Level two 1-1'
            },
        ],
    }
]
const siteData = ref({});
const title = ref('');
const siteImage = ref('');

const quotationList = useSiteData();

//获取数据  quotationList.customData
//方法传入参数 quotationList.customFromData
const countStyle = ref<any>(0);

// 新增输入框
const handleAddQuotation = () => {
    
    quotationList.customFromData();
//  console.log(typeof refresh())
   
}

const handleFormChange = (itm: any, index: any) => {

    countStyle.value = index;
    console.log(itm, index);
}
const formLabelWidth = '80px'

const timer = ref<any>()
const dialog = ref(false)
const loading = ref(false)
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()
const onClick = () => {
    drawerRef.value!.close()
}

const handleClose = (done: any) => {
    if (loading.value) {
        return
    }
    loading.value = true
    done()
    loading.value = false
}

const cancelForm = () => {
    loading.value = false
    dialog.value = false
    clearTimeout(timer.value)
}

const siteInfor = ref<any>([]);
const getListSite = () => {
    service('/listSite', {
        method: 'post',
        data: {
            "page": "1",
            "limit": "20"
        },
    }).then((res: any) => {
        const { data } = res.data;
        data.forEach((item: any) => item.active = false)
        siteInfor.value = data;
        quotationList.getSiteData(data);
        console.log("==res===>", siteInfor)
    })
}



if (quotationList.getListSiteData && quotationList.getListSiteData.length > 0) {
    quotationList.getSiteData(quotationList.getListSiteData);
    console.log("------1")
} else {

    console.log("------2")
    getListSite()
}

const handleEdit = (item: any) => {
    title.value = `【${item.name}】信息录入`;
    siteImage.value = item.image;
    dialog.value = true

    // centerDialogVisible.value = true
}
// 自动存入


// const tableList = ref([]);
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
// const submitForm = async () => {
//     console.log('error submit!')
//     // if (!formEl) return
//     // await formEl.validate((valid, fields) => {
//     //     if (valid) {
//     //         console.log('submit!')
//     //         handleCreate()
//     //     } else {
//     //         console.log('error submit!', fields)
//     //     }
//     // })
// }
const handleQuotation = (item: any, index: any) => {
    quotationList.getListSiteData.forEach((itema: any, ind: any) => {
        if (index === ind) {
            quotationList.getListSiteData[ind].active = true
        } else {
            quotationList.getListSiteData[ind].active = false
        }
        console.log('error submit!', itema)
    })
    handleEdit(item)
    // quotationList.getListSiteData[index].active = !quotationList.getListSiteData[index].active
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

.siteImageStyle {
    width: 200px;
    /* position: absolute;
    top: 100px;
    left: 10%;
    z-index: 99; */
    /* border: 2px solid #409eff; */
    /* height: 100px; */
}

.siteImageStyle img {
    width: 100%;
    height: 100%;
}

.box-card-style {
    margin-bottom: 10px;
    /* height: calc('100vh-200px'); */
    height: calc(70vh);
}

/* .el-card {
    height: calc(70vh);
} */

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

.maxWithStyle {
    max-width: 100px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.maleft {
    margin-left: 10%;
    color: #409eff;
}

.font12 {
    font-size: 12px;
}

.colorF5 {
    color: #ccc;
}

.box-card-card {
    min-height: 80vh;
}

.dialogMaxHeight {
    max-height: 500px;
    overflow-y: scroll;
    position: relative;
    min-height: 100px;
}

.titleBottom {
    margin-bottom: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.demo-drawer__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.marginTop {
    margin-bottom: 10px
}

.formItemStyleClick {
    border: 5px solid #409eff;
    border-radius: 5px;
    cursor: pointer;
}

.formItemStyleClickf5 {
    border: 5px solid #f5f5f5;
    border-radius: 5px;
    cursor: pointer;

}

.countStyleBack {
    background-color: #409eff;
    padding: 20px;
    border-radius: 5px;
}

.countStyleBack0 {
    padding: 20px;
}


::v-deep(.formItemStyleClick > .el-form-item__label) {
    color: #000;
    background-color: #f5f5f5;
}

::v-deep(.formItemStyleClickf5 > .el-form-item__label) {
    color: #000;
    background-color: #f5f5f5;

}

::v-deep(.el-form-item__label) {
    color: #fff;
}
.cus {
    cursor: pointer;
}
</style>
