<template>
    <!-- 如果有子集 -->
<div> 
    <el-sub-menu :index="props.data.path" v-if="hasChildren">
        <template #title>{{ props.data.name }}{{ hasChildren }}</template>
        <SlideMeunItem v-for="item in props.data.chidlren" :key="item.id" :data="item" />

    </el-sub-menu>
    <!-- 如果无子集 -->
    <!-- <el-sub-menu v-else :index="props.data.path">{{props.data.name }}{{ hasChildren }}</el-sub-menu> -->
</div>
</template>
<script setup lang="ts">
import SlideMeunItem from "@/views/common/SlideMeunItem.vue"

import { computed } from "vue"
const props = withDefaults(defineProps<{
    data?: any
}>(), {
    data: {}
});

const hasChildren = computed(() => {
    return Array.isArray(props.data.chidlren) && props.data.chidlren.length > 0;
})
console.log('===子组件数据=====>', hasChildren);

</script>