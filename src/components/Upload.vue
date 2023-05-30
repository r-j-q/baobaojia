<template>
    <div class="container">
        <!-- <div class="content-title">支持拖拽</div>
        <div class="plugins-tips">
            Element Plus自带上传组件。 访问地址：
            <a href="https://element-plus.org/zh-CN/component/upload.html" target="_blank">Element Plus Upload</a>
        </div> -->
        <el-upload
            class="upload-demo"
            drag
            action="http://mw.shningmi.com/upload"
            multiple
            list-type="picture-card"
            :file-list="fileList"
            :on-change="handle"
            :headers="headers"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        <!--  :data="importData" -->
            <!-- <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将文件拖或
                <em>点击上传</em>
            </div> -->
        </el-upload>
<!-- 
        <div class="content-title">支持裁剪</div>
        <div class="plugins-tips">
            vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。 访问地址：
            <a href="https://github.com/Agontuk/vue-cropperjs" target="_blank">vue-cropperjs</a>。 示例请查看
            <router-link to="/user">个人中心</router-link>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { userGlobalUserStore } from "@/store/userGlobalUserStore"
import { Plus } from '@element-plus/icons-vue'
import {ref} from "vue"; 
 const fileList =ref([{
    name:  new Date(),   //如果没有name,可以自己随便定义
      url:  "http://mw.shningmi.com/storage/topic/20230530/127d059d7a75a565388e3d8f669d807a.png",

 }])
// const { proxy } : any = getCurrentInstance();
const handle =   (rawFile: any) => { 

    let proxy =  JSON.parse(JSON.stringify(rawFile));
    console.log("rawFile=====>",  proxy.response?.data.url);
}; 
const headers =ref({"token":  userGlobalUserStore().userInfo.token})

 
</script>

<style scoped> 
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload { 
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden; 
}

 
/deep/.el-upload.is-drag,/deep/ .el-upload-dragger {
    display: inherit;
    background-color:#fafafa!important;
    
}
/deep/ .el-upload-dragger { 
    border: none;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* width: 178px;
  height: 178px; */
  /* text-align: center; */
}
</style>
