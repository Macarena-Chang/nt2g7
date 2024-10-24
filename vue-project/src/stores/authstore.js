import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    mockApiAuth: 'https://671991967fc4c5ff8f4dc2fa.mockapi.io/users',
    sessionDuration: 5 * 60 * 1000,
    isAuthenticated: false,
    user: null,
    isAdmin: false
  }),
  
  actions: {
    async getUserByUserName(username) {
      const response = await axios.get(this.mockApiAuth)
      const users = response.data
      return users.find(user => user.username === username)
    },

    async login(username, password) {
      try {
        const user = await this.getUserByUserName(username);
        console.log('Found user:', user); // Add this line

        if(user.password === password) {
          const currentTime = new Date().getTime();
          this.isAuthenticated = true;
          this.user = user;

          // Now role is a boolean where true = admin
          this.isAdmin = user.role;
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('isAdmin', this.isAdmin ? 'true' : 'false')
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('sessionStart', currentTime);
          localStorage.setItem('sessionDuration', this.sessionDuration);
        } else {
          alert('Usuario o contraseña no válido')
        }
      } catch (error) {
        console.error('Error en Login: ', error)
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
            role: false, // New users are not admin by default
            active: true
          };

          const response = await axios.post(this.mockApiAuth, user);
          const data = response.data;
          this.isAuthenticated = true;
          this.user = data;
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(this.user));
        } catch (error) {
          console.log('ERROR: ', error);
        }
      } else {
        alert('Completá todos los datos');
      }
    }
  }
});
