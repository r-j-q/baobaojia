import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  {AppRouter} from "./router/index"
import 'element-plus/dist/index.css' 
import { createPinia } from 'pinia'
import ElementPlus from "element-plus"
import locale from 'element-plus/es/locale/lang/zh-cn'
 
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
// import { usePermissStore } from './store/permiss';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 自定义权限指令
// const permiss = usePermissStore();
// app.directive('permiss', {
//     mounted(el, binding) {
//         if (!permiss.key.includes(String(binding.value))) {
//             el['hidden'] = true;
//         }
//     },
// });
// 配置分页因为改为中文
app.use(ElementPlus, {locale})
app.use(pinia) 
app.use(AppRouter)
app.mount('#app') 
