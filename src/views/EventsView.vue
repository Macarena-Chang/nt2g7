<template>
    <v-container>
      <v-row>
        <v-col
          v-for="event in events"
          :key="event.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex"
        >
          <v-card
            class="d-flex flex-column align-center elevation-3"
            @click="goToEvent(event.id)"
          >
            <v-img
              :src="event.imageUrl"
              height="200px"
              class="mb-3"
            ></v-img>
            <v-card-title class="text-h6">{{ event.name }}</v-card-title>
            <v-card-subtitle class="text-body-2">{{ event.location }}</v-card-subtitle>
            <v-card-text class="text-body-2">{{ event.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const events = ref([])
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://67201e1be7a5792f05308aee.mockapi.io/events/events')
      events.value = response.data
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  })
  
  const goToEvent = (id) => {
    // Aquí rediriges a la página del evento o despliegas más información
    console.log('Event ID:', id) // Prueba de clic en consola
  }
  </script>
  
  <style scoped>
  .v-card {
    cursor: pointer;
    transition: transform 0.2s;
  }
  .v-card:hover {
    transform: scale(1.05);
  }
  </style>
  