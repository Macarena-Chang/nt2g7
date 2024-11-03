<template>
  <!-- Encabezado con logo "TU-EVENTO" -->
  <header class="header-logo">
    TU-EVENTO
  </header>

  <div class="form-switch-container">
    <div class="form-container">
      <h1 class="form-title">Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="username" placeholder="Username" class="login-input" />
        <input v-model="password" type="password" placeholder="Password" class="login-input" />
        <button type="submit" class="login-button">Login</button>
      </form>
      <div v-if="error" class="error-message">{{ error }}</div>
      <!-- Mostrar si el usuario está autenticado -->
      <div v-if="isAuthenticated" class="user-info">
        Logged in as: {{ currentUser.username }}<br />
        Role is: {{ currentUser.role ? 'Admin' : 'User' }}
        <button @click="handleLogout" class="logout-button">Logout</button>
      </div>
    </div>
    <div class="switch-container">
      ¿No tenés cuenta? <a @click="cambiarForm">Registrate</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authstore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

// Computed para obtener el estado de autenticación y el usuario actual
const currentUser = computed(() => authStore.currentUser);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleLogin = async () => {
  error.value = ''; // Resetea el mensaje de error antes de intentar loguear
  try {
    await authStore.login(username.value, password.value); // Llama a la acción de login
    console.log('Login successful:', currentUser.value);
    router.push('/home'); // Redirige a la página de inicio
  } catch (e) {
    error.value = 'Credenciales incorrectas o problema en el inicio de sesión.';
  }
};

const handleLogout = () => {
  authStore.logout(); // Llama a la acción de logout
  console.log('Logged out. Redirecting to login...');
  router.push('/login'); // Redirige a la página de login
};

const cambiarForm = () => {
  router.push('/register'); // Redirige a la página de registro
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

.form-switch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ocupa toda la altura de la ventana */
  padding-top: 4rem; /* Espacio para el logo */
  box-sizing: border-box;
}

.form-container {
  max-width: 300px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.login-button {
  padding: 0.75rem;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #555;
}

.logout-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #dc3545; /* Color rojo para el botón de logout */
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.logout-button:hover {
  background-color: #c82333; /* Color rojo más oscuro para el hover */
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

.user-info {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
