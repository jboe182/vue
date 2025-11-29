import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: number | string
  name: string
  price: number
  description?: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0)
  })

  const itemCount = computed(() => items.value.length)

  const addToCart = (product: CartItem) => {
    items.value.push(product)
  }

  const removeFromCart = (index: number) => {
    items.value.splice(index, 1)
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    clearCart
  }
})