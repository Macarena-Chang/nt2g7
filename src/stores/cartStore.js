import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);

  const addToCart = (event) => {
    const existingItem = cartItems.value.find(item => item.id === event.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({ ...event, quantity: 1 });
    }
  };

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
  };

  const clearCart = () => {
    cartItems.value = []; // Vacía el carrito
  };

  const cartTotal = () => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal
  };
});
