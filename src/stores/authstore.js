import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    mockApiAuth: 'https://671991967fc4c5ff8f4dc2fa.mockapi.io/users',
    sessionDuration: 5 * 60 * 1000,
    isAuthenticated: false,
    user: null,
    isAdmin: false,
    currentUser: null // Nuevo campo para almacenar al usuario actual
  }),

  actions: {
    async getUserByUserName(username) {
      const response = await axios.get(this.mockApiAuth);
      const users = response.data;
      return users.find(user => user.username === username);
    },

    async login(username, password) {
      try {
        const user = await this.getUserByUserName(username);
        console.log('Found user:', user);

        if (user && user.password === password) {
          const currentTime = new Date().getTime();
          this.isAuthenticated = true;
          this.user = user;
          this.currentUser = user; // Almacena al usuario actual

          // Define si el usuario es administrador
          this.isAdmin = user.role;
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('isAdmin', this.isAdmin ? 'true' : 'false');
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('sessionStart', currentTime);
          localStorage.setItem('sessionDuration', this.sessionDuration);
        } else {
          alert('Usuario o contraseña no válido');
        }
      } catch (error) {
        console.error('Error en Login: ', error);
      }
    },

    async register(username, email, password) {
      if (username && email && password) {
        try {
          const existingUser = await this.getUserByUserName(username);
          if (existingUser) {
            alert('Nombre de usuario ya existe. Por favor, elija otro nombre de usuario.');
            return;
          }

          const user = {
            username,
            email,
            password,
            role: false, // Usuarios nuevos no son admin por defecto
            active: true
          };

          const response = await axios.post(this.mockApiAuth, user);
          const data = response.data;
          this.isAuthenticated = true;
          this.user = data;
          this.currentUser = data; // Almacena al usuario actual después de registrarse
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(this.user));
        } catch (error) {
          console.log('ERROR: ', error);
        }
      } else {
        alert('Completá todos los datos');
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.isAdmin = false;
      this.currentUser = null; // Borra el usuario actual
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('user');
      localStorage.removeItem('sessionStart');
      localStorage.removeItem('sessionDuration');
    }
  }
});