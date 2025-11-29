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
