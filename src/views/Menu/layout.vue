<template>
  <div class="container">
    <div class="container-left" :style="{ backgroundColor: bgColor }">
      <div class="container-title">报价系统</div>
      <!-- <el-menu :router="true" active-text-color="#ffd04b" :background-color="bgColor" class="el-menu-vertical-demo" default-active="1"
        text-color="#fff" :collapse="leftMenuOpen" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>设备管理</span>
          </template>
          <el-menu-item index="layout/role" >分类列表</el-menu-item>
          <el-menu-item index="1-2">分类列表</el-menu-item>
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
      </el-menu> -->

      <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="leftMenuOpen" :background-color='bgColor'
        text-color="#bfcbd9" active-text-color="#409eff" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-sub-menu v-if="subItem.subs" :index="subItem.index" :key="subItem.index" v-permiss="item.permiss">
                  <template #title>{{ subItem.title }}</template>
                  <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                    {{ threeItem.title }}
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="subItem.index" v-permiss="item.permiss">
                  {{ subItem.title }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <div class="container-right">
      <div class="container-top" :style="{ backgroundColor: bgColor }">
        <div class="icon-style" >
          <el-icon size="20"  @click="handleAnimation">
            <Fold v-if="!leftMenuOpen" />
            <Expand v-if="leftMenuOpen" />
          </el-icon>
          <!--面包屑 https://blog.csdn.net/m0_47195133/article/details/125251104  -->
          <!-- <el-breadcrumb separator="/" style="color: #fff;">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> 
          </el-breadcrumb> -->
        </div>
        <div class="container-top-center">
          <vHeader/>
          <!-- <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" :background-color="bgColor"
            text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">首页 </el-menu-item>
            <el-sub-menu index="2">
              <template #title>切换皮肤</template>
              <el-menu-item index="2-4-1" @click="handlebgColor('#545c64')">灰色主题</el-menu-item>
              <el-menu-item index="2-4-2" @click="handlebgColor('black')">黑色主题</el-menu-item>
              <el-menu-item index="2-4-3" @click="handlebgColor('blue')">蓝色主题</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>管理员</template>
              <el-menu-item index="3-4-1">个人中心</el-menu-item>
              <el-menu-item index="3-4-2">修改密码</el-menu-item>
              <el-menu-item index="3-4-3" @click="exit">退出系统</el-menu-item>
            </el-sub-menu>
          </el-menu> -->
        </div>
      </div>
      <div class="container-bottom">
        <router-view></router-view>
        <!-- <Upload/> -->

      </div>
    </div>

  </div>
</template>
  
<script lang="ts" setup>

import { ref, computed } from 'vue'
import { useRoute } from "vue-router"
import { useThemeStore } from "@/store/useThemeStore"
// import { useSidebarStore } from '@/store/sidebar';
import vHeader from '@/components/header.vue';
// import Upload from "../../components/Upload.vue"
let route = useRoute();
// let $route = useRouter();
 
// let activeIndex1 = ref('1');
let leftMenuOpen = ref(false);
// 设置全局背景颜色
const { bgColor } = useThemeStore();
// const handlebgColor = (v: string) => {
//   changColor(v)
// }
const onRoutes = computed(() => {

  return route.path;
});
const handleAnimation = () => {
  leftMenuOpen.value = !leftMenuOpen.value;
}
const items = [
  {
      icon: 'Odometer',
      index: '/dashboard',
      title: '系统首页',
      permiss: '1',
  },
  {
    icon: 'Calendar',
    index: '1',
    title: '分类管理',
    permiss: '1',
    subs: [
    {
        index: '/importOneList',
        title: '分类列表',
        permiss: '2',
      },
      {
        index: '/import',
        title: '一级分类列表',
        permiss: '2',
      },
      // {
      //   index: '/importList',
      //   title: '列表管理',
      //   permiss: '3',
      // },
    ],
  },
  {
    icon: 'Calendar',
    index: '2',
    title: '报价管理',
    permiss: '3',
    subs: [
    {
        index: '/siteInformation',
        title: '场地信息',
        permiss: '4',
      },
      {
        index: '/quotation',
        title: '编辑报价',
        permiss: '5',
      },
      {
        index: '/importList2',
        title: '报价详情',
        permiss: '6',
      },
    ],
  },
  // {
  //     icon: 'DocumentCopy',
  //     index: '/tabs',
  //     title: 'tab选项卡',
  //     permiss: '3',
  // },
  // {
  //     icon: 'Edit',
  //     index: '3',
  //     title: '表单相关',
  //     permiss: '4',
  //     subs: [
  //         {
  //             index: '/form',
  //             title: '基本表单',
  //             permiss: '5',
  //         },
  //         {
  //             index: '/upload',
  //             title: '文件上传',
  //             permiss: '6',
  //         },
  //         {
  //             index: '4',
  //             title: '三级菜单',
  //             permiss: '7',
  //             subs: [
  //                 {
  //                     index: '/editor',
  //                     title: '富文本编辑器',
  //                     permiss: '8',
  //                 },
  //                 {
  //                     index: '/markdown',
  //                     title: 'markdown编辑器',
  //                     permiss: '9',
  //                 },
  //             ],
  //         },
  //     ],
  // },
  // {
  //     icon: 'Setting',
  //     index: '/icon',
  //     title: '自定义图标',
  //     permiss: '10',
  // },
  // {
  //     icon: 'PieChart',
  //     index: '/charts',
  //     title: 'schart图表',
  //     permiss: '11',
  // },
  // {
  //     icon: 'Warning',
  //     index: '/permission',
  //     title: '权限管理',
  //     permiss: '13',
  // },
  // {
  //     icon: 'CoffeeCup',
  //     index: '/donate',
  //     title: '支持作者',
  //     permiss: '14',
  // },
];
// const sidebar = useSidebarStore();
// import {
//   Location,
//   Setting,
//   Fold,
//   Expand
// } from '@element-plus/icons-vue'
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }

// 退出登录，清出缓存
// const exit = () => {
//   localStorage.clear();
//   $route.push("/login")
// }


 
</script>
  
<style scoped lang="scss">
.container {
  width: 100vw;
  display: flex;

  .container-left {
    // background-color: rgb(84, 92, 100);
    height: 100vh;

    .container-title {
      text-align: center;
      color: #fff;
      font-weight: bold;
      padding: 20px 0;
      font-size: 16px;
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
      // background-color: #545c64;
      align-items: center;
      justify-content: space-between;

      .container-top-center {
        width: 390px;
      }

      .icon-style {
        color: #fff;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }

    .container-bottom {
      flex: 1;
      background-color: #fff;
      margin: 10px;
      // border: 1px solid #f5f5f5;
      border-radius: 5px;
    }
  }
}

.el-menu {
  border-right: none
}

.el-menu--horizontal {
  border-bottom: none;
}
</style>
  