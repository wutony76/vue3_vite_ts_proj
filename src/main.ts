import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import './style.css'
import $ from 'jquery'
import ready from '@/logic/base/Launch'

console.log('__PROCESS-MAIN.js-start')
window.$ = $
window.jQuery = $

const app = createApp(App)
app.use(createPinia())
app.use(router)
ready().then(() => {
  console.log('__PROCESS-READY-true')
  app.mount('#app')
})
