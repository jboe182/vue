<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold font-band text-center mb-8">Contact</h1>
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Name</label>
            <input type="text" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input type="email" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Subject</label>
            <input type="text" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Message</label>
            <textarea rows="4" class="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-band-primary focus:border-transparent"></textarea>
          </div>
          <button type="submit" class="w-full bg-band-primary text-white py-3 rounded hover:bg-red-700 transition font-bold">
            Send Message
          </button>
        </form>
        
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-xl font-bold mb-4">Kontakt Informationen</h3>
          <div class="space-y-2">
            <p>📧 Email: contact@bandname.com</p>
            <p>📞 Phone: +49 123 456 789</p>
            <p>📍 Address: Musterstraße 123, 12345 Berlin</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Contact page logic
</script>
