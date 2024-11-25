<template>
  <div>
    <h1>Panel de Administración</h1>
    <div>
      <h2>Resumen de Ventas</h2>
      <p>Total de eventos vendidos: {{ totalEventosVendidos }}</p>
      <p>Total recaudado: {{ totalDineroRecaudadoFormatted }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const totalEventosVendidos = ref(0);
const totalDineroRecaudado = ref(0);

const fetchAdminData = async () => {
  try {
    // Fetch all events from the API
    const response = await axios.get('https://67201e1be7a5792f05308aee.mockapi.io/events/events');
    const events = response.data;

    // Calculate the total number of events sold
    totalEventosVendidos.value = events.reduce((total, event) => {
      return total + Number(event.vendidosCantidad);
    }, 0);

    // Calculate the total money earned
    totalDineroRecaudado.value = events.reduce((total, event) => {
      const vendidosCantidad = Number(event.vendidosCantidad) || 0;
      const price = Number(event.price) || 0;
      return total + vendidosCantidad * price;
    }, 0);
  } catch (error) {
    console.error('Error al obtener los datos de ventas:', error);
  }
};

// Computed property to format the total money earned as currency
const totalDineroRecaudadoFormatted = computed(() => {
  return totalDineroRecaudado.value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'ARS',
  });
});

onMounted(() => {
  fetchAdminData();
});
</script>

<style scoped>
/* You can add styles specific to the admin dashboard here */
</style>
