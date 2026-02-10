<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getAllEntries } from '../backend'

const startDate = new Date(2026, 1, 8) // 8 février 2026
const today = new Date()

const daysTogether = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
const entriesCount = ref(0)

onMounted(async () => {
  const entries = await getAllEntries()
  entriesCount.value = entries.length

  const map = L.map('map').setView([20, 50], 2)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  // marqueurs
  L.marker([3.139, 101.6869]).addTo(map).bindPopup('Tasnim en Malaisie')
  L.marker([33.5731, -7.5898]).addTo(map).bindPopup('Imrane au Maroc')
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center p-4"
  >
    <h1 class="text-4xl font-bold mb-4">Notre Journal de Voyage</h1>
    <p class="text-center mb-6">
      Bienvenue sur notre espace privé ! Même à distance, nous partageons nos souvenirs, nos
      émotions et chaque moment précieux.
    </p>
    <div class="flex flex-col md:flex-row gap-6">
      <img src="/photo-tasnim.webp" class="w-40 h-40 rounded-full object-cover" />
      <img src="/photo-imrane.webp" class="w-40 h-40 rounded-full object-cover" />
      <img src="/photo-couple.webp" class="w-40 h-40 rounded-full object-cover" />
    </div>

    <div class="mt-8 w-full h-96 md:w-3/4 rounded-lg shadow-lg" id="map"></div>

    <div class="mt-8 flex gap-6">
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <p class="text-lg font-semibold">Jours ensemble</p>
        <p class="text-2xl">{{ daysTogether }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <p class="text-lg font-semibold">Entrées publiées</p>
        <p class="text-2xl">{{ entriesCount }}</p>
      </div>
    </div>
  </div>
</template>
