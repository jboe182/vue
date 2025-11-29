import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

interface Product {
    id: string
    name: string
    description: string
    price: number
    image_url?: string
    category: string
    stock: number
    featured: boolean
    created_at: string
}

interface Track {
    id: string
    title: string
    artist: string
    duration: number
    audio_url?: string
    cover_url?: string
    release_date?: string
    created_at: string
}

export const useSupabaseStore = defineStore('supabase', () => {
    const products = ref<Product[]>([])
    const tracks = ref<Track[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchProducts = async () => {
        loading.value = true
        error.value = null
        try {
            const { data, error: supabaseError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })

            if (supabaseError) throw supabaseError
            products.value = data || []
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error('Error fetching products:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchTracks = async () => {
        loading.value = true
        error.value = null
        try {
            const { data, error: supabaseError } = await supabase
                .from('tracks')
                .select('*')
                .order('release_date', { ascending: false })

            if (supabaseError) throw supabaseError

            // Transform data to include full URLs and load durations
            const tracksWithUrls = await Promise.all((data || []).map(async track => {
                const audio_url = track.audio_url?.startsWith('http')
                    ? track.audio_url
                    : track.audio_url
                        ? supabase.storage.from('music').getPublicUrl(track.audio_url).data.publicUrl
                        : null

                const cover_url = track.cover_url?.startsWith('http')
                    ? track.cover_url
                    : track.cover_url
                        ? supabase.storage.from('covers').getPublicUrl(track.cover_url).data.publicUrl
                        : null

                // Load audio duration if not already set and audio_url exists
                let duration = track.duration
                if (!duration && audio_url) {
                    try {
                        const audioDuration = await loadAudioDuration(audio_url)
                        duration = Math.floor(audioDuration)
                    } catch (err) {
                        console.warn(`Could not load duration for ${track.title}:`, err)
                    }
                }

                return {
                    ...track,
                    audio_url,
                    cover_url,
                    duration
                }
            }))

            tracks.value = tracksWithUrls
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error('Error fetching tracks:', err)
        } finally {
            loading.value = false
        }
    }

    // Helper function to load audio duration
    const loadAudioDuration = (url: string): Promise<number> => {
        return new Promise((resolve, reject) => {
            const audio = new Audio()
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration)
            })
            audio.addEventListener('error', (e) => {
                reject(e)
            })
            audio.src = url
        })
    }

    return {
        products,
        tracks,
        loading,
        error,
        fetchProducts,
        fetchTracks
    }
})