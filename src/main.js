import 'bootstrap/dist/css/bootstrap.min.css'

import axios from "axios"
import VueCookies from 'vue-cookies'

import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

app.use(VueCookies)
app.config.globalProperties.$axios = axios

app.mount('#app')