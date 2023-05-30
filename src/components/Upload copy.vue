<template>
   <el-form-item
   label="运行效果："
   :rules="[
     {
       required: true,
       message: '请上传运行效果',
       trigger: 'blur',
     },
    ]"
>
  <el-upload
     :file-list="fileList"
     list-type="picture-card"
     :auto-upload="false"
     :on-change="handleChange"
     :on-remove="handleRemove"
  >
   <el-icon><Plus /></el-icon>
  </el-upload>
</el-form-item>
</template>

<script setup lang="ts">
import { userGlobalUserStore } from "@/store/userGlobalUserStore"

import {ref} from "vue"; 
import { type UploadProps, type UploadUserFile} from "element-plus";
 
const fileList = ref<UploadUserFile[]>([]);  
const fileData = ref();
const fileImg = ref();
 
//通过接口获取到数据，完成回显
const { result: algData, onResult: onGetMarketData } = useQuery(
  queryGetAlgConfigMarket,
  {
    command: query.id,
  },
  {
    fetchPolicy: "no-cache",
  }
);
 
onGetMarketData((res) => {
  const marketData = res.data.GetAlgConfigMarket;
  //fileList格式必须要按照name,url的形式（可以参考element ui中文件格式），这里通过接口数据完成图片回显
  fileList.value = marketData.extraData.previewImg.map((i) => {
    return {
      name: +new Date(),   //如果没有name,可以自己随便定义
      url: i,
    };
  });
});
 
//运行效果上传
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw!);
  //图片格式为blob,所以我这里使用blobToBase64()将图片转化为base64
  blobToBase64(uploadFile.raw!).then((res) => {
    // 转化后的base64图片地址
    form.extraData.previewImg.push(res);
    fileData.value = fileList.value.map((item) => {
      return item.url;
    });
    fileImg.value = form.extraData.previewImg.concat(fileData.value);
  });
};
 
//图片删除
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  //执行该方法时自动移除el-upload上显示的图片，所以方法体内只需要移除已上传的图片即可
  const index = fileImg.value.findIndex((item) => (item = file.url));
  fileImg.value.splice(index, 1); //移除已上传的图片
};
 
//表单提交
const onSave = async (formEl: FormInstance | undefined) => {
  //在表单提交时，先判断是否上传新的图片
  if (!fileImg.value) {
    fileImg.value = fileList.value.map((item) => {
      return item.url;
    });
  }
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      isSending.value = true;
      saveAlgConfig({
        command: {
          extraData: {
            previewImg: fileImg.value,
          },
        },
      });
    } else {
      console.log("error submit!", fields);
    }
  });
} 
const headers =ref({"token":  userGlobalUserStore().userInfo.token})

 
</script>

<style scoped>
.content-title {
    font-weight: 400;
    /* line-height: 50px; */
    /* margin: 10px 0; */
    font-size: 22px;
    color: #1f2f3d;
}
.upload-demo {
    width: 200px;
    height: 200px;
}
</style>
