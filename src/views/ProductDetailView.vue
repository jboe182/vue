<!-- views/ProductDetailView.vue -->
<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4 max-w-6xl" v-if="product">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <!-- Product Image Gallery -->
          <div class="md:w-1/2 p-8">
            <!-- Main Image -->
            <div
              class="h-96 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="selectedImage"
                :src="selectedImage"
                :alt="product.name"
                class="w-full h-full object-cover cursor-zoom-in"
                @click="openLightbox(selectedImage)"
              />
              <span v-else class="text-gray-500 text-xl">Product Image</span>
            </div>

            <!-- Thumbnail Gallery -->
            <div
              v-if="product.all_images && product.all_images.length > 1"
              class="grid grid-cols-4 gap-2"
            >
              <div
                v-for="(image, index) in product.all_images"
                :key="index"
                @click="selectedImage = image"
                :class="[
                  'h-20 bg-gray-200 rounded cursor-pointer overflow-hidden border-2 transition-all',
                  selectedImage === image
                    ? 'border-band-primary'
                    : 'border-transparent hover:border-gray-400',
                ]"
              >
                <img
                  :src="image"
                  :alt="`${product.name} ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div class="md:w-1/2 p-8">
            <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
            <p class="text-2xl font-bold text-band-primary mb-4">{{ product.price }}€</p>
            <p class="text-gray-600 mb-6 whitespace-pre-line">{{ product.description }}</p>

            <div class="space-y-4 mb-6">
              <div class="flex items-center">
                <span class="font-semibold w-32">Kategorie:</span>
                <span class="capitalize">{{ product.category }}</span>
              </div>
              <div class="flex items-center">
                <span class="font-semibold w-32">Lagerbestand:</span>
                <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ product.stock > 0 ? `${product.stock} verfügbar` : "Ausverkauft" }}
                </span>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="flex items-center space-x-4 mb-6" v-if="product.stock > 0">
              <span class="font-semibold">Menge:</span>
              <div class="flex items-center space-x-2">
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus class="h-4 w-4" />
                </button>
                <span class="w-8 text-center font-semibold">{{ quantity }}</span>
                <button
                  @click="increaseQuantity"
                  :disabled="quantity >= product.stock"
                  class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus class="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              @click="addToCart"
              :disabled="product.stock === 0"
              :class="[
                'w-full py-3 rounded-lg font-bold transition flex items-center justify-center space-x-2',
                product.stock > 0
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed',
              ]"
            >
              <ShoppingCart class="h-5 w-5" />
              <span>{{ product.stock > 0 ? "In den Warenkorb" : "Ausverkauft" }}</span>
            </button>

            <router-link
              to="/shop"
              class="block text-center mt-4 text-band-primary hover:text-red-700 transition flex items-center justify-center space-x-2"
            >
              <ArrowLeft class="h-4 w-4" />
              <span>Zurück zum Shop</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div
        v-if="showLightbox"
        class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      >
        <div class="relative max-w-4xl max-h-full">
          <button
            @click="closeLightbox"
            class="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
          >
            <X class="h-8 w-8" />
          </button>
          <img
            :src="lightboxImage"
            :alt="product.name"
            class="max-w-full max-h-screen object-contain"
          />
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="text-center py-12">
      <p class="text-xl text-gray-600">Lade Produkt...</p>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-xl text-red-600">Produkt nicht gefunden</p>
      <router-link
        to="/shop"
        class="text-band-primary hover:text-red-700 mt-4 inline-block flex items-center space-x-2 justify-center"
      >
        <ArrowLeft class="h-4 w-4" />
        <span>Zurück zum Shop</span>
      </router-link>
    </div>
    <AddToCartModal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSupabaseStore } from "@/stores/supabase";
import { useCartStore } from "@/stores/cart";
import { ShoppingCart, ArrowLeft, Plus, Minus, X } from "lucide-vue-next";
import AddToCartModal from "@/components/AddToCartModal.vue";

const route = useRoute();
const supabaseStore = useSupabaseStore();
const cartStore = useCartStore();

const product = ref<any>(null);
const loading = ref(true);
const quantity = ref(1);
const selectedImage = ref("");
const showLightbox = ref(false);
const lightboxImage = ref("");

onMounted(async () => {
  const productId = route.params.id as string;

  // Verwende die neue fetchProductById Funktion
  product.value = await supabaseStore.fetchProductById(productId);

  // Fallback: Wenn nicht gefunden, versuche aus dem Store zu laden
  if (!product.value && supabaseStore.products.length > 0) {
    product.value = supabaseStore.products.find((p) => p.id === productId);
  }

  // Setze das erste Bild als ausgewähltes Bild
  if (product.value && product.value.all_images && product.value.all_images.length > 0) {
    selectedImage.value = product.value.all_images[0];
  }

  loading.value = false;
});

const addToCart = () => {
  if (product.value && product.value.stock > 0) {
    // Verwende die Menge für den Cart
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(product.value);
    }

    // Setze Menge zurück
    quantity.value = 1;

    // KEIN alert() mehr - das Modal wird automatisch vom Cart Store gezeigt
  }
};

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const openLightbox = (image: string) => {
  lightboxImage.value = image;
  showLightbox.value = true;
};

const closeLightbox = () => {
  showLightbox.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && showLightbox.value) {
    closeLightbox();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
