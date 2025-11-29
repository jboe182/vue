#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Erstelle Band-Website Struktur...${NC}"

# Projektverzeichnis
SRC_DIR="./src"
COMPONENTS_DIR="$SRC_DIR/components"
LAYOUT_DIR="$COMPONENTS_DIR/layout"
AUDIO_DIR="$COMPONENTS_DIR/audio"
SHOP_DIR="$COMPONENTS_DIR/shop"
VIEWS_DIR="$SRC_DIR/views"
STORES_DIR="$SRC_DIR/stores"
ROUTER_DIR="$SRC_DIR/router"
UTILS_DIR="$SRC_DIR/utils"

# Verzeichnisse erstellen
echo -e "${YELLOW}📁 Erstelle Verzeichnisse...${NC}"
mkdir -p $LAYOUT_DIR
mkdir -p $AUDIO_DIR
mkdir -p $SHOP_DIR
mkdir -p $VIEWS_DIR
mkdir -p $STORES_DIR
mkdir -p $ROUTER_DIR
mkdir -p $UTILS_DIR

# 1. Router erstellen
echo -e "${YELLOW}🛣️ Erstelle Router...${NC}"
cat > $ROUTER_DIR/index.ts << 'EOF'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Music from '@/views/Music.vue'
import Shop from '@/views/Shop.vue'
import Contact from '@/views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/music', component: Music },
    { path: '/shop', component: Shop },
    { path: '/contact', component: Contact }
  ]
})

export default router
EOF

# 2. Stores erstellen
echo -e "${YELLOW}📦 Erstelle Stores...${NC}"

# Audio Store
cat > $STORES_DIR/audio.ts << 'EOF'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const currentTrack = ref(null)
  const isPlaying = ref(false)
  const volume = ref(0.7)
  
  const playTrack = (track: any) => {
    currentTrack.value = track
    isPlaying.value = true
  }
  
  const pauseTrack = () => {
    isPlaying.value = false
  }
  
  return { 
    currentTrack, 
    isPlaying, 
    volume, 
    playTrack, 
    pauseTrack 
  }
})
EOF

# Cart Store
cat > $STORES_DIR/cart.ts << 'EOF'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<any[]>([])
  
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0)
  })
  
  const addToCart = (product: any) => {
    items.value.push(product)
  }
  
  const removeFromCart = (index: number) => {
    items.value.splice(index, 1)
  }
  
  return { items, total, addToCart, removeFromCart }
})
EOF

# 3. Layout Components
echo -e "${YELLOW}🎨 Erstelle Layout Components...${NC}"

# Header Component
cat > $LAYOUT_DIR/Header.vue << 'EOF'
<template>
  <header class="bg-band-primary text-white p-4 shadow-lg">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold font-band">
        Band Name
      </div>
      <ul class="flex space-x-6">
        <li>
          <router-link to="/" class="hover:text-band-accent transition">Home</router-link>
        </li>
        <li>
          <router-link to="/about" class="hover:text-band-accent transition">About</router-link>
        </li>
        <li>
          <router-link to="/music" class="hover:text-band-accent transition">Music</router-link>
        </li>
        <li>
          <router-link to="/shop" class="hover:text-band-accent transition">Shop</router-link>
        </li>
        <li>
          <router-link to="/contact" class="hover:text-band-accent transition">Contact</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Header logic here
</script>
EOF

# Footer Component
cat > $LAYOUT_DIR/Footer.vue << 'EOF'
<template>
  <footer class="bg-gray-900 text-white p-8 mt-12">
    <div class="container mx-auto text-center">
      <p>&copy; 2024 Band Name. All rights reserved.</p>
      <div class="flex justify-center space-x-4 mt-4">
        <a href="#" class="hover:text-band-accent transition">Instagram</a>
        <a href="#" class="hover:text-band-accent transition">Spotify</a>
        <a href="#" class="hover:text-band-accent transition">YouTube</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer logic here
</script>
EOF

# 4. Views/Seiten erstellen
echo -e "${YELLOW}📄 Erstelle Views/Seiten...${NC}"

# Home Page
cat > $VIEWS_DIR/Home.vue << 'EOF'
<template>
  <div class="min-h-screen bg-gradient-to-b from-band-primary to-black text-white">
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-6xl font-bold font-band mb-4">Band Name</h1>
      <p class="text-xl mb-8">Rocking the world since 2024</p>
      <div class="space-x-4">
        <router-link to="/music" class="bg-band-accent px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition">
          Music hören
        </router-link>
        <router-link to="/shop" class="border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition">
          Merch kaufen
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home page logic
</script>
EOF

# About Page
cat > $VIEWS_DIR/About.vue << 'EOF'
<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">About Us</h1>
      <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p class="text-lg mb-4">
          Wir sind Band Name - eine leidenschaftliche Rockband, die 2024 gegründet wurde. 
          Unsere Musik verbindet energiegeladene Riffs mit mitreißenden Melodien.
        </p>
        <p class="text-lg">
          Mit bereits über 50 Live-Auftritten und einer stetig wachsenden Fanbase 
          teilen wir unsere Liebe zur Musik mit der Welt.
        </p>
        
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-band-primary">50+</div>
            <div class="text-gray-600">Live Shows</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-band-primary">10k+</div>
            <div class="text-gray-600">Streams</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-band-primary">3</div>
            <div class="text-gray-600">Band Members</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page logic
</script>
EOF

# Music Page
cat > $VIEWS_DIR/Music.vue << 'EOF'
<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Music</h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div v-for="track in tracks" :key="track.id" 
             class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <div class="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
            <span class="text-gray-500">Album Cover</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ track.title }}</h3>
          <p class="text-gray-600 mb-4">{{ track.duration }}</p>
          <button @click="playTrack(track)" 
                  class="bg-band-primary text-white px-4 py-2 rounded hover:bg-red-700 transition">
            {{ audioStore.currentTrack?.id === track.id && audioStore.isPlaying ? 'Pause' : 'Play' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAudioStore } from '@/stores/audio'

const audioStore = useAudioStore()

const tracks = ref([
  { id: 1, title: 'Song One', duration: '3:45' },
  { id: 2, title: 'Song Two', duration: '4:20' },
  { id: 3, title: 'Song Three', duration: '3:15' },
  { id: 4, title: 'Song Four', duration: '4:05' },
  { id: 5, title: 'Song Five', duration: '3:30' },
  { id: 6, title: 'Song Six', duration: '4:15' }
])

const playTrack = (track: any) => {
  if (audioStore.currentTrack?.id === track.id && audioStore.isPlaying) {
    audioStore.pauseTrack()
  } else {
    audioStore.playTrack(track)
  }
}
</script>
EOF

# Shop Page
cat > $VIEWS_DIR/Shop.vue << 'EOF'
<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Merch Shop</h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div v-for="product in products" :key="product.id" 
             class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <div class="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
            <span class="text-gray-500">Product Image</span>
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
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const products = ref([
  { id: 1, name: 'Band T-Shirt', description: '100% Baumwolle', price: 25 },
  { id: 2, name: 'Album CD', description: 'Unsere neueste CD', price: 15 },
  { id: 3, name: 'Poster', description: 'Limited Edition', price: 10 },
  { id: 4, name: 'Hoodie', description: 'Warm und stylisch', price: 45 },
  { id: 5, name: 'Sticker Pack', description: '5 verschiedene Sticker', price: 5 },
  { id: 6, name: 'Vinyl Record', description: 'Limited Vinyl', price: 30 }
])

const addToCart = (product: any) => {
  cartStore.addToCart(product)
}

const removeFromCart = (index: number) => {
  cartStore.removeFromCart(index)
}
</script>
EOF

# Contact Page
cat > $VIEWS_DIR/Contact.vue << 'EOF'
<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Contact</h1>
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Name</label>
            <input type="text" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input type="email" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Subject</label>
            <input type="text" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Message</label>
            <textarea rows="4" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent"></textarea>
          </div>
          <button type="submit" class="w-full bg-band-primary text-white py-3 rounded hover:bg-red-700 transition font-bold">
            Send Message
          </button>
        </form>
        
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-xl font-bold mb-4">Kontakt Informationen</h3>
          <div class="space-y-2">
            <p>📧 Email: contact@bandname.com</p>
            <p>📞 Phone: +49 123 456 789</p>
            <p>📍 Address: Musterstraße 123, 12345 Berlin</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Contact page logic
</script>
EOF

# 5. App.vue aktualisieren
echo -e "${YELLOW}📱 Aktualisiere App.vue...${NC}"
cat > $SRC_DIR/App.vue << 'EOF'
<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}
</style>
EOF

# 6. main.ts aktualisieren
echo -e "${YELLOW}⚙️ Aktualisiere main.ts...${NC}"
cat > $SRC_DIR/main.ts << 'EOF'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
EOF

# 7. Utils - Supabase Client
echo -e "${YELLOW}🔌 Erstelle Supabase Client...${NC}"
cat > $UTILS_DIR/supabase.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
EOF

echo -e "${GREEN}✅ Alle Dateien wurden erfolgreich erstellt!${NC}"
echo -e "${YELLOW}📝 Nächste Schritte:${NC}"
echo "1. npm run dev"
echo "2. Git commit machen: git add . && git commit -m 'Add all pages and components'"
echo "3. Unter http://localhost:5173 testen"