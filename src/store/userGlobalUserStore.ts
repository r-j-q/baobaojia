// 数据持久化
import { ref } from 'vue';
import { defineStore } from 'pinia';
export const userGlobalUserStore = defineStore('global-user', (userInfos)  => {
  const userInfo = ref({
    userInfos 
  })
  return { userInfo }

}, { persist: true })
