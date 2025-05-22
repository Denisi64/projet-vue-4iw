import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UploaderPage from '../pages/UploaderPage.vue'
import AdminCategoryManager from "@/pages/AdminCategoryManager.vue";

const routes = [
    { path: '/', component: HomePage },
    {
        path: '/uploader',
        name: 'Uploader',
        component: UploaderPage
    },
    { path: '/admin/categories', name: 'AdminCategories', component: AdminCategoryManager },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
