<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { addEntry } from '../backend'
import Notification from '../components/Notification.vue'
import { useRouter } from 'vue-router'

const PASSWORD = 'moulayimrane'
const router = useRouter()
const text = ref('')
const emoji = ref('')
const file = ref<File | null>(null)
const notification = ref('')

onMounted(() => {
  const input = prompt('Mot de passe pour accéder à cette page')
  if (input !== PASSWORD) {
    alert('Mot de passe incorrect !')
    router.push('/')
  }
})

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    file.value = target.files[0]
  }
}

const submitEntry = async () => {
  try {
    await addEntry({ text: text.value, emoji: emoji.value, file: file.value || undefined })
    notification.value = 'Entrée publiée avec succès !'
    text.value = ''
    emoji.value = ''
    file.value = null
  } catch (err) {
    notification.value = 'Erreur lors de la publication.'
  }
  setTimeout(() => (notification.value = ''), 3000)
}
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">Ajouter une entrée</h1>
    <form @submit.prevent="submitEntry" class="flex flex-col gap-4">
      <textarea v-model="text" placeholder="Votre texte..." class="border p-2 rounded"></textarea>
      <input
        type="text"
        v-model="emoji"
        placeholder="Emoji (optionnel)"
        class="border p-2 rounded"
      />
      <input type="file" @change="onFileChange" class="border p-2 rounded" />
      <button type="submit" class="bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
        Publier
      </button>
    </form>
    <Notification v-if="notification" :message="notification" />
  </div>
</template>
