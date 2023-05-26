<template>
    <el-scrollbar height="100%">
        <el-menu default-active="1" active-text-color="#fff" :unique-opened="true" class="el-menu-vertical-demo"
            @open="handleOpen" @close="handleClose">
            <SlideMeunItem v-for="item in SlideMeunItemList" :key="item.id" :data="item" />
        </el-menu>
    </el-scrollbar>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SlideMeunItem from "@/views/common/SlideMeunItem.vue"

 
// import {
//     Document,
//     Menu as IconMenu,
//     Location,
//     Setting,
// } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const SlideMeunItemList = ref([
    {
        id: 1,
        path: "/home",
        name:"name",
        chidlren:[
            {
                name:"",
                path:""
            }
        ]
    }
])
</script>