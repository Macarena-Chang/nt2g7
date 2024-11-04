<template>
    <div class="event-detail">
      <img :src="event.imageUrl" alt="Event Image" class="event-detail-image" />
      <h1>{{ event.name }}</h1>
      <p>{{ event.description }}</p>
      <p><strong>Location:</strong> {{ event.location }}</p>
      <p><strong>Price:</strong> {{ event.price }} {{ event.currency }}</p>
      <p><strong>Stock:</strong> {{ event.stockCant }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const event = ref(null);
  
  const fetchEventDetail = async () => {
    try {
      const response = await axios.get(`https://67201e1be7a5792f05308aee.mockapi.io/events/events/${route.params.id}`);
      event.value = response.data;
    } catch (error) {
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
  