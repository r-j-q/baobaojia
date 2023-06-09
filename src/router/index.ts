import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/views/Home.vue"; 
import Rigester from "@/views/rigester.vue";
import { userGlobalUserStore } from "@/store/userGlobalUserStore"

export const AppRouter = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    meta: {
                        title: '系统首页',
                        permiss: '1',
                    },
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue'),
                },
                {
                    path: '/importOneList',
                    name: 'importOneList',
                    meta: {
                        title: '新增分类',
                        permiss: '1',
                    },
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/importOneList.vue'),
                },
                 
                {
                    path: '/import',
                    name: 'import',
                    meta: {
                        title: '一级分类列表',
                        permiss: '2',
                    },
                    component: () => import(/* webpackChunkName: "import" */ '@/views/import.vue'),
                },
                {
                    path: '/importList',
                    name: 'importList',
                    meta: {
                        title: '导入Excel',
                        permiss: '2',
                    },
                    component: () => import(/* webpackChunkName: "import" */ '@/views/importList.vue'),
                },
                {
                    path: '/importList2',
                    name: 'importList2',
                    meta: {
                        title: '导入Excel',
                        permiss: '2',
                    },
                    component: () => import(/* webpackChunkName: "import" */ '@/views/importList2.vue'),
                },
                {
                    path: '/quotation',
                    name: 'quotation',
                    meta: {
                        title: '报价设置',
                        permiss: '2',
                    },
                    component: () => import(/* webpackChunkName: "import" */ '@/views/quotation.vue'),
                },{
                    path: '/siteInformation',
                    name: 'siteInformation',
                    meta: {
                        title: '场地信息',
                        permiss: '2',
                    },
                    component: () => import(/* webpackChunkName: "import" */ '@/views/siteInformation.vue'),
                },

                 
                 
            ]
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '登录',
            },
            component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue'),
        },
        {
            path: '/403',
            name: '403',
            meta: {
                title: '没有权限',
            },
            component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
        },
        {
            path: "/rigester",
            name: "rigester",
            component: Rigester
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
