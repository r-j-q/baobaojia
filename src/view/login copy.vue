<template>
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
        <el-form-item prop="phone" label="用户名"  :rules="[
                {
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur',
                }
            ]">
            <el-input v-model="dynamicValidateForm.phone"  />
        </el-form-item>
        <el-form-item label="密码" prop="pwd" :rules="{
                required: true,
                message: '请输入密码',
                trigger: 'blur',
            }">
            <el-input v-model="dynamicValidateForm.pwd" />

        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
            <el-button @click="resetForm(formRef)">注册</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
    phone: string
    pwd: string
}>({
    phone: '',
    pwd: '',
})





const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
  