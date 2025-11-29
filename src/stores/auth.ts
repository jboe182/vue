import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

interface User {
    id: string
    email: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const loading = ref(false)

    const signIn = async (email: string, password: string) => {
        loading.value = true
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            if (data.user) {
                user.value = {
                    id: data.user.id,
                    email: data.user.email!
                }
            }

            return { success: true, user: data.user }
        } catch (error: any) {
            return { success: false, error: error.message }
        } finally {
            loading.value = false
        }
    }

    const signUp = async (email: string, password: string) => {
        loading.value = true
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            })

            if (error) throw error
            return { success: true, user: data.user }
        } catch (error: any) {
            return { success: false, error: error.message }
        } finally {
            loading.value = false
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error

            user.value = null
        } catch (error: any) {
            console.error('Error signing out:', error)
        }
    }

    const checkAuth = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (session?.user) {
                user.value = {
                    id: session.user.id,
                    email: session.user.email!
                }
            }
        } catch (error) {
            console.error('Error checking auth:', error)
        }
    }

    // Jeder eingeloggte User ist Admin
    const isAdmin = () => {
        return !!user.value
    }

    return {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        checkAuth,
        isAdmin
    }
})