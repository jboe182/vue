<template>
  <div class="min-h-screen bg-black text-white py-12">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold font-band mb-6">DIE BAND</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Seit 2018 rocken wir die Bühnen dieser Welt mit energiegeladenen Performances und einem
          Sound, der unter die Haut geht.
        </p>
      </div>

      <!-- Band Members Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        <!-- Sänger -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-band-primary/20 to-band-accent/10 hover:shadow-2xl transition-all duration-500"
        >
          <div class="aspect-[3/4] relative overflow-hidden">
            <!-- Hochkant Bild Container -->
            <div class="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
              <div class="text-center p-6">
                <div
                  class="w-24 h-24 mx-auto mb-4 bg-band-accent/20 rounded-full flex items-center justify-center"
                >
                  <span class="text-2xl">🎤</span>
                </div>
                <p class="text-gray-400 text-sm">Alex "The Voice"</p>
              </div>
            </div>

            <!-- Hover Overlay -->
            <div
              class="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6"
            >
              <div class="text-center">
                <h3 class="text-2xl font-bold mb-2">Alex "The Voice" Muster</h3>
                <span
                  class="inline-block bg-band-accent text-black text-sm font-semibold px-3 py-1 rounded-full mb-3"
                >
                  🎙️ Lead Vocals
                </span>
                <p class="text-gray-300 text-sm mb-3 italic">
                  "Die Energie des Publikums ist unser Treibstoff."
                </p>
                <p class="text-gray-400 text-xs">
                  Das charismatische Herz der Band mit einer Stimme, die Bände spricht.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gitarrist -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-band-primary/20 to-band-accent/10 hover:shadow-2xl transition-all duration-500"
        >
          <div class="aspect-[3/4] relative overflow-hidden">
            <!-- Hochkant Bild Container -->
            <div class="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
              <div class="text-center p-6">
                <div
                  class="w-24 h-24 mx-auto mb-4 bg-band-accent/20 rounded-full flex items-center justify-center"
                >
                  <span class="text-2xl">🎸</span>
                </div>
                <p class="text-gray-400 text-sm">Max "Riff Lord"</p>
              </div>
            </div>

            <!-- Hover Overlay -->
            <div
              class="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6"
            >
              <div class="text-center">
                <h3 class="text-2xl font-bold mb-2">Max "Riff Lord" Beispiel</h3>
                <span
                  class="inline-block bg-band-accent text-black text-sm font-semibold px-3 py-1 rounded-full mb-3"
                >
                  🎸 E-Gitarre
                </span>
                <p class="text-gray-300 text-sm mb-3 italic">
                  "Für mich geht es um den perfekten Ton. Jede Note muss brennen."
                </p>
                <p class="text-gray-400 text-xs">
                  Der Maestro der Melodien und Riffs - schreibt die meisten Songs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Schlagzeuger -->
        <div
          class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-band-primary/20 to-band-accent/10 hover:shadow-2xl transition-all duration-500"
        >
          <div class="aspect-[3/4] relative overflow-hidden">
            <!-- Hochkant Bild Container -->
            <div class="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
              <div class="text-center p-6">
                <div
                  class="w-24 h-24 mx-auto mb-4 bg-band-accent/20 rounded-full flex items-center justify-center"
                >
                  <span class="text-2xl">🥁</span>
                </div>
                <p class="text-gray-400 text-sm">Lisa "Beat"</p>
              </div>
            </div>

            <!-- Hover Overlay -->
            <div
              class="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6"
            >
              <div class="text-center">
                <h3 class="text-2xl font-bold mb-2">Lisa "Beat" Mustermann</h3>
                <span
                  class="inline-block bg-band-accent text-black text-sm font-semibold px-3 py-1 rounded-full mb-3"
                >
                  🥁 Schlagzeug
                </span>
                <p class="text-gray-300 text-sm mb-3 italic">
                  "Der Beat ist das Fundament. Wenn der Groove stimmt, stimmt alles."
                </p>
                <p class="text-gray-400 text-xs">
                  Das rhythmische Rückgrat der Band mit präzisen und wuchtigen Beats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Band Story Section -->
      <div class="max-w-4xl mx-auto mb-16">
        <div
          class="bg-gradient-to-r from-band-primary/10 to-band-accent/10 rounded-2xl p-8 border border-band-primary/20"
        >
          <h2 class="text-3xl font-bold text-center mb-6">Unsere Geschichte</h2>
          <div class="grid md:grid-cols-2 gap-8 text-gray-300">
            <div>
              <h3 class="text-xl font-semibold mb-3 text-band-accent">Die Anfänge</h3>
              <p class="text-sm leading-relaxed">
                2018 in einer kleinen Garage begann alles. Drei Musiker mit einer gemeinsamen
                Vision: authentischen Rock zu machen, der Menschen bewegt. Was als jamsession
                begann, entwickelte sich schnell zu etwas Größerem.
              </p>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-3 text-band-accent">Heute</h3>
              <p class="text-sm leading-relaxed">
                Heute stehen wir für energiegeladene Live-Shows und einen Sound, der Tradition mit
                Moderne verbindet. Unser Debütalbum kommt 2024 - seid gespannt!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="bg-band-primary/10 rounded-xl p-6 border border-band-primary/20">
            <div class="text-3xl md:text-4xl font-bold text-band-accent mb-2">50+</div>
            <div class="text-gray-300 text-sm">Live Shows</div>
          </div>
          <div class="bg-band-primary/10 rounded-xl p-6 border border-band-primary/20">
            <div class="text-3xl md:text-4xl font-bold text-band-accent mb-2">10k+</div>
            <div class="text-gray-300 text-sm">Streams</div>
          </div>
          <div class="bg-band-primary/10 rounded-xl p-6 border border-band-primary/20">
            <div class="text-3xl md:text-4xl font-bold text-band-accent mb-2">3</div>
            <div class="text-gray-300 text-sm">Band Mitglieder</div>
          </div>
          <div class="bg-band-primary/10 rounded-xl p-6 border border-band-primary/20">
            <div class="text-3xl md:text-4xl font-bold text-band-accent mb-2">2024</div>
            <div class="text-gray-300 text-sm">Debüt Album</div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-16">
        <p class="text-gray-400 mb-6">Bereit für den nächsten Schritt?</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/music"
            class="bg-band-accent text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition duration-300"
          >
            Musik entdecken
          </router-link>
          <router-link
            to="/shop"
            class="border border-band-accent text-band-accent font-bold px-8 py-3 rounded-lg hover:bg-band-accent hover:text-black transition duration-300"
          >
            Merch shoppen
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page logic
</script>
