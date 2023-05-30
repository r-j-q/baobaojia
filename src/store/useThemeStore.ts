
import { computed, ref } from 'vue';
// import { useUser } from "./userGlobalStore"
import { defineStore } from 'pinia';
export const useThemeStore = defineStore('theme', () => {

    const themeColor = ref([
        {
            bgColor: "#545c64",
            name: "",
        },
        {
            bgColor: "#409eff",
            name: "",
        }
    ])
    // let theme =localStorage.getItem('theme');
    // console.log("bgColors", JSON.parse(theme).bgColor)
    const bgColorq = ref( themeColor.value[0].bgColor)
    const bgColor = computed(() => {
        return bgColorq;
    })

    const changColor = (v: any) => {
        bgColorq.value = v;
    }

    return { themeColor, bgColor, changColor }
}, { persist: true })
