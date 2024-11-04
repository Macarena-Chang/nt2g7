<template>
    <div>
      <h1>Carrito de Compras</h1>
      <div v-if="cartItems.length">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <h3>{{ item.name }}</h3>
          <p>Precio: {{ item.price }} {{ item.currency }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
          <button @click="removeFromCart(item.id)">Eliminar</button>
        </div>
        <h2>Total: {{ cartTotal }} {{ cartItems[0]?.currency }}</h2>
        <button @click="clearCart">Vaciar Carrito</button>
      </div>
      <div v-else>
        <p>El carrito está vacío.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '../stores/cartStore';

  const cartStore = useCartStore();
  
  const cartItems = cartStore.cartItems;
  const cartTotal = cartStore.cartTotal();
  const removeFromCart = cartStore.removeFromCart;
  const clearCart = cartStore.clearCart;
  </script>
  
  <style scoped>
  .cart-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  </style>
  