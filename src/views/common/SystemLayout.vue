<template>
    <div class="system">
        <!-- 左侧菜单 -->
        <section class="system-meun">
           <SlideMeun></SlideMeun>
        </section>
        <!-- 右侧菜单 -->
        <div class="system-container">
            <el-scrollbar height="100%">
                <slot></slot>
            </el-scrollbar>
        </div>
    </div>
</template>
<script setup lang="ts">
import SlideMeun from "@/views/common/SlideMeun.vue"



</script>
<style scoped>
.system{
    display: flex;
}
.system-meun {
    width: 200px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
    height: 100vh;
    background: #545c64;
    border: 1px solid #545c64;
    /* transition: width .6s; */
}
 
</style>