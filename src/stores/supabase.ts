import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

interface Product {
    id: string
    name: string
    description: string
    price: number
    image_url?: string
    image_url2?: string
    image_url3?: string
    category: string
    stock: number
    featured: boolean
    created_at: string
    // Computed property für Frontend
    all_images?: string[]
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

            // Daten transformieren - alle Bilder in ein Array
            const processedProducts = (data || []).map(product => {
                const images: string[] = []
                
                // Alle Bilder hinzufügen (falls vorhanden)
                if (product.image_url) {
                    const mainImageUrl = product.image_url.startsWith('http')
                        ? product.image_url
                        : supabase.storage.from('products').getPublicUrl(product.image_url).data.publicUrl
                    images.push(mainImageUrl)
                }
                
                if (product.image_url2) {
                    const image2Url = product.image_url2.startsWith('http')
                        ? product.image_url2
                        : supabase.storage.from('products').getPublicUrl(product.image_url2).data.publicUrl
                    images.push(image2Url)
                }
                
                if (product.image_url3) {
                    const image3Url = product.image_url3.startsWith('http')
                        ? product.image_url3
                        : supabase.storage.from('products').getPublicUrl(product.image_url3).data.publicUrl
                    images.push(image3Url)
                }

                return {
                    ...product,
                    all_images: images.length > 0 ? images : undefined
                }
            })

            products.value = processedProducts
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error('Error fetching products:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchProductById = async (productId: string): Promise<Product | null> => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single()

            if (supabaseError) throw supabaseError
            if (!data) return null

            // Bilder in Array umwandeln
            const images: string[] = []
            if (data.image_url) {
                const mainImageUrl = data.image_url.startsWith('http')
                    ? data.image_url
                    : supabase.storage.from('products').getPublicUrl(data.image_url).data.publicUrl
                images.push(mainImageUrl)
            }
            if (data.image_url2) {
                const image2Url = data.image_url2.startsWith('http')
                    ? data.image_url2
                    : supabase.storage.from('products').getPublicUrl(data.image_url2).data.publicUrl
                images.push(image2Url)
            }
            if (data.image_url3) {
                const image3Url = data.image_url3.startsWith('http')
                    ? data.image_url3
                    : supabase.storage.from('products').getPublicUrl(data.image_url3).data.publicUrl
                images.push(image3Url)
            }

            return {
                ...data,
                all_images: images.length > 0 ? images : undefined
            }
        } catch (err) {
            console.error('Error fetching product by id:', err)
            return null
        }
    }

    const addProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'all_images'>) => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('products')
                .insert([productData])
                .select()
                .single()

            if (supabaseError) throw supabaseError
            return { success: true, product: data }
        } catch (err) {
            console.error('Error adding product:', err)
            return { success: false, error: err }
        }
    }

    const updateProduct = async (productId: string, updates: Partial<Product>) => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('products')
                .update(updates)
                .eq('id', productId)
                .select()
                .single()

            if (supabaseError) throw supabaseError
            return { success: true, product: data }
        } catch (err) {
            console.error('Error updating product:', err)
            return { success: false, error: err }
        }
    }

    const deleteProduct = async (productId: string) => {
        try {
            const { error: supabaseError } = await supabase
                .from('products')
                .delete()
                .eq('id', productId)

            if (supabaseError) throw supabaseError
            return { success: true }
        } catch (err) {
            console.error('Error deleting product:', err)
            return { success: false, error: err }
        }
    }

    const uploadProductImage = async (file: File, productId?: string): Promise<{ success: boolean; url?: string; error?: string }> => {
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
            const filePath = productId ? `${productId}/${fileName}` : fileName

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(filePath)

            return { success: true, url: publicUrl }
        } catch (err) {
            console.error('Error uploading product image:', err)
            return { 
                success: false, 
                error: err instanceof Error ? err.message : 'Unknown error' 
            }
        }
    }

    // Tracks Funktionen (unverändert)
    const fetchTracks = async () => {
        loading.value = true
        error.value = null
        try {
            const { data, error: supabaseError } = await supabase
                .from('tracks')
                .select('*')
                .order('release_date', { ascending: false })

            if (supabaseError) throw supabaseError

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
        fetchProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        fetchTracks
    }
})