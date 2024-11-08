<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'; // Asegúrate de importar onMounted
import { useAuthStore } from './stores/authstore'; // Asegúrate de que la ruta sea correcta
import Header from './components/Header.vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeAuth(); // Llama a initializeAuth al montar el componente
});
</script>

<style scoped>
main {
  padding-top: 4rem; /* Espacio para el encabezado fijo */
  padding: 2rem; /* Espaciado interno para el contenido principal */
  max-width: 1200px; /* Ancho máximo para el contenido */
  margin: 0 auto; /* Centra el contenido principal */
}
</style>
