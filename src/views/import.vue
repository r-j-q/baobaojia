

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button class="button" type="text"  >分类列表</el-button>
            </div>

        </template>

        <div>
            <el-table :data="tableList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all
                 class="heightStyle"  :height="tableHeight">
                <el-table-column prop="name" label="分类名称" />
                <el-table-column prop="status" label="状态">

                    <template #default="scope">
                        {{ scope.row.status == 200 ? "启用" : "禁用" }}
                    </template>
                </el-table-column>
                <el-table-column label="图片">
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
            </el-table>

        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { ref ,nextTick} from "vue";
import service from '@/utils/http.ts';



const tableList = ref([]);
const getData = () => {
    service('/topLst', {
        method: 'post',
        data: {},
    }).then((res: any) => {
        const { data } = res

        data.forEach((element: { child: any; children: any; }) => {
            if (element.child) {
                element.children = element.child
            }
        });
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
.heightStyle{
    height: calc(100% -200px);
}
</style>










 