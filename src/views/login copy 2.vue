<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import service from '@/utils/http.ts'
import { userGlobalUserStore } from "../store/userGlobalUserStore"
// import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import { User, Lock } from "@element-plus/icons-vue"
// import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { type FormInstance, FormRules } from "element-plus"
// import { getLoginCodeApi } from "@/api/login"
// import { type LoginRequestData } from "@/api/login/types/login"
const router = useRouter()
const loginFormRef = ref<FormInstance | null>(null);
const setGlobalStoreInfo = userGlobalUserStore()
/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
// const codeUrl = ref("")
/** 登录表单数据 */
const loginForm = reactive({
    username: "19138984495",
    password: "123456"
    // code: ""
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
    ],
    code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}
/** 登录逻辑 */
const handleLogin = () => {
    loginFormRef.value?.validate((valid: boolean) => {
        if (valid) {
            loading.value = true
            service('/login', {
                method: 'post',
                data: {
                    phone: loginForm.username,
                    pwd: loginForm.password,
                    nickname: "cc"
                },
            }).then((res: any) => {
                setGlobalStoreInfo.userInfo = res.data;
                router.push({ path: "/" })
            })

        } else {
            return false
        }
    })
}

const jumpTo = () => {
    router.push({ path: "/rigester" })
}
/** 创建验证码 */
// const createCode = () => {
  // 先清空验证码的输入
//   loginForm.code = ""
//   // 获取验证码
//   codeUrl.value = ""
//   getLoginCodeApi().then((res) => {
//     codeUrl.value = res.data
//   })
// }
/** 初始化验证码 */
// createCode()
</script>

<template>
    <div class="login-container">
        <!-- <ThemeSwitch class="theme-switch" /> -->
        <div class="login-card">
            <div class="title">
                <h3>报价系统</h3>
                <!-- <img src="@/assets/layout/logo-text-2.png" /> -->
            </div>
            <div class="content">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" @keyup.enter="handleLogin">
                    <el-form-item prop="username" label="账号">
                        <el-input v-model.trim="loginForm.username" placeholder="用户名" type="text" tabindex="1"
                            :prefix-icon="User" size="large" />
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input v-model.trim="loginForm.password" placeholder="密码" type="password" tabindex="2"
                            :prefix-icon="Lock" size="large" show-password />
                    </el-form-item>
                    <!-- <el-form-item prop="code">
                        <el-input v-model.trim="loginForm.code" placeholder="验证码" type="text" tabindex="3"
                            :prefix-icon="Key" maxlength="7" size="large">
                            <template #append>
                                <el-image :src="codeUrl" @click="createCode" draggable="false">
                                    <template #placeholder>
                                        <el-icon>
                                            <Picture />
                                        </el-icon>
                                    </template>
                                    <template #error>
                                        <el-icon>
                                            <Loading />
                                        </el-icon>
                                    </template>
                                </el-image>
                            </template>
                        </el-input>
                    </el-form-item> -->
                    <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin"> 登 录 </el-button>
                </el-form>
                <div class="register" @click="jumpTo">去注册></div>
            </div>
        </div>
    </div>
</template>

<style  scoped  lang="scss" >
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;

    .theme-switch {
        position: fixed;
        top: 5%;
        right: 5%;
        cursor: pointer;
    }

    .login-card {
        width: 480px;
        border-radius: 20px;
        box-shadow: 0 0 10px #dcdfe6;
        background-color: #fff;
        overflow: hidden;

        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;

            /* img {
        height: 100%;
      } */
        }

        .register {
            text-align: right;
            font-size: 12px;
            color: #409eff;
            margin-top: 20px;
            cursor: pointer;
        }

        .content {
            padding: 20px 50px 50px 50px;

            :deep(.el-input-group__append) {
                padding: 0;
                overflow: hidden;

                .el-image {
                    width: 100px;
                    height: 40px;
                    border-left: 0px;
                    user-select: none;
                    cursor: pointer;
                    text-align: center;
                }
            }

            .el-button {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
</style>