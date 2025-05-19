<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToUploader() {
  router.push('/uploader')
}
</script>

<template>
  <div class="min-h-screen bg-base-100 flex flex-col justify-center items-center p-6">
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold text-primary">Bienvenue dans ton gestionnaire d’images 📸</h1>
      <p class="text-lg opacity-70">Commence à organiser et prévisualiser tes fichiers en toute fluidité</p>
      <button class="btn btn-primary btn-wide" @click="goToUploader">
        Accéder à l’Uploader
      </button>
    </div>
  </div>
</template>
