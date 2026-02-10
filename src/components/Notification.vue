<script setup lang="ts">
const props = defineProps<{ message: string }>()
</script>

<template>
  <div class="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow">
    {{ message }}
  </div>
</template>
