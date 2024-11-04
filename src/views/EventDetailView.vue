<template>
  <div v-if="event && !error">
    <img v-if="event.imageUrl" :src="event.imageUrl" alt="Event Image" />
    <h1>{{ event?.name || 'Untitled Event' }}</h1>
    <p>{{ event?.description || 'No description available' }}</p>
  </div>
  <div v-else-if="error">
    <p>Error loading event: {{ error }}</p>
  </div>
  <div v-else>
    <p>Loading event details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const event = ref(null);
const error = ref(null);

const fetchEventDetail = async () => {
  try {
    const response = await axios.get(`https://67201e1be7a5792f05308aee.mockapi.io/events/events/${route.params.id}`);
    if (response?.data) {
      event.value = response.data;
    } else {
      error.value = 'Event not found';
    }
  } catch (error) {
    error.value = error.message || 'Error fetching event details';
    console.error('Error fetching event details:', error);
  }
};

onMounted(fetchEventDetail);
</script>
  
  <style scoped>
  /* Estilos para el detalle del evento */
  .event-detail {
    /* Añade los estilos que desees */
  }
  </style>
  