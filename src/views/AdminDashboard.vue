<template>
    <div>
      <h1>Panel de Administración</h1>
      <div>
        <h2>Resumen de Ventas</h2>
        <p>Total de eventos vendidos: {{ totalEventosVendidos }}</p>
        <p>Total recaudado: {{ totalDineroRecaudado}}</p>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '@/stores/authstore';
  import axios from 'axios';


  const totalEventosVendidos = ref(0);
  const totalDineroRecaudado = ref(0);
  
  // Simula una llamada al backend
  const fetchAdminData = async () => {
    // Reemplaza con una llamada real a tu API
    const response = await axios.get(`https://67201e1be7a5792f05308aee.mockapi.io/events/events/${route.params.id}`);
    const data = await response.json();
    totalEventosVendidos.value = data.totalEventos;
    totalDineroRecaudado.value = data.totalDinero;
  };
  
  onMounted(() => {
    fetchAdminData();
  });

  
  </script>
  
  