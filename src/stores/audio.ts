import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Track {
  id: number | string
  title: string
  duration?: number
  artist?: string
  audio_url?: string
}

export const useAudioStore = defineStore('audio', () => {
  const currentTrack = ref<Track | null>(null)
  const isPlaying = ref(false)
  const volume = ref(0.7)

  const playTrack = (track: Track) => {
    currentTrack.value = track
    isPlaying.value = true
    console.log('Playing:', track.title)
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