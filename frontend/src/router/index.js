import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UploaderPage from '../pages/UploaderPage.vue'

const routes = [
    { path: '/', component: HomePage },
    {
        path: '/uploader',
        name: 'Uploader',
        component: UploaderPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
