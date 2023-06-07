<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button class="button" type="primary">添加分类</el-button>
            </div>

        </template>
        <div>
            <el-table :data="tableList" border class="table" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="设备名称" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
                <el-table-column prop="image" label="图片" align="center">
                    <template #default="scope">
                        <el-image style="width: 60px;height: 60px;" :src="scope.row.image"
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
</template>

<script setup lang="ts" name="import">
import { ref } from "vue";
import service from '@/utils/http.ts';
import { Delete, Edit } from '@element-plus/icons-vue';



// const getTime = (v: any, day:any) => {
    

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


















// 初始化默认参数
const props = withDefaults(defineProps(), {
    total: 0,
    showEditBtn: true,
    showDeleteBtn: true,
    operationsWidth: 200
});
console.log('------->>>', props.operationsWidth)

const tableList = ref([]);

const getData = () => {
    service('/lst', {
        method: 'post',
        data: {},
    }).then((res: any) => {
        tableList.value = res.data;
        console.log("==res===>", tableList.value)
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
getData()
</script>

<style scoped></style>
