

<template>
    <div>
        <el-table :data="tableList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all  height="700px">
            <el-table-column prop="name" label="分类名称" />
            <el-table-column prop="status" label="状态" />
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
</template>
<script lang="ts" setup>
import { ref } from "vue";
import service from '@/utils/http.ts';
 


const tableList = ref([]); 
const getData = () => {
    service('/lst', {
        method: 'post',
        data: {},
    }).then((res: any) => {
       const {data} = res

       data.forEach((element: { child: any; children: any; }) => {
        if(element.child){
            element.children=element.child
        }
       });
        tableList.value = res.data;
        console.log("==res===>", tableList.value)
    })
}
getData()
 
</script>
  










 