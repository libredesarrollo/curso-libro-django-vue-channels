import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(VueCookies)

app.mount('#app')