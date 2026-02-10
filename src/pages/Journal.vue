<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAllEntries } from '../backend'
import EntryCard from '../components/EntryCard.vue'

const entries = ref<any[]>([])
const searchText = ref('')
const searchDate = ref('')

onMounted(async () => {
  entries.value = await getAllEntries()
})

const filteredEntries = computed(() => {
  return entries.value.filter((e) => {
    const textMatch = e.text?.toLowerCase().includes(searchText.value.toLowerCase())
    const dateMatch = searchDate.value ? e.created.startsWith(searchDate.value) : true
    return textMatch && dateMatch
  })
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Journal</h1>
    <div class="mb-4 flex gap-2">
      <input
        type="text"
        v-model="searchText"
        placeholder="Chercher..."
        class="border p-2 rounded"
      />
      <input type="date" v-model="searchDate" class="border p-2 rounded" />
    </div>
    <div class="grid gap-4">
      <EntryCard v-for="entry in filteredEntries" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>
