// stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'

export interface CartItem {
  id: string
  name: string
  price: number
  description?: string
  image_url?: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const showAddToCartModal = ref(false)
  const lastAddedItem = ref<CartItem | null>(null)

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const addToCart = (product: any) => {
    // Bild-URL transformieren falls nötig
    let imageUrl = product.image_url
    
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = supabase.storage.from('products').getPublicUrl(imageUrl).data.publicUrl
    }
    
    // Fallback: all_images verwenden
    if (!imageUrl && product.all_images && product.all_images.length > 0) {
      imageUrl = product.all_images[0]
    }

    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image_url: imageUrl
    }

    const existingItem = items.value.find(item => item.id === cartItem.id)
    
    if (existingItem) {
      existingItem.quantity += 1
      lastAddedItem.value = existingItem
    } else {
      const newItem = {
        ...cartItem,
        quantity: 1
      }
      items.value.push(newItem)
      lastAddedItem.value = newItem
    }

    // Modal anzeigen
    showAddToCartModal.value = true
    
    // Modal nach 3 Sekunden automatisch schließen
    setTimeout(() => {
      showAddToCartModal.value = false
    }, 3000)
  }

  const removeFromCart = (id: string) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    const item = items.value.find(item => item.id === id)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const closeModal = () => {
    showAddToCartModal.value = false
  }

  return {
    items,
    total,
    itemCount,
    showAddToCartModal,
    lastAddedItem,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    closeModal
  }
})