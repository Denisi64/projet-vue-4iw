<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '@/services/categoryApi'
import Swal from 'sweetalert2'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import $ from 'jquery'
import 'datatables.net'

const categories = ref([])
const newCategory = ref('')
const error = ref('')
const ready = ref(false)

const loadCategories = async () => {
  const data = await fetchCategories()
  categories.value = data

  if ($.fn.DataTable.isDataTable('#categoriesTable')) {
    $('#categoriesTable').DataTable().destroy()
  }

  ready.value = false
  await nextTick()
  ready.value = true
  await nextTick()

  $('#categoriesTable').DataTable()
}

const submitCategory = async () => {
  error.value = ''
  if (!newCategory.value.trim()) return
  try {
    await addCategory(newCategory.value.trim())
    newCategory.value = ''
    await loadCategories()
  } catch (err) {
    error.value = err.message
  }
}

const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: 'Supprimer ?',
    text: 'Cette action est irréversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
  })
  if (confirm.isConfirmed) {
    await deleteCategory(id)
    await loadCategories()
    Swal.fire('Supprimé !', '', 'success')
  }
}

const handleEdit = async (id, currentName) => {
  const result = await Swal.fire({
    title: 'Modifier la catégorie',
    input: 'text',
    inputValue: currentName,
    showCancelButton: true,
    confirmButtonText: 'Modifier',
    cancelButtonText: 'Annuler',
  })
  if (result.isConfirmed && result.value.trim()) {
    await updateCategory(id, result.value.trim())
    await loadCategories()
    Swal.fire('Modifié !', '', 'success')
  }
}

onMounted(() => {
  loadCategories()
})
</script>

<template>
  <div class="admin-categories">
    <h2 class="text-xl font-bold mb-4">Gestion des Catégories</h2>

    <form @submit.prevent="submitCategory" class="mb-4 flex gap-2 items-center">
      <input
          v-model="newCategory"
          type="text"
          placeholder="Nouvelle catégorie"
          class="input input-bordered"
      />
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>

    <p v-if="error" class="text-red-500 mb-2">{{ error }}</p>

    <table v-if="ready" id="categoriesTable" class="display w-full">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cat in categories" :key="cat.id">
        <td>{{ cat.id }}</td>
        <td>{{ cat.name }}</td>
        <td class="flex gap-2">
          <button class="btn btn-sm btn-outline btn-warning" @click="handleEdit(cat.id, cat.name)">✏️</button>
          <button class="btn btn-sm btn-outline btn-error" @click="handleDelete(cat.id)">🗑️</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-categories {
  margin: auto;
}
</style>
