<!-- views/CartView.vue -->
<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Warenkorb</h1>

      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 class="text-2xl font-bold mb-4">Dein Warenkorb ist leer</h2>
          <p class="text-gray-600 mb-6">Füge einige Produkte aus unserem Shop hinzu!</p>
          <router-link
            to="/shop"
            class="bg-band-primary text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Zum Shop
          </router-link>
        </div>
      </div>

      <div v-else class="space-y-6">
        <!-- Cart Items -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div v-for="item in cartStore.items" :key="item.id" class="border-b last:border-b-0 p-6">
            <div class="flex items-center space-x-4">
              <div class="w-20 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                <img
                  v-if="item.image_url"
                  :src="item.image_url"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div class="flex-grow">
                <h3 class="text-lg font-bold">{{ item.name }}</h3>
                <p class="text-gray-600 text-sm hidden md:block">{{ item.description }}</p>
                <!-- Preis nur auf Mobile anzeigen -->
                <p class="text-band-primary font-bold md:hidden">
                  {{ (item.price * item.quantity).toFixed(2) }}€
                </p>
              </div>

              <div class="flex items-center space-x-3">
                <div class="flex items-center space-x-2">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span class="w-8 text-center">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <!-- Preis nur auf Desktop anzeigen -->
                <div class="text-right min-w-20 hidden md:block">
                  <p class="font-bold">{{ (item.price * item.quantity).toFixed(2) }}€</p>
                </div>

                <button
                  @click="removeFromCart(item.id)"
                  class="text-red-500 hover:text-red-700 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-bold mb-4">Bestellübersicht</h3>
          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span>Zwischensumme:</span>
              <span>{{ cartStore.total.toFixed(2) }}€</span>
            </div>
            <div class="flex justify-between">
              <span>Versandkosten:</span>
              <span>0.00€</span>
            </div>
            <div class="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Gesamt:</span>
              <span>{{ cartStore.total.toFixed(2) }}€</span>
            </div>
          </div>

          <div class="flex space-x-4">
            <button
              @click="clearCart"
              class="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Warenkorb leeren
            </button>
            <button
              @click="checkout"
              class="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              Zur Kasse
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

const updateQuantity = (id: string, quantity: number) => {
  cartStore.updateQuantity(id, quantity);
};

const removeFromCart = (id: string) => {
  cartStore.removeFromCart(id);
};

const clearCart = () => {
  cartStore.clearCart();
};

const checkout = () => {
  // Hier kommt später die Stripe-Integration
  alert("Checkout-Funktionalität kommt bald!");
};
</script>
