<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Music</h1>
      
      <div v-if="supabaseStore.loading" class="text-center py-12">
        <p class="text-xl text-gray-600">Loading tracks...</p>
      </div>
      
      <div v-else-if="supabaseStore.error" class="text-center py-12">
        <p class="text-xl text-red-600">{{ supabaseStore.error }}</p>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div v-for="track in supabaseStore.tracks" :key="track.id" 
             class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <div class="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
            <img v-if="track.cover_url" :src="track.cover_url" :alt="track.title" class="w-full h-full object-cover" />
            <span v-else class="text-gray-500">Album Cover</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ track.title }}</h3>
          <p class="text-gray-600 mb-1">{{ track.artist }}</p>
          <p class="text-gray-500 text-sm mb-4">{{ formatDuration(track.duration) }}</p>
          <button @click="playTrack(track)" 
                  :class="[
                    'px-4 py-2 rounded transition w-full',
                    audioStore.currentTrack?.id === track.id && audioStore.isPlaying
                      ? 'bg-band-primary text-white'
                      : 'bg-gray-300 text-gray-700 hover:bg-band-primary hover:text-white'
                  ]">
            {{ audioStore.currentTrack?.id === track.id && audioStore.isPlaying ? 'Pause' : 'Play' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAudioStore } from '@/stores/audio'
import { useSupabaseStore } from '@/stores/supabase'

const audioStore = useAudioStore()
const supabaseStore = useSupabaseStore()

onMounted(() => {
  supabaseStore.fetchTracks()
})

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const playTrack = (track: any) => {
  if (audioStore.currentTrack?.id === track.id && audioStore.isPlaying) {
    audioStore.pauseTrack()
  } else {
    audioStore.playTrack(track)
  }
}
</script>
