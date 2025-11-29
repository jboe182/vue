<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Admin Dashboard</h1>
        <div class="flex items-center space-x-4">
          <span>Hallo, {{ authStore.user?.email }}</span>
          <button 
            @click="authStore.signOut()"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <div class="mb-8">
        <nav class="flex space-x-4 border-b">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2 font-medium',
              activeTab === tab.id 
                ? 'border-b-2 border-band-primary text-band-primary' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Products Management -->
      <div v-if="activeTab === 'products'" class="bg-white rounded-lg shadow">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Produkte verwalten</h2>
            <button 
              @click="showProductForm = true"
              class="bg-band-primary text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Neues Produkt
            </button>
          </div>

          <!-- Products List -->
          <div class="grid gap-4">
            <div 
              v-for="product in supabaseStore.products" 
              :key="product.id"
              class="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 class="font-bold">{{ product.name }}</h3>
                <p class="text-gray-600">{{ product.price }}€</p>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700">Bearbeiten</button>
                <button class="text-red-500 hover:text-red-700">Löschen</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tracks Management -->
      <div v-if="activeTab === 'tracks'" class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-6">Tracks verwalten</h2>
          <!-- Tracks management content -->
        </div>
      </div>

      <!-- Orders Management -->
      <div v-if="activeTab === 'orders'" class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-6">Bestellungen</h2>
          <!-- Orders management content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSupabaseStore } from '@/stores/supabase'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const supabaseStore = useSupabaseStore()
const router = useRouter()

const activeTab = ref('products')
const showProductForm = ref(false)

const tabs = [
  { id: 'products', name: 'Produkte' },
  { id: 'tracks', name: 'Tracks' },
  { id: 'orders', name: 'Bestellungen' }
]

onMounted(async () => {
  // Redirect if not admin
  if (!authStore.isAdmin) {
    router.push('/admin/login')
    return
  }
  
  await supabaseStore.fetchProducts()
  await supabaseStore.fetchTracks()
})
</script>