<template>
  <div>
    <h1>Carrito de Compras</h1>
    <div v-if="cartItems.length">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <h3>{{ item.name }}</h3>
        <p>Precio: {{ item.price }}</p>
        <p>Cantidad: {{ item.quantity }}</p>
        <button @click="removeFromCart(item.id)">Eliminar</button>
      </div>
      <h2>Total: {{ cartTotal() }}</h2>
      <button @click="handleClearCart">Vaciar Carrito</button>
      <button @click="hacerCompra">Realizar compra</button>
    </div>
    <div v-else>
      <p>El carrito está vacío.</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

const router = useRouter();
const cartStore = useCartStore();

const cartItems = cartStore.cartItems;
const cartTotal = cartStore.cartTotal;
const removeFromCart = cartStore.removeFromCart;

const hacerCompra = async () => {
  await cartStore.checkout(); // Call the checkout action
  router.push('/cart'); // Redirect to the cart page
};

const handleClearCart = () => {
  cartStore.clearCart(); // Vacía el carrito
  router.replace('/cart'); // Redirige a la página del carrito vacío
};
</script>

<style scoped>
.cart-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
