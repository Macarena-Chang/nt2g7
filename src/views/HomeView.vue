<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authstore';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';



const authStore = useAuthStore();
const cartStore = useCartStore(); // Instancia del store del carrito
const router = useRouter();
const events = ref([]);

const fetchEvents = async () => {
  try {
    const response = await axios.get('https://67201e1be7a5792f05308aee.mockapi.io/events/events');
    events.value = response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

onMounted(fetchEvents);

const goToEventDetail = (id) => {
  router.push(`/events/${id}`);
};

const addToCart = (event) => {
  cartStore.addToCart(event);  // Añadir el evento al carrito
  alert(`${event.name} añadido al carrito.`);
  router.push('/home');
}
</script>

<template>
  <main>
    <TheWelcome />
    <div class="user-info">
      <h2>Bienvenido, {{ authStore.currentUser?.username }}!</h2>
    </div>

    <!-- Cuadrícula de eventos -->
    <div class="events-grid">
      <div v-for="event in events" :key="event.id" class="event-card" @click="goToEventDetail(event.id)">
        <img :src="event.imageUrl" alt="Event Image" class="event-image" />
        <h3 class="event-title">{{ event.name }}</h3>
        <p class="event-location">{{ event.location }}</p>
        <p class="event-price">{{ event.price }} {{ event.currency }}</p>
        <button @click="addToCart(event)">Añadir al carrito</button>
      </div>
    </div>
    <button @click="router.push('/cart')">Ver Carrito</button>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra horizontalmente los elementos dentro de `main` */
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Cuadrícula responsive */
  gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
}

.event-card {
  display: flex;
  flex-direction: column; /* Asegura que los elementos se distribuyan verticalmente */
  justify-content: space-between; /* Mantiene espacio entre contenido y botón */
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  height: 300px; /* Altura fija para todas las tarjetas */
}

.event-card:hover {
  transform: scale(1.05);
}

.event-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.event-title {
  font-size: 1.2em;
  margin: 10px 0;
  color: #fff;
}

.event-location,
.event-price {
  font-size: 0.9em;
  color: #ddd;
}

button {
  margin-top: auto; /* Empuja el botón hacia la parte inferior */
  padding: 10px 15px;
  background-color: rgba(0, 123, 255, 0.7);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 123, 255, 0.9);
}
</style>
