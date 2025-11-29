import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Track {
  id: number | string
  title: string
  duration?: number
  artist?: string
  audio_url?: string
  cover_url?: string
}

export const useAudioStore = defineStore('audio', () => {
  const currentTrack = ref<Track | null>(null)
  const isPlaying = ref(false)
  const volume = ref(0.7)
  const audioElement = ref<HTMLAudioElement | null>(null)
  const currentTime = ref(0)
  const duration = ref(0)

  // Initialize audio element
  if (typeof window !== 'undefined') {
    audioElement.value = new Audio()
    audioElement.value.volume = volume.value

    // Update current time
    audioElement.value.addEventListener('timeupdate', () => {
      currentTime.value = audioElement.value?.currentTime || 0
    })

    // Update duration when loaded
    audioElement.value.addEventListener('loadedmetadata', () => {
      duration.value = audioElement.value?.duration || 0
    })

    // Handle track end
    audioElement.value.addEventListener('ended', () => {
      isPlaying.value = false
    })
  }

  const playTrack = (track: Track) => {
    if (!audioElement.value) return

    // If same track, just resume
    if (currentTrack.value?.id === track.id && audioElement.value.src) {
      audioElement.value.play()
      isPlaying.value = true
      return
    }

    // Load new track
    currentTrack.value = track
    if (track.audio_url) {
      audioElement.value.src = track.audio_url
      audioElement.value.play()
      isPlaying.value = true
    }
  }

  const pauseTrack = () => {
    if (audioElement.value) {
      audioElement.value.pause()
      isPlaying.value = false
    }
  }

  const setVolume = (newVolume: number) => {
    volume.value = newVolume
    if (audioElement.value) {
      audioElement.value.volume = newVolume
    }
  }

  const seek = (time: number) => {
    if (audioElement.value) {
      audioElement.value.currentTime = time
    }
  }

  // Helper function to load audio and get duration
  const getAudioDuration = (url: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration)
      })
      audio.addEventListener('error', () => {
        reject(new Error('Failed to load audio'))
      })
      audio.src = url
    })
  }

  return {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    playTrack,
    pauseTrack,
    setVolume,
    seek,
    getAudioDuration
  }
})