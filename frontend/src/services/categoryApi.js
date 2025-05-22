const API_BASE = '/api'

export async function fetchCategories() {
    const res = await fetch(`${API_BASE}/categories`)
    if (!res.ok) throw new Error('Erreur de récupération des catégories')
    return await res.json()
}

export async function addCategory(name) {
    const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.statusMessage || 'Erreur ajout catégorie')
    }

    return await res.json()
}

export async function deleteCategory(id) {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Erreur suppression catégorie')
}

export async function updateCategory(id, name) {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    })
    if (!res.ok) throw new Error('Erreur modification catégorie')
}

