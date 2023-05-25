import { createRouter, createWebHashHistory } from 'vue-router'
import {AppRoutertes} from "@/router/route"

export const AppRouter = createRouter({
   history: createWebHashHistory(),
   routes: AppRoutertes,
})
// AppRouter.beforeEach()


 