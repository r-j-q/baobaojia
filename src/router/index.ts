import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Login from "@/views/login.vue";
import Rigester from "@/views/rigester.vue";
import { userGlobalUserStore } from "@/store/userGlobalUserStore"

export const AppRouter = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/rigester",
            name: "rigester",
            component: Rigester
        },

        {
            path: "/",
            name: "home",
            component: Home
        }
    ],
})
AppRouter.beforeEach((to, from, next: any) => {


    if (to.path !== "/login") {
        // 这里相当于我不是去登录，我想访问:比如说个人中心，我的文章等需要权限才能查看的数据
        if (userGlobalUserStore().userInfo.token) {
            // 这里相当于你要去个人中心，而且我检查通过，那么，放行，return
            next();
            return;
        } else {
            //这里相当于我不是去登录页面，而且我啥权限也没有，那么肯定不让你去呀。直接滚回登录页
            next('/login');
            return;
        }
    } else {
        // 这你相当于你要去登录，那么正常去登录页就行
        next();
        return;
    }
})
