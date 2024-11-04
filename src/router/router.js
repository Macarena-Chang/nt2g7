import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authstore';
import HomeView from '../views/HomeView.vue';
import EventsView from '../views/EventsView.vue';
import EventDetailView from '../views/EventDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
      meta: { requiresAuth: true }
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
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizedView.vue')
    },
    {
      path: '/events/:id',
      name: 'eventDetail',
      component: EventDetailView,
      meta: { requiresAuth: true }
    }
  ]
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.currentUser) {
    next('/login');
  } else if (to.meta.adminOnly && authStore.currentUser?.role !== 'admin') {
    next('/unauthorized');
  } else {
    next();
  }
});

export default router;
