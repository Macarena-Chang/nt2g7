<template>
  <div>
    <h1>Panel de Administración</h1>
    <div>
      <h2>Resumen de Ventas</h2>
      <p>Total de eventos vendidos: {{ totalEventosVendidos }}</p>
      <p>Total recaudado: {{ totalDineroRecaudadoFormatted }}</p>
    </div>

    <!-- New Section: Event with the Highest Earnings -->
    <div v-if="highestEarningEvent" class="highest-earning-event">
      <h2>Evento con Mayor Recaudación</h2>
      <h3>{{ highestEarningEvent.name }}</h3>
      <p>Ingresos: {{ highestEarningEventEarningsFormatted }}</p>
      <p>Cantidad Vendida: {{ highestEarningEvent.vendidosCantidad }}</p>
    </div>

    <!-- Existing Sales Chart -->
    <div style="max-width: 800px; margin: auto;">
      <SalesChart :events-data="events" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import SalesChart from '../components/SalesChart.vue';

const events = ref([]);
const totalEventosVendidos = ref(0);
const totalDineroRecaudado = ref(0);
const highestEarningEvent = ref(null); // New ref for the highest earning event

const fetchAdminData = async () => {
  try {
    // Fetch all events from the API
    const response = await axios.get('https://67201e1be7a5792f05308aee.mockapi.io/events/events');
    events.value = response.data;

    // Calculate the total number of events sold
    totalEventosVendidos.value = events.value.reduce((total, event) => {
      return total + Number(event.vendidosCantidad);
    }, 0);

    // Calculate the total money earned
    totalDineroRecaudado.value = events.value.reduce((total, event) => {
      const vendidosCantidad = Number(event.vendidosCantidad) || 0;
      const price = Number(event.price) || 0;
      return total + vendidosCantidad * price;
    }, 0);

    // Calculate the event with the highest earnings
    if (events.value.length > 0) {
      highestEarningEvent.value = events.value.reduce((maxEvent, event) => {
        const eventEarnings = Number(event.vendidosCantidad) * Number(event.price);
        const maxEventEarnings = Number(maxEvent.vendidosCantidad) * Number(maxEvent.price);
        return eventEarnings > maxEventEarnings ? event : maxEvent;
      }, events.value[0]);
    }

  } catch (error) {
    console.error('Error al obtener los datos de ventas:', error);
  }
};

// Computed properties for formatting
const totalDineroRecaudadoFormatted = computed(() => {
  return totalDineroRecaudado.value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'ARS',
  });
});

const highestEarningEventEarnings = computed(() => {
  if (highestEarningEvent.value) {
    return Number(highestEarningEvent.value.vendidosCantidad) * Number(highestEarningEvent.value.price);
  }
  return 0;
});

const highestEarningEventEarningsFormatted = computed(() => {
  return highestEarningEventEarnings.value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'ARS',
  });
});

onMounted(() => {
  fetchAdminData();
});
</script>

<style scoped>
.highest-earning-event {
  border: 2px solid #cfcfcf;
  padding: 16px;
  margin: 16px 0;
  background-color: #faf5f6;
}
</style>
