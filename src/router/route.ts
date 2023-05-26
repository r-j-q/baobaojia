

import { markRaw } from 'vue'
export const AppRoutes = markRaw([
   {
      path: "/login",
      name: "login",
      component: () => import('@/views/login.vue')
   },
   {
      path: "/rigester",
      name: "rigester",
      component: () => import('@/views/rigester.vue')
   },

   {
      path: "/",
      name: "home",
      component: () => import('@/views/home.vue')
   }
])