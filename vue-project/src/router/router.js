import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authstore';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' // Redirige a la vista de login al acceder a la raíz
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Marca la vista de Home como protegida
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
});

// Guarda de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.currentUser) {
    next('/login'); // Redirige a login si el usuario no está autenticado
  } else if (to.meta.adminOnly && !authStore.currentUser?.role) {
    next('/unauthorized'); // Redirige a unauthorized si el usuario no es admin
  } else {
    next(); // Permite el acceso si no hay restricciones
  }
});

export default router;
