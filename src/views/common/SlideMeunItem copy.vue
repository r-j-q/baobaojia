<template>
    <!-- 如果有子集 -->
 
    <el-sub-menu :index="props.data.path" v-if="hasChildrenValue">

        <template #title>
            <el-icon><location /></el-icon>
            <span>{{ props.data.name }} </span>
          </template> 
 
        <SlideMeunItem   v-for="item in props.data.chidlren" :key="item.id" :data="item" />
       
 
    </el-sub-menu>
    <!-- 如果无子集 -->
    <el-sub-menu  v-else  :index="props.data.path">{{hasChildrenValue}}{{props.data.name }} </el-sub-menu>
 
</template>
<script setup lang="ts">
// import SlideMeunItem from "@/views/common/SlideMeunItem.vue"

import {ref, computed } from "vue"
const props = withDefaults(defineProps<{
    data?: any
}>(), {
    data: {}
});
let hasChildrenValue =ref(false)
const hasChildren = computed(() => {
    return Array.isArray(props.data.chidlren) && props.data.chidlren.length > 0;
})
hasChildrenValue.value=hasChildren.value
console.log('===子组件数据=====>', hasChildren.value);

</script>