 
import { ref } from 'vue';
// import { useUser } from "./userGlobalStore"
import { defineStore } from 'pinia';
export const useThemeStore = defineStore('theme', () => {
   
    const themeColor = ref([
        {
            bgColor:  "#545c64",
            name:"",
        },
        {
            bgColor:  "#409eff",
            name:"",
        }
    ])
    const bgColor =ref(themeColor.value[0].bgColor)
    return {   themeColor ,bgColor}
}, { persist: true })
