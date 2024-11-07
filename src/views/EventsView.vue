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
          <v-card-actions>
            <v-btn @click.stop="goToEvent(event.id)" color="primary">Ver Detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mensaje de error si no se pueden obtener los eventos -->
    <v-alert v-if="error" type="error" dismissible>
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const events = ref([]);
const error = ref(null); // Para manejar el error

onMounted(async () => {
  try {
    const response = await axios.get('https://67201e1be7a5792f05308aee.mockapi.io/events/events');
    events.value = response.data;
  } catch (err) {
    console.error('Error fetching events:', err);
    error.value = 'Error al cargar los eventos. Intenta nuevamente más tarde.'; // Mensaje de error
  }
});

const goToEvent = (id) => {
  // Aquí rediriges a la página del evento o despliegas más información
  console.log('Event ID:', id); // Prueba de clic en consola
  // Puedes usar router para redirigir a la vista de detalles del evento
  // router.push(`/events/${id}`);
};
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
