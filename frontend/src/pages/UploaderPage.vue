<template>
  <div class="p-4">
    <h1>Uploader une image</h1>
    <form @submit.prevent="handleUpload">
      <input type="file" @change="onFileChange" accept="image/*" />
      <button type="submit">Envoyer</button>
    </form>
    <div v-if="imageUrl">
      <h2>Image prévisualisée :</h2>
      <img :src="imageUrl" alt="Preview" style="max-width: 300px; margin-top: 1rem;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const file = ref(null)
const imageUrl = ref(null)

function onFileChange(event) {
  file.value = event.target.files[0]
  if (file.value) {
    imageUrl.value = URL.createObjectURL(file.value)
  }
}

function handleUpload() {
  if (!file.value) return alert("Aucun fichier sélectionné.")

  const formData = new FormData()
  formData.append('file', file.value)

  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData
  })
      .then(res => res.json())
      .then(data => {
        console.log('Réponse :', data)
        alert('Image envoyée !')
      })
      .catch(err => {
        console.error(err)
        alert('Erreur lors de l\'upload.')
      })
}
</script>
