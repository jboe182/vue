<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Merch Shop</h1>
      
      <div v-if="supabaseStore.loading" class="text-center py-12">
        <p class="text-xl text-gray-600">Loading products...</p>
      </div>
      
      <div v-else-if="supabaseStore.error" class="text-center py-12">
        <p class="text-xl text-red-600">{{ supabaseStore.error }}</p>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div v-for="product in supabaseStore.products" :key="product.id" 
             class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <div class="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
            <img v-if="product.image_url" :src="product.image_url" :alt="product.name" class="w-full h-full object-cover" />
            <span v-else class="text-gray-500">Product Image</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 mb-2">{{ product.description }}</p>
          <p class="text-2xl font-bold text-band-primary mb-4">{{ product.price }}€</p>
          <button @click="addToCart(product)" 
                  class="w-full bg-band-primary text-white py-2 rounded hover:bg-red-700 transition">
            In den Warenkorb
          </button>
        </div>
      </div>
      
      <!-- Shopping Cart -->
      <div class="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Warenkorb ({{ cartStore.items.length }})</h2>
        <div v-if="cartStore.items.length > 0">
          <div v-for="(item, index) in cartStore.items" :key="index" 
               class="flex justify-between items-center py-3 border-b">
            <span>{{ item.name }}</span>
            <div class="flex items-center space-x-4">
              <span>{{ item.price }}€</span>
              <button @click="removeFromCart(index)" 
                      class="text-red-500 hover:text-red-700">
                Entfernen
              </button>
            </div>
          </div>
          <div class="flex justify-between items-center mt-4 pt-4 border-t">
            <span class="text-xl font-bold">Gesamt:</span>
            <span class="text-xl font-bold">{{ cartStore.total }}€</span>
          </div>
          <button class="w-full mt-4 bg-green-500 text-white py-3 rounded hover:bg-green-600 transition">
            Zur Kasse
          </button>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          Dein Warenkorb ist leer
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useSupabaseStore } from '@/stores/supabase'

const cartStore = useCartStore()
const supabaseStore = useSupabaseStore()

onMounted(() => {
  supabaseStore.fetchProducts()
})

const addToCart = (product: any) => {
  cartStore.addToCart(product)
}

const removeFromCart = (index: number) => {
  cartStore.removeFromCart(index)
}
</script>
