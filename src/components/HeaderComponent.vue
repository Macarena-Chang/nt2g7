<template>
    <header class="header-logo">
      <span class="logo-title">TU-EVENTO</span>
      <button v-if="isAuthenticated" @click="handleLogout" class="logout-button">Logout</button>
      
      <button @click="goToCart()" id="cart-button"><i class="fa-solid fa-cart-shopping"></i></button>
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
    display: flex; /* Usa flexbox para alinear el contenido */
    justify-content: space-between; /* Espacio entre el título y el botón */
    align-items: center; /* Alinea los elementos verticalmente */
    font-size: 2rem; /* Tamaño de fuente */
    font-weight: bold; /* Texto en negrita */
    color: #333; /* Color del texto */
    background-color: #ffdd00; /* Fondo amarillo */
    padding: 1rem; /* Espaciado interno */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
    position: fixed; /* Fijar el logo en la parte superior */
    top: 0; /* Posicionarlo en la parte superior */
    left: 0; /* Alinear a la izquierda */
    right: 0; /* Alinear a la derecha */
    z-index: 10; /* Asegura que esté por encima de otros elementos */
  }
  
  .logo-title {
    margin: 0; /* Elimina márgenes para centrar correctamente */
  }
  
  /* Estilos del botón de logout */
  .logout-button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #dc3545; /* Color rojo */
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  
  #cart-button {
  background: none;
  border: none;
  cursor: pointer;
  height: 60px;  /* Aumentado para permitir el agrandamiento del ícono */
  width: 60px;   /* Aumentado para permitir el agrandamiento del ícono */
  display: flex;
  justify-content: center;
  align-items: center;
}

#cart-button i {
  font-size: 35px !important;  /* Tamaño del ícono normal */
  background-color: red;
}

#cart-button:hover i {
  font-size: 45px !important;  /* Tamaño del ícono al hacer hover */
}
  .logout-button:hover {
    background-color: #c82333; /* Color rojo más oscuro para el hover */
  }
  </style>
  