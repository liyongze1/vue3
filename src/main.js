import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Breadcrumb from "@/components/Breadcrumb.vue"
import "@/assets/css/rest.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from "@/api/index.js"
import ElementPlus from 'element-plus';
import locale from "element-plus/lib/locale/lang/zh-cn";
import store from "@/pinia/index"
import piniaPluginPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia'
//注册全局组件

const pinia = createPinia()
//持久化
pinia.use(piniaPluginPersist)
//挂载全局方法1
const app=createApp(App)
// app.config.globalProperties.$api=api
//挂载全局方法2
app.provide("$api",api)
app.provide("$store",store)
app.use(pinia);
app.use(router)
app.mount('#app')
//全局组件
app.component("Breadcrumb",Breadcrumb)
//按需修改中文
app.use(ElementPlus, {locale});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
