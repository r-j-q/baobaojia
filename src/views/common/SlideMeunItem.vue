<template>
    <div>
        <!-- 如果有子集 -->
        <el-menu-item index="1-1" v-if="props.data.children">444</el-menu-item>
        <!-- 如果无子集 -->
        <el-menu-item v-else :index="data.path">{{data.name  }}</el-menu-item>

    </div>
</template>
<script setup lang="ts">
// 接收父组件传参，带默认值
const props = withDefaults(defineProps<{
    data?: any
}>(), {
    data: {}
});

</script>