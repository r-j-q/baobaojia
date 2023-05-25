// 数据持久化
import { ref } from 'vue';
import { useUser } from "./userGlobalStore"
import { defineStore } from 'pinia';
export const useGlobalStore = defineStore('global', () => {
    const count = ref(0);
    const user = ref({
        user: useUser(),

    })
    return { count, user }
}, { persist: true })
