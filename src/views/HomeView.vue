<script setup>
import { useAuthStore } from '@/stores/authstore';
import { useRouter } from 'vue-router';
import TheWelcome from '../components/TheWelcome.vue';

const authStore = useAuthStore();
const router = useRouter();

// Función para manejar el cierre de sesión
const handleLogout = () => {
  authStore.logout(); // Llama a la acción de logout
  router.push('/login'); // Redirige a la página de login
};
</script>


<template>
  <main>
    <TheWelcome />
    <div class="user-info">
      <h2>Bienvenido, {{ authStore.currentUser?.username }}!</h2>
    </div>
    <button @click="handleLogout" class="logout-button">Logout</button>
  </main>
</template>

<style scoped>
main {
  position: relative; /* Para permitir posicionamiento absoluto de elementos hijos */
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.logout-button {
  position: absolute; /* Para posicionar el botón en la esquina superior derecha */
  top: 20px; /* Distancia del top */
  right: 20px; /* Distancia de la derecha */
  padding: 10px 20px;
  background-color: #ff5555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #ff3333;
}
</style>