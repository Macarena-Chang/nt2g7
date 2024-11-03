<template>
    <div class="unauthorized-container">
      <h1>Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <router-link to="/login">Ir a Login</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UnauthorizedView'
  };
  </script>
  
  <style scoped>
  .unauthorized-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }
  </style>
  