<script setup lang="ts">
import { pb } from '../backend'
import { PropType } from 'vue'

interface Entry {
  id: string
  text?: string
  emoji?: string
  media?: string
  created: string
}

const props = defineProps({
  entry: { type: Object as PropType<Entry>, required: true },
})

const getMediaUrl = (fileName: string) => pb.getFileUrl({ collection: 'journal' }, fileName)
const formatDate = (d: string) => new Date(d).toLocaleString()
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <p v-if="entry.text">{{ entry.text }}</p>
    <p v-if="entry.emoji" class="text-2xl">{{ entry.emoji }}</p>
    <img v-if="entry.media" :src="getMediaUrl(entry.media)" class="mt-2 max-w-full rounded" />
    <p class="text-gray-400 text-sm mt-2">{{ formatDate(entry.created) }}</p>
  </div>
</template>
