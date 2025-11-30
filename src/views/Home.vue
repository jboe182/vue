<template>
  <div class="min-h-screen bg-gradient-to-b from-band-primary to-black text-white">
    <header class="py-20 md:py-32 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold font-band mb-4 animate-fadeInDown">
          Band Name
        </h1>
        <p class="text-lg md:text-2xl mb-12 text-gray-300 animate-fadeInUp">
          Laut, ehrlich, unvergesslich. Rock seit 2024.
        </p>

        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <router-link
            to="/music"
            class="bg-band-accent px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-500 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            🎵 Musik hören
          </router-link>
          <router-link
            to="/shop"
            class="border-2 border-white px-8 py-4 rounded-full text-xl font-bold hover:bg-white hover:text-black transition duration-300 transform hover:scale-105 shadow-lg"
          >
            🛍️ Merch kaufen
          </router-link>
        </div>
      </div>
    </header>

    <section id="about" class="py-16 bg-black/50">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2
          class="text-4xl md:text-5xl font-bold font-band text-center mb-10 border-b-4 border-band-accent pb-4"
        >
          Über die Band
        </h2>
        <div class="space-y-4 text-center text-md md:text-lg text-gray-200">
          <p>
            **Wir sind Band Name.** Seit 2024 liefern wir energiegeladenen, ehrlichen Rock. Wir
            machen Musik, die wir fühlen, und teilen diese Leidenschaft bei jedem Auftritt.
          </p>
          <p class="italic pt-4">"Wir spielen Musik, die wir fühlen. Alles andere ist nur Lärm."</p>
        </div>
      </div>
    </section>

    <section id="releases" class="py-20">
      <div class="container mx-auto px-4">
        <h2
          class="text-4xl md:text-5xl font-bold font-band text-center mb-10 border-b-4 border-band-accent pb-4"
        >
          Neueste Veröffentlichungen
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-black/30 p-6 rounded-xl transition duration-300 hover:bg-band-primary/50 hover:shadow-2xl"
          >
            <div class="aspect-square bg-gray-700 mb-4 rounded-lg overflow-hidden">
              [Image of Album Art 1]
            </div>
            <h3 class="text-2xl font-bold mb-2">Album Titel I</h3>
            <p class="text-band-accent mb-4">Veröffentlicht: 2025</p>
            <p class="text-gray-300 text-sm">
              Lacus vel facilisis volutpat est velit egestas. Eget nunc lobortis mattis aliquam
              faucibus purus in massa.
            </p>
            <a
              href="/music/album1"
              class="text-band-accent hover:text-yellow-500 mt-3 inline-block font-semibold"
              >Jetzt streamen &rarr;</a
            >
          </div>

          <div
            class="bg-black/30 p-6 rounded-xl transition duration-300 hover:bg-band-primary/50 hover:shadow-2xl"
          >
            <div class="aspect-square bg-gray-700 mb-4 rounded-lg overflow-hidden">
              [Image of Single Art 2]
            </div>
            <h3 class="text-2xl font-bold mb-2">Single Name II</h3>
            <p class="text-band-accent mb-4">Veröffentlicht: 2025</p>
            <p class="text-gray-300 text-sm">
              Amet consectetur adipiscing elit. Aliquam malesuada bibendum arcu vitae elementum
              curabitur vitae.
            </p>
            <a
              href="/music/single2"
              class="text-band-accent hover:text-yellow-500 mt-3 inline-block font-semibold"
              >Video ansehen &rarr;</a
            >
          </div>

          <div
            class="bg-black/30 p-6 rounded-xl transition duration-300 hover:bg-band-primary/50 hover:shadow-2xl"
          >
            <div
              class="aspect-square bg-gray-700 mb-4 rounded-lg overflow-hidden flex items-center justify-center text-4xl"
            ></div>
            <h3 class="text-2xl font-bold mb-2">The Fire EP</h3>
            <p class="text-band-accent mb-4">Veröffentlicht: 2024</p>
            <p class="text-gray-300 text-sm">
              Id leo in vitae turpis massa sed. Ut placerat orci nulla pellentesque dignissim enim
              sit amet.
            </p>
            <a
              href="/music/ep3"
              class="text-band-accent hover:text-yellow-500 mt-3 inline-block font-semibold"
              >Jetzt kaufen &rarr;</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Home page logic
// Hier bleibt der Script-Teil, wie er war
</script>
