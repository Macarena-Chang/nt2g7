<template>
    <header class="header-logo">
      TICKETS´S
    </header>
  
    <div class="form-container">
      <h1 class="form-title">Registro</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <input v-model="username" placeholder="Username" class="register-input" />
        <input v-model="email" type="email" placeholder="Email" class="register-input" />
        <input v-model="password" type="password" placeholder="Password" class="register-input" />
        <button type="submit" class="register-button">Registrar</button>
      </form>
      <div v-if="error" class="error-message">{{ error }}</div>
      <div class="switch-container">
        ¿Ya tienes una cuenta? <a @click="goToLogin">Inicia sesión</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/authstore';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref('');
  
  const handleRegister = async () => {
    error.value = ''; // Resetea el mensaje de error antes de intentar registrar
    try {
      await authStore.register(username.value, email.value, password.value);
      router.push('/home'); // Redirige a la página de inicio después de registrar
    } catch (e) {
      error.value = 'Hubo un error al intentar registrarse.';
    }
  };
  
  const goToLogin = () => {
    router.push('/login'); // Redirige a la página de login
  };
  </script>
  
  <style scoped>
  .header-logo {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    background-color: #ffdd00; /* Fondo amarillo */
    padding: 1rem;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: fixed; /* Fijar el logo en la parte superior */
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  
  .form-container {
    max-width: 300px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 4rem auto;
  }
  
  .form-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
  }
  
  .register-input {
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .register-button {
    padding: 0.75rem;
    border: none;
    background-color: #333;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .register-button:hover {
    background-color: #555;
  }
  
  .switch-container {
    font-size: 1rem;
    color: #333;
    margin-top: 1rem;
  }
  
  .switch-container a {
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
  }
  
  .switch-container a:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  </style>