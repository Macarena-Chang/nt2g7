<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <div v-if="currentUser">
        Logged in as: {{ currentUser.username }}
        Role is: {{ currentUser.role ? 'Admin' : 'User' }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/authstore';
import { computed, ref } from 'vue';
  const authStore = useAuthStore()
  const username = ref('')
  const password = ref('')
  const currentUser = computed(() => authStore.currentUser)
  
  const handleLogin = async () => {
    const user = await authStore.login(username.value, password.value)
    if (user) {
      console.log('Login successful:', user)
    }
  }
  </script>
  