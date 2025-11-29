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
