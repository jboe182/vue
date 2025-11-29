<template>
  <header class="bg-band-primary text-black p-4 shadow-lg">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold font-band">
        Band Name
      </div>
      
      <!-- Desktop Navigation -->
      <ul class="hidden md:flex space-x-6">
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

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMenu" 
        class="md:hidden p-2 focus:outline-none text-black"
        aria-label="Toggle menu"
      >
        <!-- Hamburger Icon -->
        <svg 
          v-if="!isMenuOpen" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        
        <!-- Close Icon (X) -->
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Navigation Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul v-if="isMenuOpen" class="md:hidden mt-4 space-y-2 pb-4">
        <li>
          <router-link 
            to="/" 
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link 
            to="/about" 
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition"
          >
            About
          </router-link>
        </li>
        <li>
          <router-link 
            to="/music" 
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition"
          >
            Music
          </router-link>
        </li>
        <li>
          <router-link 
            to="/shop" 
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition"
          >
            Shop
          </router-link>
        </li>
        <li>
          <router-link 
            to="/contact" 
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition"
          >
            Contact
          </router-link>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>
