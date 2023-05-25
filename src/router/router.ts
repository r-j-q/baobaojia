import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes } from "@/router/route"
import { beforeEach, afterEach } from "@/router/guards"
export const AppRouter = createRouter({
   history: createWebHistory(),
   routes: AppRoutes,
})



 
AppRouter.beforeEach(await beforeEach);
AppRouter.afterEach(afterEach);


