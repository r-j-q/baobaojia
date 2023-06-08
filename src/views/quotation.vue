<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>编辑报价</span>

            </div>
        </template>
        <el-row>
            <el-col :span="6">
                <div>

                    <div class="templateList">
                        <div class="templateListOne" v-if="tableList.length > 0" v-for="item in tableList">
                            <div class="templateListTitle">{{ item.name }}</div>
                            <div class="templateListChild">
                                <span v-if="item.child && item.child.length > 0" 
                                    v-for="items in item.child"
                                    @click="handleQuotation(items)"
                                    class="templateListChildSpan">
                                    <div> <el-image style="width: 50px;height: 50px;" :src="items.image || getImageUrl">
                                        </el-image></div>
                                    <div>{{ items.name }}</div>
                                </span>
                            </div>

                        </div>
                        <div v-else>
                            <center>暂无分类数据</center>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div>222</div>
            </el-col>
        </el-row>
    </el-card>

    <!-- <div>
        importList1
        <button @click="fff">1</button>
    </div> -->
</template>

<script setup lang="ts" name="import">
import { ref } from "vue";

import service from '@/utils/http.ts'
import getImageUrl from "../assets/img/zwt.png"

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
const handleQuotation = (item:any) =>{
    console.log("===item=====>",item)
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
