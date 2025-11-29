<template>
  <div v-if="audioStore.currentTrack" 
       class="fixed bottom-0 left-0 right-0 bg-white shadow-2xl transition-all duration-300 z-50"
       :class="{ 'h-screen flex flex-col': isExpanded, 'h-20': !isExpanded }">
    
    <!-- Collapsed View -->
    <div v-if="!isExpanded" 
         class="h-full container mx-auto px-4 flex items-center justify-between cursor-pointer"
         @click="toggleExpand">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-gray-200 rounded overflow-hidden">
           <!-- Placeholder for cover if available -->
           <div class="w-full h-full bg-band-primary flex items-center justify-center text-white text-xs">
             Cover
           </div>
        </div>
        <div>
          <h4 class="font-bold text-gray-900">{{ audioStore.currentTrack.title }}</h4>
          <p class="text-sm text-gray-500">{{ audioStore.currentTrack.artist || 'Unknown Artist' }}</p>
        </div>
      </div>

      <div class="flex items-center space-x-4" @click.stop>
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="togglePlay" class="p-3 bg-band-primary text-white rounded-full hover:bg-red-700">
          <svg v-if="audioStore.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        </button>
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button @click.stop="toggleExpand" class="p-2 hover:bg-gray-100 rounded-full ml-2">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Expanded View -->
    <div v-else class="flex-1 flex flex-col bg-white">
      <div class="p-4 flex justify-end">
        <button @click="toggleExpand" class="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div class="flex-1 flex flex-col items-center justify-center p-8">
        <div class="w-64 h-64 md:w-96 md:h-96 bg-gray-200 rounded-lg shadow-xl mb-8 flex items-center justify-center">
           <div class="text-4xl text-gray-400">Cover</div>
        </div>
        
        <h2 class="text-3xl font-bold mb-2 text-center">{{ audioStore.currentTrack.title }}</h2>
        <p class="text-xl text-gray-600 mb-8 text-center">{{ audioStore.currentTrack.artist || 'Unknown Artist' }}</p>
        
        <!-- Progress Bar -->
        <div class="w-full max-w-2xl mb-8">
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
            <div class="h-full bg-band-primary w-1/2"></div>
          </div>
          <div class="flex justify-between text-sm text-gray-500 mt-2">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center space-x-8">
          <button class="p-4 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="togglePlay" class="p-6 bg-band-primary text-white rounded-full hover:bg-red-700 shadow-lg transform hover:scale-105 transition">
            <svg v-if="audioStore.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </button>
          <button class="p-4 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
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
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const togglePlay = () => {
  if (audioStore.isPlaying) {
    audioStore.pauseTrack()
  } else if (audioStore.currentTrack) {
    audioStore.playTrack(audioStore.currentTrack)
  }
}
</script>
