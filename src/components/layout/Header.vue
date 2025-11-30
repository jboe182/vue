<template>
  <header class="bg-band-primary text-black p-4 shadow-lg">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold font-band">Band Name</div>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex space-x-6 items-center">
        <li>
          <router-link to="/" class="hover:text-band-accent transition flex items-center space-x-1">
            <Home class="h-4 w-4" />
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="hover:text-band-accent transition flex items-center space-x-1"
          >
            <Users class="h-4 w-4" />
            <span>About</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/music"
            class="hover:text-band-accent transition flex items-center space-x-1"
          >
            <Music class="h-4 w-4" />
            <span>Music</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/shop"
            class="hover:text-band-accent transition flex items-center space-x-1"
          >
            <ShoppingBag class="h-4 w-4" />
            <span>Shop</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="hover:text-band-accent transition flex items-center space-x-1"
          >
            <Mail class="h-4 w-4" />
            <span>Contact</span>
          </router-link>
        </li>
        <!-- Shopping Cart Icon -->
        <li class="relative">
          <router-link
            to="/cart"
            class="hover:text-band-accent transition flex items-center space-x-1"
          >
            <ShoppingCart class="h-5 w-5" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              {{ cartStore.itemCount }}
            </span>
          </router-link>
        </li>
      </ul>

      <!-- Mobile Menu Button und Cart -->
      <div class="flex items-center space-x-4 md:hidden">
        <!-- Shopping Cart Icon Mobile -->
        <router-link to="/cart" class="relative hover:text-band-accent transition">
          <ShoppingCart class="h-6 w-6" />
          <span
            v-if="cartStore.itemCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          >
            {{ cartStore.itemCount }}
          </span>
        </router-link>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="p-2 focus:outline-none text-black"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
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
            class="block py-2 px-4 hover:bg-red-700 rounded transition flex items-center space-x-2"
          >
            <Home class="h-4 w-4" />
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition flex items-center space-x-2"
          >
            <Users class="h-4 w-4" />
            <span>About</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/music"
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition flex items-center space-x-2"
          >
            <Music class="h-4 w-4" />
            <span>Music</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/shop"
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition flex items-center space-x-2"
          >
            <ShoppingBag class="h-4 w-4" />
            <span>Shop</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition flex items-center space-x-2"
          >
            <Mail class="h-4 w-4" />
            <span>Contact</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/cart"
            @click="closeMenu"
            class="block py-2 px-4 hover:bg-red-700 rounded transition flex items-center justify-between"
          >
            <div class="flex items-center space-x-2">
              <ShoppingCart class="h-4 w-4" />
              <span>Warenkorb</span>
            </div>
            <span
              v-if="cartStore.itemCount > 0"
              class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              {{ cartStore.itemCount }}
            </span>
          </router-link>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { Home, Users, Music, ShoppingBag, Mail, ShoppingCart, Menu, X } from "lucide-vue-next";

const cartStore = useCartStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
