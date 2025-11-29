<template>
  <div
    v-if="audioStore.currentTrack"
    class="fixed bottom-0 left-0 right-0 bg-white shadow-2xl transition-all duration-300 z-50"
    :class="{ 'h-screen flex flex-col': isExpanded, 'h-20': !isExpanded }"
  >
    <!-- Collapsed View -->
    <div
      v-if="!isExpanded"
      class="h-full container mx-auto px-4 flex items-center justify-between cursor-pointer"
      @click="toggleExpand"
    >
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-gray-200 rounded overflow-hidden">
          <img
            v-if="audioStore.currentTrack.cover_url"
            :src="audioStore.currentTrack.cover_url"
            :alt="audioStore.currentTrack.title"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-red-600 flex items-center justify-center text-white text-xs"
          >
            ♪
          </div>
        </div>
        <div>
          <h4 class="font-bold text-gray-900">{{ audioStore.currentTrack.title }}</h4>
          <p class="text-sm text-gray-500">
            {{ audioStore.currentTrack.artist || "Unknown Artist" }}
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-4" @click.stop>
        <button
          class="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="togglePlay"
          class="p-3 bg-gray-300 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition"
        >
          <svg
            v-if="audioStore.isPlaying"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 9v6m4-6v6"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
          </svg>
        </button>
        <button
          class="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          @click.stop="toggleExpand"
          class="p-2 hover:bg-gray-100 rounded-full ml-2 text-gray-400 hover:text-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Expanded View -->
    <div v-else class="flex-1 flex flex-col bg-white overflow-y-auto">
      <div class="p-4 flex justify-end">
        <button
          @click="toggleExpand"
          class="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Desktop Layout: Cover left, Lyrics right -->
      <div class="flex-1 flex flex-col md:flex-row p-4 md:p-8 gap-8">
        <!-- Mobile Layout -->
        <div class="md:hidden flex flex-col items-center w-full">
          <!-- Cover that morphs to circle -->
          <div
            class="mb-6 overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
            :class="[showLyrics ? 'w-24 h-24 rounded-full' : 'w-64 h-64 rounded-lg shadow-xl']"
            @dblclick="toggleLyrics"
          >
            <img
              v-if="audioStore.currentTrack.cover_url"
              :src="audioStore.currentTrack.cover_url"
              :alt="audioStore.currentTrack.title"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-red-600 to-gray-800 flex items-center justify-center text-white"
              :class="showLyrics ? 'text-2xl' : 'text-4xl'"
            >
              ♪
            </div>
          </div>

          <!-- Lyrics Display (Mobile) -->
          <div v-if="showLyrics" class="w-[75vw] mb-6 overflow-y-auto max-h-[40vh]">
            <h3 class="text-xl font-bold mb-2 text-center">{{ audioStore.currentTrack.title }}</h3>
            <p class="text-gray-600 text-sm mb-4 text-center">
              {{ audioStore.currentTrack.artist }}
            </p>
            <pre class="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed text-sm mb-4">{{
              audioStore.currentTrack.lyrics || "No lyrics available"
            }}</pre>

            <!-- Contributors Badges (Mobile) -->
            <div
              v-if="getContributors(audioStore.currentTrack.contributors).length > 0"
              class="flex flex-wrap gap-2 justify-center mt-4"
            >
              <span
                v-for="contributor in getContributors(audioStore.currentTrack.contributors)"
                :key="contributor"
                class="px-3 py-1 bg-red-600 text-white text-xs rounded-full"
              >
                {{ contributor }}
              </span>
            </div>
          </div>

          <!-- Title and Artist (when lyrics not shown) -->
          <div v-if="!showLyrics">
            <h2 class="text-2xl font-bold mb-2 text-center">{{ audioStore.currentTrack.title }}</h2>
            <p class="text-lg text-gray-600 mb-6 text-center">
              {{ audioStore.currentTrack.artist || "Unknown Artist" }}
            </p>
          </div>

          <!-- Progress Bar -->
          <div class="w-full max-w-md mb-6">
            <div
              class="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
              @click="handleSeek"
              ref="progressBar"
            >
              <div
                class="h-full bg-red-600 transition-all"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
            <div class="flex justify-between text-sm text-gray-500 mt-2">
              <span>{{ formatTime(audioStore.currentTime) }}</span>
              <span>{{ formatTime(audioStore.duration) }}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center space-x-6">
            <button
              class="p-3 bg-gray-300 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              @click="togglePlay"
              :class="[
                'p-5 rounded-full shadow-lg transform hover:scale-105 transition',
                audioStore.isPlaying
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-red-600 hover:text-white',
              ]"
            >
              <svg
                v-if="audioStore.isPlaying"
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 9v6m4-6v6"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
            </button>
            <button
              class="p-3 bg-gray-300 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden md:flex md:flex-row w-full gap-8">
          <!-- Cover Section -->
          <div class="flex-shrink-0 flex flex-col items-center md:w-1/2">
            <div class="w-96 h-96 bg-gray-200 rounded-lg shadow-xl mb-6 overflow-hidden">
              <img
                v-if="audioStore.currentTrack.cover_url"
                :src="audioStore.currentTrack.cover_url"
                :alt="audioStore.currentTrack.title"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-red-600 to-gray-800 flex items-center justify-center text-white text-4xl"
              >
                ♪
              </div>
            </div>

            <h2 class="text-3xl font-bold mb-2 text-center">{{ audioStore.currentTrack.title }}</h2>
            <p class="text-xl text-gray-600 mb-6 text-center">
              {{ audioStore.currentTrack.artist || "Unknown Artist" }}
            </p>

            <!-- Progress Bar -->
            <div class="w-full max-w-md mb-6">
              <div
                class="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                @click="handleSeek"
                ref="progressBarDesktop"
              >
                <div
                  class="h-full bg-red-600 transition-all"
                  :style="{ width: progressPercentage + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-sm text-gray-500 mt-2">
                <span>{{ formatTime(audioStore.currentTime) }}</span>
                <span>{{ formatTime(audioStore.duration) }}</span>
              </div>
            </div>

            <!-- Controls -->
            <div class="flex items-center space-x-8">
              <button
                class="p-4 bg-gray-300 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                @click="togglePlay"
                :class="[
                  'p-6 rounded-full shadow-lg transform hover:scale-105 transition',
                  audioStore.isPlaying
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-red-600 hover:text-white',
                ]"
              >
                <svg
                  v-if="audioStore.isPlaying"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 9v6m4-6v6"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              </button>
              <button
                class="p-4 bg-gray-300 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Lyrics Section (Desktop only) -->
          <div class="md:w-1/2 flex flex-col bg-gray-50 rounded-lg p-6 overflow-y-auto">
            <h3 class="text-2xl font-bold mb-2">{{ audioStore.currentTrack.title }}</h3>
            <p class="text-gray-600 mb-6">{{ audioStore.currentTrack.artist }}</p>
            <div class="flex-1 overflow-y-auto mb-4">
              <pre class="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">{{
                audioStore.currentTrack.lyrics || "No lyrics available"
              }}</pre>
            </div>

            <!-- Contributors Badges (Desktop) -->
            <div
              v-if="getContributors(audioStore.currentTrack.contributors).length > 0"
              class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200"
            >
              <span
                v-for="contributor in getContributors(audioStore.currentTrack.contributors)"
                :key="contributor"
                class="px-3 py-1 bg-red-600 text-white text-sm rounded-full"
              >
                {{ contributor }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAudioStore } from "@/stores/audio";

const audioStore = useAudioStore();
const isExpanded = ref(false);
const showLyrics = ref(false);
const progressBar = ref<HTMLElement | null>(null);
const progressBarDesktop = ref<HTMLElement | null>(null);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
    showLyrics.value = false;
  }
};

const toggleLyrics = () => {
  showLyrics.value = !showLyrics.value;
};

const togglePlay = () => {
  if (audioStore.isPlaying) {
    audioStore.pauseTrack();
  } else if (audioStore.currentTrack) {
    audioStore.playTrack(audioStore.currentTrack);
  }
};

const progressPercentage = computed(() => {
  if (!audioStore.duration) return 0;
  return (audioStore.currentTime / audioStore.duration) * 100;
});

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const handleSeek = (event: MouseEvent) => {
  const bar = event.currentTarget as HTMLElement;
  if (!bar || !audioStore.duration) return;

  const rect = bar.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = x / rect.width;
  const newTime = percentage * audioStore.duration;

  audioStore.seek(newTime);
};

// Helper function to parse contributors string
const getContributors = (contributorsString?: string): string[] => {
  if (!contributorsString) return [];
  return contributorsString
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
};
</script>
