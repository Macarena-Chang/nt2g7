<template>
  <header class="header-logo">
    <router-link to="/" class="logo-title">TICKET´S</router-link>
    <div class="button-container">
      <button v-if="isAuthenticated" @click="handleLogout" class="logout-button">Logout</button>
      <button @click="goToCart()" id="cart-button">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  </header>
</template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/authstore'; // Asegúrate de que la ruta sea correcta
  import { useRouter } from 'vue-router';
  import '@fortawesome/fontawesome-free/css/all.css';
  import '@fortawesome/fontawesome-free/js/all.js';


  const authStore = useAuthStore();
  const router = useRouter();
  
  // Computed para obtener el estado de autenticación
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  
  const handleLogout = () => {
    authStore.logout(); // Llama a la acción de logout
    router.push('/login'); // Redirige a la página de login
  };

  const goToCart = () =>{
    router.push('/cart')
  }

  
  </script>
  
  <style scoped>
  .header-logo {
  display: flex; /* Usa flexbox para la alineación */
  justify-content: space-between; /* Espacio entre el logo y los botones */
  align-items: center; /* Alinea verticalmente los elementos */
  font-size: 2rem; /* Tamaño de fuente */
  font-weight: bold; /* Texto en negrita */
  color: #333; /* Color del texto */
  background-color: #ffdd00; /* Fondo amarillo */
  padding: 1rem; /* Espaciado interno */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
  position: fixed; /* Fija el encabezado en la parte superior */
  top: 0; /* Posición superior */
  left: 0; /* Alinear a la izquierda */
  right: 0; /* Alinear a la derecha */
  z-index: 10; /* Encima de otros elementos */
}

.logo-title {
  margin: 0; /* Elimina márgenes para centrar correctamente */
  color: #dc3545; /* Color del texto */
}

/* Contenedor para los botones */
.button-container {
  display: flex; /* Flexbox para alinear botones horizontalmente */
  gap: 10px; /* Espaciado entre los botones */
  align-items: center; /* Alinea los botones verticalmente */
}

.logout-button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #dc3545; /* Color rojo */
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.logout-button:hover {
  background-color: #c82333; /* Color rojo más oscuro para hover */
}

#cart-button {
  background: none;
  border: none;
  cursor: pointer;
  height: 60px; /* Tamaño del botón */
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#cart-button i {
  font-size: 40px; /* Tamaño normal del ícono */
}

#cart-button:hover i {
  font-size: 45px; /* Tamaño del ícono al hacer hover */
}
  </style>
  