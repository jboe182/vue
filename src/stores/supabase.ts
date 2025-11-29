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

            // Transform data to include full URLs if they are just filenames
            const tracksWithUrls = (data || []).map(track => ({
                ...track,
                audio_url: track.audio_url?.startsWith('http')
                    ? track.audio_url
                    : track.audio_url
                        ? supabase.storage.from('music').getPublicUrl(track.audio_url).data.publicUrl
                        : null,
                cover_url: track.cover_url?.startsWith('http')
                    ? track.cover_url
                    : track.cover_url
                        ? supabase.storage.from('covers').getPublicUrl(track.cover_url).data.publicUrl
                        : null
            }))

            tracks.value = tracksWithUrls
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error('Error fetching tracks:', err)
        } finally {
            loading.value = false
        }
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