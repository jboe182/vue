import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Music from '@/views/Music.vue'
import Shop from '@/views/Shop.vue'
import Contact from '@/views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/music', component: Music },
    { path: '/shop', component: Shop },
    { path: '/contact', component: Contact }
  ]
})

export default router
