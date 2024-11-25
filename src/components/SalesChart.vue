<template>
    <div>
      <Bar :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';
  
  // Register required components for Chart.js
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  // Define the props
  const props = defineProps({
    eventsData: {
      type: Array,
      required: true,
    },
  });
  
  // Reactive variables for chart data and options
  const chartData = ref({
    labels: [],
    datasets: [],
  });
  
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas por Evento',
      },
    },
  });
  
  // Function to update chart data
  const updateChartData = () => {
    const labels = props.eventsData.map((event) => event.name);
    const salesData = props.eventsData.map((event) => Number(event.vendidosCantidad));
    const earningsData = props.eventsData.map((event) => Number(event.vendidosCantidad) * Number(event.price));
  
    chartData.value = {
      labels,
      datasets: [
        {
          label: 'Cantidad Vendida',
          backgroundColor: '#42A5F5',
          data: salesData,
        },
        {
          label: 'Ingresos ($ ARS)',
          backgroundColor: '#66BB6A',
          data: earningsData,
        },
      ],
    };
  };
  
  // Watch for changes in eventsData and update the chart accordingly
  watch(
    () => props.eventsData,
    () => {
      updateChartData();
    },
    { immediate: true }
  );
  </script>
  
  <style scoped>
  /* You can add custom styles for your chart here */
  </style>
  