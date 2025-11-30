<!-- views/Shop.vue -->
<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Merch Shop</h1>

      <div v-if="supabaseStore.loading" class="text-center py-12">
        <p class="text-xl text-gray-600">Loading products...</p>
      </div>

      <div v-else-if="supabaseStore.error" class="text-center py-12">
        <p class="text-xl text-red-600">{{ supabaseStore.error }}</p>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div
          v-for="product in supabaseStore.products"
          :key="product.id"
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
          @click="goToProduct(product.id)"
        >
          <div
            class="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="getProductImage(product)"
              :src="getProductImage(product)"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-gray-500">Product Image</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 mb-2 line-clamp-2">{{ product.description }}</p>
          <p class="text-2xl font-bold text-band-primary mb-4">{{ product.price }}€</p>
          <button
            @click.stop="addToCart(product)"
            :class="[
              'w-full py-2 rounded font-bold transition',
              product.stock > 0
                ? 'bg-gray-600 text-white'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed',
            ]"
            :disabled="product.stock === 0"
          >
            {{ product.stock > 0 ? "In den Warenkorb" : "Ausverkauft" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add to Cart Modal -->
    <AddToCartModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useSupabaseStore } from "@/stores/supabase";
import { supabase } from "@/utils/supabase";
import AddToCartModal from "@/components/AddToCartModal.vue";

const router = useRouter();
const cartStore = useCartStore();
const supabaseStore = useSupabaseStore();

onMounted(() => {
  supabaseStore.fetchProducts();
});

const addToCart = (product: any) => {
  if (product.stock > 0) {
    cartStore.addToCart(product);
  }
};

const goToProduct = (productId: string) => {
  router.push(`/shop/${productId}`);
};

const getProductImage = (product: any) => {
  if (product.all_images && product.all_images.length > 0) {
    return product.all_images[0];
  }

  if (product.image_url) {
    return product.image_url.startsWith("http")
      ? product.image_url
      : supabase.storage.from("products").getPublicUrl(product.image_url).data.publicUrl;
  }

  return null;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
