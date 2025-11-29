import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Music from '@/views/Music.vue'
import Shop from '@/views/Shop.vue'
import Contact from '@/views/Contact.vue'
import Admin from '@/views/Admin.vue'
import AdminLogin from '@/components/admin/login.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/music', component: Music },
    { path: '/shop', component: Shop },
    { path: '/contact', component: Contact },
    { path: '/admin', component: Admin, meta: { requiresAuth: true } },
    { path: '/admin/login', component: AdminLogin }
  ]
})

// Navigation Guard für Admin Routes
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Prüfe ob Route Authentifizierung benötigt
  if (to.meta.requiresAuth) {
    // Stelle sicher, dass Auth Status geprüft wird
    await authStore.checkAuth()

    if (!authStore.user) {
      // Redirect zu Login wenn nicht eingeloggt
      next('/admin/login')
    } else {
      // Erlaube Zugriff wenn eingeloggt
      next()
    }
  } else {
    // Normale Route - erlauben
    next()
  }
})

export default router