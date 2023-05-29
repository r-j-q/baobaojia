<template>
  <div class="container">
    <div class="container-left">
      <div class="container-title">XXXX</div>
      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1"
        text-color="#fff" :collapse="leftMenuOpen" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>设备管理</span>
          </template>
          <el-menu-item index="1-1">设备分类</el-menu-item>
          <el-menu-item index="1-2">账户管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>账户管理1</span>
          </template>
          <el-menu-item index="1-1">角色管理1</el-menu-item>
          <el-menu-item index="1-2">账户管理2</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="container-right">
      <div class="container-top">
        <div class="icon-style" @click="handleAnimation">
          <el-icon size="20">
            <Fold v-if="!leftMenuOpen"/> 
            <Expand v-if="leftMenuOpen"/> 
           </el-icon>
        </div>
        <div class="container-top-center">
          <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">首页 </el-menu-item>
            <el-sub-menu index="2">
              <template #title>切换皮肤</template>
              <el-menu-item index="2-4-1">颜色主题</el-menu-item>
              <el-menu-item index="2-4-2">绿色主题</el-menu-item>
              <el-menu-item index="2-4-3">蓝色主题</el-menu-item>
              <el-menu-item index="2-4-4">黑色主题</el-menu-item>
              <el-menu-item index="2-4-5">灰色主题</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>管理员</template>
              <el-menu-item index="3-4-1">个人中心</el-menu-item>
              <el-menu-item index="3-4-2">修改密码</el-menu-item>
              <el-menu-item index="3-4-3">退出系统</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
      <div class="container-bottom">底部</div>
    </div>

  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

let activeIndex1 = ref('1');
let leftMenuOpen = ref(false);


import {
  Location,
  Setting,
  Fold,
  Expand
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleAnimation = () => {
  leftMenuOpen.value = !leftMenuOpen.value; 
}
</script>
  
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;

  .container-left {
    background-color: rgb(84, 92, 100);

    .container-title {
      text-align: center;
      color: #fff;
      font-weight: bold;
      padding: 20px 0;
      font-size: 18px;
    }
  }

  .container-right {
    flex: 1;
    // background-color: aquamarine;
    display: flex;
    flex-direction: column;

    .container-top {
      height: 60px;
      display: flex;
      // flex-direction: row-reverse;
      background-color: rgb(84, 92, 100);
      align-items: center;
      justify-content: space-between;

      .container-top-center {
        width: 390px;
      }

      .icon-style {
        color: #fff;
        cursor: pointer;
      }
    }

    .container-bottom {
      flex: 1;
      background-color: #fff;
    }
  }
}

.el-menu {
  border-right: none
}

.el-menu--horizontal {
  border-bottom: none;
}</style>
  