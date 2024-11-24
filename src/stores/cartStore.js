import axios from 'axios'; // Import axios to make HTTP requests
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);
  const apiUrl = 'https://67201e1be7a5792f05308aee.mockapi.io/events/events'; // Mock API URL

  const addToCart = (event) => {
    const existingItem = cartItems.value.find((item) => item.id === event.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({ ...event, quantity: 1 });
    }
  };

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
  };

  const clearCart = () => {
    cartItems.value = []; // Vacía el carrito
  };

  const cartTotal = () => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // New checkout action
  const checkout = async () => {
    try {
      for (const item of cartItems.value) {
        // Fetch the current event data from the mock API
        const response = await axios.get(`${apiUrl}/${item.id}`);
        const event = response.data;

        // Calculate the new vendidosCantidad
        const updatedVendidosCantidad = event.vendidosCantidad + item.quantity;

        // Check if there's enough stock
        if (event.stockCant < item.quantity) {
          alert(`No hay suficiente stock para ${event.name}`);
          return;
        }

        // Update the stockCant
        const updatedStockCant = event.stockCant - item.quantity;

        // Update the event data on the mock API
        await axios.put(`${apiUrl}/${item.id}`, {
          ...event,
          vendidosCantidad: updatedVendidosCantidad,
          stockCant: updatedStockCant,
        });
      }

      // Clear the cart after successful checkout
      clearCart();
      alert('¡Compra realizada con éxito!');
    } catch (error) {
      console.error('Error en el checkout:', error);
      alert('Ocurrió un error durante la compra.');
    }
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    checkout, // Expose the checkout action
  };
});
