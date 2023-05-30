<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button class="button" type="primary">添加分类</el-button>
            </div>
            
        </template>
        <div>
                <tables :tableModels="tableList" :tableData="tableData" @click_1="test1" @click_2="test2" @click_3="test3"></tables>
            </div>
    </el-card>
</template>

<script setup lang="ts" name="import">
import {ref} from "vue";
import service from '@/utils/http.ts';
const tableList =ref([]);
// const tableData = {
//     reqUrl: "https://easy-mock.com/mock/5f2403effa76424e9506a6b8/example/getData",
//     operaData: {
//         isShow: true,
//         data: [
//             { label: "删除", type: "danger" },
//             { label: "增加", type: "primary" },
//             { label: "其他", type: "info" }
//         ]
//     },
//     columnData: [
//         { prop: "name", label: "名字", width: 200, align: "center" },
//         { prop: "time", label: "时间", align: "center" }
//     ]
// }

// const test1 = (e: any) => {
//     //   this.$message("删除")
//     console.log("删除", e.name);
// }
// const test2 = (e: any) => {
//     //   this.$message("增加");
//     console.log("增加", e.name);
// }
// const test3 = (e: any) => {
//     //   this.$message("其他");
//     console.log("其他", e.name);
// }

const getData =()=>{
    service('/lst', {
        method: 'post',
        data: {},
      }).then((res: any) => {
     tableList.value= res.data;
        console.log("==res===>", tableList.value )
      })
}
getData()

 
</script>

<style scoped></style>
