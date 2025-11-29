<template>
  <div id="app">
    <Header />
    <main class="pb-20"> <!-- Added padding-bottom to prevent content from being hidden behind player -->
      <router-view />
    </main>
    <Footer />
    <MusicPlayer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
</script>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}
</style>
