import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import Commentaire from '@/views/Commentaire.vue'
import Guide from '@/views/Guide.vue'


// Middleware pour protéger les routes
const requireAuth = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!token) {
    // Pas connecté → retour login
    return next('/login')
  }

  // Si le mot de passe doit être changé et qu'on n'est pas déjà sur la page
  if (user && user.mustChangePassword && to.path !== '/change-password') {
    return next('/change-password')
  }

  next()
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
   { path: '/change-password', component: ChangePassword, beforeEnter: requireAuth },
  { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
  { path: '/commentaire', component: Commentaire, beforeEnter: requireAuth },
  { path: '/guide', component: Guide }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
