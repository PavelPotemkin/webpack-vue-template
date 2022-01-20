import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { store } from '@/vue/store'
import axios from "@/plugins/axios";

const app = createApp(App)

app.config.globalProperties.$http = axios

app.use(store).use(router).mount('#app')
