<template>
    <el-scrollbar height="100%">
        <el-menu default-active="1" text-color="#fff" background-color="#545c64" active-text-color="red"
            :unique-opened="true" class="el-menu-vertical-demo"  >
            <SlideMeunItem v-for="item in SlideMeunItemList" :key="item.id" :menu-options="item" />
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
// const handleOpen = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }

const SlideMeunItemList = ref([
    {
        id: 1,
        path: "/home1",
        name: "name1",
        icon:"",
        chidlren: [
            {
                name: "侧边栏1",
                path: "/home1",
                id: '1-1',
                chidlren:[],
        icon:"",

            },
            {
                name: "侧边栏2",
                path: "/home1",
                id: '1-2',
        icon:"",

                chidlren:[]

            }
        ]
    },
    {
        id: 2,
        path: "/home2",
        name: "name2",
        icon:"",

        chidlren: [
            {
                name: "侧边栏2",
                path: "/home2",
        icon:"",

                id: '2-1',
                chidlren:[]
            }
        ]
    },
    {
        id: 3,
        path: "/home3",
        name: "name3",   icon:"",

        chidlren: [ ]
    }
])
</script>