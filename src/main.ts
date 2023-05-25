import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import  {AppRouter} from "./router/index"
import 'element-plus/dist/index.css' 
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(pinia) 
app.use(AppRouter)
app.mount('#app') 
