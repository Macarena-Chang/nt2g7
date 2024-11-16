import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);

  const addToCart = (event) => {
    const existingItem = cartItems.value.find(item => item.id === event.id);
    console.log(existingItem)
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({ ...event, quantity: 1 });
    }
    console.log(cartItems)
    
  };    

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
  };

  const clearCart = () => {
    cartItems.value = [];
    const router = useRouter()
    router.push("/cart")
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
