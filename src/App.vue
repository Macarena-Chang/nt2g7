<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center; /* Centra el texto en el header */
}

.main-title {
  font-size: 2rem; /* Tamaño de fuente del título */
  font-weight: bold; /* Texto en negrita */
  color: #333; /* Color del texto */
  margin: 2rem 0; /* Espaciado alrededor del título */
}
</style>