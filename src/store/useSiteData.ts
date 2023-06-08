
import { ref } from 'vue';
import { defineStore } from 'pinia';
// import { ElMessage } from 'element-plus'

export const useSiteData = defineStore('siteData', () => {

    const dataList = ref<any>([]);
    const getListSiteData = ref<any>([]);
    const setSiteData = (va:any,v: any) => {
        getListSiteData.value = va;
        dataList.value = v;
      }
    //  初始化数据，让选中的缓存，刷新页面的时候缓存依旧存在
      const getSiteData = (v: any) => {
        getListSiteData.value = v;
      }
    return { dataList, setSiteData,getListSiteData,getSiteData }
}, { persist: true })
