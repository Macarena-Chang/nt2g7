import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authstore'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.currentUser) {
    next('/login')
  } else if (to.meta.adminOnly && !authStore.currentUser?.role) {
    next('/unauthorized')
  } else {
    next()
  }
})

export default router
