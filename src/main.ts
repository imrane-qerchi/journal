import './assets/style.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Home from './pages/Home.vue'
import Journal from './pages/Journal.vue'
import AddTasnim from './pages/AddTasnim.vue'
import AddImrane from './pages/AddImrane.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/journal', component: Journal },
  { path: '/add-tasnim', component: AddTasnim },
  { path: '/add-imrane', component: AddImrane },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
