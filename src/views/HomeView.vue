<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authstore';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import axios from 'axios';

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
main {
  position: relative;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 20px;
}

.event-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.event-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.event-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.event-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.event-location,
.event-price {
  font-size: 1rem;
  color: #555;
}
</style>