<!-- components/AddToCartModal.vue -->
<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="cartStore.showAddToCartModal && cartStore.lastAddedItem"
      class="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4"
    >
      <div class="flex items-center space-x-3">
        <!-- Produktbild -->
        <div class="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
          <img
            v-if="cartStore.lastAddedItem.image_url"
            :src="cartStore.lastAddedItem.image_url"
            :alt="cartStore.lastAddedItem.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
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

        <!-- Produktinfo -->
        <div class="flex-grow">
          <p class="font-semibold text-sm text-gray-900">
            {{ cartStore.lastAddedItem.name }}
          </p>
          <p class="text-sm text-gray-600">Zum Warenkorb hinzugefügt</p>
          <p class="text-xs text-gray-500">
            Menge: {{ cartStore.lastAddedItem.quantity }} × {{ cartStore.lastAddedItem.price }}€
          </p>
        </div>

        <!-- Schließen Button -->
        <button
          @click="cartStore.closeModal()"
          class="text-gray-400 hover:text-gray-600 transition"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Warenkorb Link -->
      <div class="mt-3 pt-3 border-t border-gray-200">
        <router-link
          to="/cart"
          @click="cartStore.closeModal()"
          class="block w-full text-center bg-gray-600 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700 transition"
        >
          Zum Warenkorb ({{ cartStore.itemCount }})
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>
