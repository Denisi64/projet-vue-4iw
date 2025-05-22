<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <div class="w-64 h-full bg-base-200 text-base-content p-4 flex flex-col gap-4">
    <h1 class="text-2xl font-bold mb-6 text-primary">📁 Gestionnaire</h1>

    <ul class="menu space-y-2">
      <li><button class="btn btn-ghost justify-start w-full" @click="goTo('/')">🏠 Accueil</button></li>
      <li><button class="btn btn-ghost justify-start w-full" @click="goTo('/uploader')">🖼️ Uploader</button></li>
      <li><button class="btn btn-ghost justify-start w-full" @click="goTo('/settings')">⚙️ Paramètres</button></li>
    </ul>

    <div class="mt-auto pt-4 border-t border-base-300 text-sm opacity-60">
      © 2025 - Atommeme
    </div>
  </div>
</template>
